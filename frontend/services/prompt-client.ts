import type {
  Difficulty,
  PromptResponse,
  TrainingMode,
} from "@/shared/training";

export async function fetchNextPrompt(
  mode: TrainingMode,
  difficulty: Difficulty,
  excludeId?: string,
): Promise<PromptResponse> {
  const params = new URLSearchParams({
    mode,
    difficulty: String(difficulty),
  });

  if (excludeId) params.set("exclude", excludeId);

  const response = await fetch("/api/prompts?" + params.toString(), {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("練習問題を読み込めませんでした。もう一度お試しください。");
  }

  return response.json() as Promise<PromptResponse>;
}
