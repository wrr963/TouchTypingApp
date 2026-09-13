import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function createWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", String(process.pid) + "-" + String(Date.now()));
  const { default: worker } = await import(workerUrl.href);
  return worker;
}

const environment = {
  ASSETS: {
    fetch: async () => new Response("Not found", { status: 404 }),
  },
};

const context = {
  waitUntil() {},
  passThroughOnException() {},
};

test("KEYDRIFTのトップ画面をサーバーレンダリングできる", async () => {
  const worker = await createWorker();
  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    environment,
    context,
  );

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /KEYDRIFT/);
  assert.match(html, /THINK FAST/);
  assert.match(html, /GENERAL/);
  assert.match(html, /ENGINEER/);
  assert.match(html, /MODE \/ LEVEL \/ TIME/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview/);
});

test("エンジニア向け難易度3の問題をAPIから取得できる", async () => {
  const worker = await createWorker();
  const response = await worker.fetch(
    new Request(
      "http://localhost/api/prompts?mode=engineer&difficulty=3",
      { headers: { accept: "application/json" } },
    ),
    environment,
    context,
  );

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.prompt.mode, "engineer");
  assert.equal(body.prompt.difficulty, 3);
  assert.equal(typeof body.prompt.explanation, "string");
  assert.ok(body.prompt.text.length > 0);
});

test("同じセッションの問題を重複せず、全問出題後に終了する", async () => {
  const worker = await createWorker();
  const seenIds = new Set();
  let poolSize = 0;
  let exhausted = false;

  for (let index = 0; index < 50; index += 1) {
    const params = new URLSearchParams({
      mode: "general",
      difficulty: "2",
    });
    seenIds.forEach((id) => params.append("exclude", id));

    const response = await worker.fetch(
      new Request("http://localhost/api/prompts?" + params.toString(), {
        headers: { accept: "application/json" },
      }),
      environment,
      context,
    );

    if (response.status === 409) {
      exhausted = true;
      break;
    }

    assert.equal(response.status, 200);
    const body = await response.json();
    poolSize = body.poolSize;
    assert.equal(seenIds.has(body.prompt.id), false);
    seenIds.add(body.prompt.id);
  }

  assert.ok(poolSize >= 9);
  assert.equal(seenIds.size, poolSize);
  assert.equal(exhausted, true);
});

test("3分の初期値と1〜5分の選択肢を備える", async () => {
  const [hook, component] = await Promise.all([
    readFile(
      new URL("../frontend/hooks/use-typing-session.ts", import.meta.url),
      "utf8",
    ),
    readFile(
      new URL("../frontend/components/typing-trainer.tsx", import.meta.url),
      "utf8",
    ),
  ]);

  assert.match(hook, /DEFAULT_SESSION_MINUTES:\s*SessionMinutes\s*=\s*3/);
  assert.match(hook, /SessionMinutes\s*=\s*1\s*\|\s*2\s*\|\s*3\s*\|\s*4\s*\|\s*5/);
  assert.match(component, /YOUR INPUT/);
  assert.match(component, /input-wrong/);
});
