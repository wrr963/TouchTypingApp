import type { PromptRepository } from "@/backend/domain/prompt-repository";
import type {
  Difficulty,
  PromptResponse,
  TrainingMode,
} from "@/shared/training";

export class PromptPoolExhaustedError extends Error {
  constructor(public readonly poolSize: number) {
    super("Every prompt in this pool has already been used.");
    this.name = "PromptPoolExhaustedError";
  }
}

export class GetNextPrompt {
  constructor(private readonly repository: PromptRepository) {}

  execute(
    mode: TrainingMode,
    difficulty: Difficulty,
    excludeIds: readonly string[] = [],
  ): PromptResponse {
    const pool = this.repository.findByModeAndDifficulty(mode, difficulty);
    const excluded = new Set(excludeIds);
    const candidates = pool.filter((prompt) => !excluded.has(prompt.id));

    if (candidates.length === 0) {
      throw new PromptPoolExhaustedError(pool.length);
    }

    const index = Math.floor(Math.random() * candidates.length);
    return { prompt: candidates[index], poolSize: pool.length };
  }
}
