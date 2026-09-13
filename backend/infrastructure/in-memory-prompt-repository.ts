import type { PromptRepository } from "@/backend/domain/prompt-repository";
import { PROMPTS } from "@/backend/data/prompts";
import type {
  Difficulty,
  TrainingMode,
  TrainingPrompt,
} from "@/shared/training";

export class InMemoryPromptRepository implements PromptRepository {
  findByModeAndDifficulty(
    mode: TrainingMode,
    difficulty: Difficulty,
  ): readonly TrainingPrompt[] {
    return PROMPTS.filter(
      (prompt) => prompt.mode === mode && prompt.difficulty === difficulty,
    );
  }
}
