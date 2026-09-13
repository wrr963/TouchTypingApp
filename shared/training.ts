export type TrainingMode = "general" | "engineer";
export type Difficulty = 1 | 2 | 3;

export interface TrainingPrompt {
  id: string;
  mode: TrainingMode;
  difficulty: Difficulty;
  category: string;
  title: string;
  text: string;
  explanation: string;
  sourceLabel?: string;
}

export interface PromptResponse {
  prompt: TrainingPrompt;
  poolSize: number;
}
