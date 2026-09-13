import type {
  Difficulty,
  PromptResponse,
  TrainingMode,
} from "@/shared/training";

export class PromptPoolExhaustedError extends Error {
  constructor() {
    super("このセッションの問題をすべてクリアしました。");
    this.name = "PromptPoolExhaustedError";
  }
}

export async function fetchNextPrompt(
  mode: TrainingMode,
  difficulty: Difficulty,
  excludeIds: readonly string[] = [],
): Promise<PromptResponse> {
  const params = new URLSearchParams({
    mode,
    difficulty: String(difficulty),
  });

  excludeIds.forEach((id) => params.append("exclude", id));

  const response = await fetch("/api/prompts?" + params.toString(), {
    cache: "no-store",
  });

  if (response.status === 409) {
    throw new PromptPoolExhaustedError();
  }

  if (!response.ok) {
    throw new Error("練習問題を読み込めませんでした。もう一度お試しください。");
  }

  return response.json() as Promise<PromptResponse>;
}
