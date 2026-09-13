import {
  GetNextPrompt,
  PromptPoolExhaustedError,
} from "@/backend/application/get-next-prompt";
import { InMemoryPromptRepository } from "@/backend/infrastructure/in-memory-prompt-repository";
import type { Difficulty, TrainingMode } from "@/shared/training";
import { NextResponse } from "next/server";

const service = new GetNextPrompt(new InMemoryPromptRepository());

const isMode = (value: string | null): value is TrainingMode =>
  value === "general" || value === "engineer";

const toDifficulty = (value: string | null): Difficulty => {
  const parsed = Number(value);
  return parsed === 2 || parsed === 3 ? parsed : 1;
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const modeParam = url.searchParams.get("mode");
  const mode: TrainingMode = isMode(modeParam) ? modeParam : "general";

  try {
    return NextResponse.json(
      service.execute(
        mode,
        toDifficulty(url.searchParams.get("difficulty")),
        url.searchParams.getAll("exclude"),
      ),
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    if (error instanceof PromptPoolExhaustedError) {
      return NextResponse.json(
        { error: "PROMPT_POOL_EXHAUSTED", poolSize: error.poolSize },
        { status: 409, headers: { "Cache-Control": "no-store" } },
      );
    }

    return NextResponse.json(
      { error: "Prompt pool is unavailable." },
      { status: 503 },
    );
  }
}
