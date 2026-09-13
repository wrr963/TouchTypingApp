"use client";

import {
  fetchNextPrompt,
  PromptPoolExhaustedError,
} from "@/frontend/services/prompt-client";
import type {
  Difficulty,
  TrainingMode,
  TrainingPrompt,
} from "@/shared/training";
import {
  type ChangeEvent,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type SessionPhase =
  | "ready"
  | "loading"
  | "running"
  | "paused"
  | "finished";

export type SessionMinutes = 1 | 2 | 3 | 4 | 5;

const DEFAULT_SESSION_MINUTES: SessionMinutes = 3;
const BEST_SCORE_KEY = "keydrift-best-score";

export function useTypingSession() {
  const [mode, setModeState] = useState<TrainingMode>("general");
  const [difficulty, setDifficultyState] = useState<Difficulty>(2);
  const [durationMinutes, setDurationMinutes] = useState<SessionMinutes>(
    DEFAULT_SESSION_MINUTES,
  );
  const [phase, setPhase] = useState<SessionPhase>("ready");
  const [prompt, setPrompt] = useState<TrainingPrompt | null>(null);
  const [typed, setTyped] = useState("");
  const [remaining, setRemaining] = useState(
    DEFAULT_SESSION_MINUTES * 60,
  );
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [completedChars, setCompletedChars] = useState(0);
  const [keystrokes, setKeystrokes] = useState(0);
  const [errorKeystrokes, setErrorKeystrokes] = useState(0);
  const [promptErrors, setPromptErrors] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lastLearned, setLastLearned] = useState<TrainingPrompt | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [loadError, setLoadError] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const seenPromptIdsRef = useRef<string[]>([]);
  const durationSeconds = durationMinutes * 60;

  useEffect(() => {
    const saved = Number(window.localStorage.getItem(BEST_SCORE_KEY));
    if (Number.isFinite(saved)) setBestScore(saved);
  }, []);

  useEffect(() => {
    if (phase !== "running") return;

    const timer = window.setInterval(() => {
      setRemaining((current) => {
        if (current <= 1) {
          setPhase("finished");
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [phase]);

  useEffect(() => {
    if (phase === "running") {
      window.setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [phase, prompt]);

  useEffect(() => {
    if (phase !== "finished") return;
    setBestScore((current) => {
      const next = Math.max(current, score);
      window.localStorage.setItem(BEST_SCORE_KEY, String(next));
      return next;
    });
  }, [phase, score]);

  useEffect(
    () => () => {
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    },
    [],
  );

  const loadPrompt = useCallback(
    async (): Promise<"loaded" | "exhausted" | "error"> => {
      setLoadError("");
      try {
        const response = await fetchNextPrompt(
          mode,
          difficulty,
          seenPromptIdsRef.current,
        );
        seenPromptIdsRef.current = [
          ...seenPromptIdsRef.current,
          response.prompt.id,
        ];
        setPrompt(response.prompt);
        setTyped("");
        setPromptErrors(0);
        setTransitioning(false);
        return "loaded";
      } catch (error) {
        if (error instanceof PromptPoolExhaustedError) {
          setPrompt(null);
          setTransitioning(false);
          setPhase("finished");
          return "exhausted";
        }

        setLoadError(
          error instanceof Error
            ? error.message
            : "練習問題を読み込めませんでした。",
        );
        setPhase("ready");
        setTransitioning(false);
        return "error";
      }
    },
    [difficulty, mode],
  );

  const start = useCallback(async () => {
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    seenPromptIdsRef.current = [];
    setPhase("loading");
    setRemaining(durationSeconds);
    setScore(0);
    setCompleted(0);
    setCompletedChars(0);
    setKeystrokes(0);
    setErrorKeystrokes(0);
    setPromptErrors(0);
    setStreak(0);
    setLastLearned(null);
    setTyped("");
    const result = await loadPrompt();
    if (result === "loaded") setPhase("running");
  }, [durationSeconds, loadPrompt]);

  const finishPrompt = useCallback(
    (finishedPrompt: TrainingPrompt, errors: number) => {
      const cleanBonus = errors === 0 ? 80 : 0;
      const earned = Math.max(
        20,
        finishedPrompt.text.length * difficulty * 3 + cleanBonus - errors * 4,
      );
      setScore((current) => current + earned + streak * 12);
      setCompleted((current) => current + 1);
      setCompletedChars((current) => current + finishedPrompt.text.length);
      setStreak((current) => (errors === 0 ? current + 1 : 0));
      setLastLearned(finishedPrompt);
      setTransitioning(true);

      advanceTimerRef.current = setTimeout(() => {
        void loadPrompt();
      }, 420);
    },
    [difficulty, loadPrompt, streak],
  );

  const applyInput = useCallback(
    (nextRaw: string) => {
      if (phase !== "running" || !prompt || transitioning) return;
      const next = nextRaw.slice(0, prompt.text.length);

      if (next.length > typed.length) {
        const added = next.slice(typed.length);
        let newErrors = 0;
        for (let offset = 0; offset < added.length; offset += 1) {
          if (added[offset] !== prompt.text[typed.length + offset]) {
            newErrors += 1;
          }
        }
        setKeystrokes((current) => current + added.length);
        setErrorKeystrokes((current) => current + newErrors);
        setPromptErrors((current) => current + newErrors);
        setTyped(next);

        if (next === prompt.text) {
          finishPrompt(prompt, promptErrors + newErrors);
        }
        return;
      }

      setTyped(next);
    },
    [finishPrompt, phase, prompt, promptErrors, transitioning, typed],
  );

  const onChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      applyInput(event.currentTarget.value);
    },
    [applyInput],
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setPhase("paused");
        return;
      }

      if (event.key === "Tab") {
        event.preventDefault();
        applyInput(typed + "\t");
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        if (event.altKey) applyInput(typed + "\n");
      }
    },
    [applyInput, typed],
  );

  const selectMode = useCallback((next: TrainingMode) => {
    seenPromptIdsRef.current = [];
    setModeState(next);
    setPhase("ready");
    setPrompt(null);
    setLastLearned(null);
  }, []);

  const selectDifficulty = useCallback((next: Difficulty) => {
    seenPromptIdsRef.current = [];
    setDifficultyState(next);
    setPhase("ready");
    setPrompt(null);
    setLastLearned(null);
  }, []);

  const selectDuration = useCallback((next: SessionMinutes) => {
    seenPromptIdsRef.current = [];
    setDurationMinutes(next);
    setRemaining(next * 60);
    setPhase("ready");
    setPrompt(null);
    setLastLearned(null);
  }, []);

  const pause = useCallback(() => {
    if (phase === "running") setPhase("paused");
  }, [phase]);

  const resume = useCallback(() => setPhase("running"), []);

  const reset = useCallback(() => {
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    seenPromptIdsRef.current = [];
    setPhase("ready");
    setPrompt(null);
    setTyped("");
    setRemaining(durationSeconds);
    setTransitioning(false);
  }, [durationSeconds]);

  const elapsed = durationSeconds - remaining;
  const wpm = useMemo(() => {
    if (elapsed <= 0) return 0;
    return Math.round(((completedChars + typed.length) / 5) * (60 / elapsed));
  }, [completedChars, elapsed, typed.length]);
  const accuracy = useMemo(
    () =>
      keystrokes === 0
        ? 100
        : Math.max(0, Math.round(((keystrokes - errorKeystrokes) / keystrokes) * 100)),
    [errorKeystrokes, keystrokes],
  );
  const progress = (elapsed / durationSeconds) * 100;

  return {
    mode,
    difficulty,
    durationMinutes,
    phase,
    prompt,
    typed,
    remaining,
    score,
    bestScore,
    completed,
    streak,
    lastLearned,
    transitioning,
    loadError,
    inputRef,
    wpm,
    accuracy,
    progress,
    start,
    pause,
    resume,
    reset,
    selectMode,
    selectDifficulty,
    selectDuration,
    onChange,
    onKeyDown,
  };
}
