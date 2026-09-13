import type { PromptRepository } from "@/backend/domain/prompt-repository";
import type {
  Difficulty,
  PromptResponse,
  TrainingMode,
} from "@/shared/training";

export class GetNextPrompt {
  constructor(private readonly repository: PromptRepository) {}

  execute(
    mode: TrainingMode,
    difficulty: Difficulty,
    excludeId?: string,
  ): PromptResponse {
    const pool = this.repository.findByModeAndDifficulty(mode, difficulty);
    const candidates =
      pool.length > 1 ? pool.filter((prompt) => prompt.id !== excludeId) : pool;

    if (candidates.length === 0) {
      throw new Error("No training prompts are available for this selection.");
    }

    const index = Math.floor(Math.random() * candidates.length);
    return { prompt: candidates[index], poolSize: pool.length };
  }
}
