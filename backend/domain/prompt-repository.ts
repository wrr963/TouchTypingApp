import type {
  Difficulty,
  TrainingMode,
  TrainingPrompt,
} from "@/shared/training";

export interface PromptRepository {
  findByModeAndDifficulty(
    mode: TrainingMode,
    difficulty: Difficulty,
  ): readonly TrainingPrompt[];
}
