"use client";

import { useTypingSession } from "@/frontend/hooks/use-typing-session";
import type { Difficulty, TrainingMode } from "@/shared/training";
import {
  Badge,
  Button,
  Loader,
  Progress,
  SegmentedControl,
  Tooltip,
} from "@mantine/core";
import { useMemo } from "react";

const MODE_COPY: Record<
  TrainingMode,
  { index: string; title: string; caption: string }
> = {
  general: {
    index: "01",
    title: "GENERAL",
    caption: "知識・時事・思考法",
  },
  engineer: {
    index: "02",
    title: "ENGINEER",
    caption: "コード・インフラ・データ",
  },
};

const DIFFICULTY_COPY: Record<
  Difficulty,
  { name: string; detail: string }
> = {
  1: { name: "FLOW", detail: "短文 / 記号少なめ" },
  2: { name: "FOCUS", detail: "複文 / 改行あり" },
  3: { name: "VOID", detail: "長文 / code + tab" },
};

const keyLabel = (character: string) => {
  if (character === " ") return " ";
  if (character === "\n") return "\n";
  if (character === "\t") return "\t";
  return character;
};

function PromptText({
  text,
  typed,
}: {
  text: string;
  typed: string;
}) {
  return (
    <div className="prompt-text" aria-label={text}>
      {Array.from(text).map((character, index) => {
        let state = "pending";
        if (index < typed.length) {
          state = typed[index] === character ? "correct" : "wrong";
        } else if (index === typed.length) {
          state = "current";
        }

        return (
          <span
            className={"prompt-char " + state}
            key={index + "-" + character}
          >
            {keyLabel(character)}
          </span>
        );
      })}
    </div>
  );
}

function Metric({
  label,
  value,
  unit,
  accent,
}: {
  label: string;
  value: number | string;
  unit?: string;
  accent?: boolean;
}) {
  return (
    <div className={"metric " + (accent ? "metric-accent" : "")}>
      <span>{label}</span>
      <strong>
        {value}
        {unit && <small>{unit}</small>}
      </strong>
    </div>
  );
}

export function TypingTrainer() {
  const session = useTypingSession();
  const configurationLocked =
    session.phase === "running" ||
    session.phase === "loading" ||
    session.phase === "paused";
  const modeCopy = MODE_COPY[session.mode];
  const completion = useMemo(() => {
    if (!session.prompt) return 0;
    return Math.round((session.typed.length / session.prompt.text.length) * 100);
  }, [session.prompt, session.typed.length]);

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <a className="brand" href="#" aria-label="Keydrift home">
          <span className="brand-mark">K</span>
          <span>KEYDRIFT</span>
          <i>LAB</i>
        </a>
        <div className="topbar-meta">
          <span className="system-status">
            <i />
            SYSTEM READY
          </span>
          <span className="best-score">
            PERSONAL BEST <strong>{session.bestScore.toLocaleString()}</strong>
          </span>
        </div>
      </header>

      <main>
        <section className="intro-grid">
          <div className="intro-copy">
            <p className="eyebrow">
              <span>ADVANCED TYPING PROTOCOL</span>
              <span>SESSION / 60 SEC</span>
            </p>
            <h1>
              THINK FAST.
              <br />
              <em>TYPE FASTER.</em>
            </h1>
            <p className="intro-description">
              記号、数字、英語、日本語、コード。
              <br />
              知識を取り込みながら、指先の限界を更新する。
            </p>
          </div>

          <div className="mode-panel">
            <div className="panel-label">
              <span>SELECT PROTOCOL</span>
              <span>MODE / DIFFICULTY</span>
            </div>
            <SegmentedControl
              fullWidth
              className="mode-control"
              value={session.mode}
              disabled={configurationLocked}
              onChange={(value) =>
                session.selectMode(value as TrainingMode)
              }
              data={[
                {
                  value: "general",
                  label: (
                    <span className="mode-option">
                      <b>01</b>
                      <span>
                        GENERAL
                        <small>一般・知識</small>
                      </span>
                    </span>
                  ),
                },
                {
                  value: "engineer",
                  label: (
                    <span className="mode-option">
                      <b>02</b>
                      <span>
                        ENGINEER
                        <small>技術・コード</small>
                      </span>
                    </span>
                  ),
                },
              ]}
            />
            <SegmentedControl
              fullWidth
              className="difficulty-control"
              value={String(session.difficulty)}
              disabled={configurationLocked}
              onChange={(value) =>
                session.selectDifficulty(Number(value) as Difficulty)
              }
              data={([1, 2, 3] as Difficulty[]).map((level) => ({
                value: String(level),
                label: (
                  <span className="difficulty-option">
                    <b>0{level}</b>
                    <span>{DIFFICULTY_COPY[level].name}</span>
                  </span>
                ),
              }))}
            />
            <p className="difficulty-detail">
              <span>{DIFFICULTY_COPY[session.difficulty].detail}</span>
              <b>× {session.difficulty}.0 SCORE</b>
            </p>
          </div>
        </section>

        <section className="training-grid">
          <div className="session-column">
            <div className="session-head">
              <div className="session-identity">
                <span className="session-index">{modeCopy.index}</span>
                <div>
                  <strong>{modeCopy.title} PROTOCOL</strong>
                  <span>{modeCopy.caption}</span>
                </div>
              </div>
              <div className="timer">
                <span>TIME LEFT</span>
                <strong>
                  00:{String(session.remaining).padStart(2, "0")}
                </strong>
              </div>
            </div>

            <div
              className={
                "typing-stage " +
                (session.phase === "running" ? "stage-active" : "")
              }
              onClick={() => session.inputRef.current?.focus()}
            >
              <Progress
                value={session.progress}
                size={2}
                radius={0}
                className="session-progress"
                aria-label="Session progress"
              />

              {session.phase === "ready" && (
                <div className="launch-state">
                  <span className="launch-glyph">⌁</span>
                  <p>PROTOCOL CONFIGURED</p>
                  <h2>
                    {modeCopy.title} / {DIFFICULTY_COPY[session.difficulty].name}
                  </h2>
                  <span className="launch-caption">
                    60秒。正確さを保ち、流れを止めない。
                  </span>
                  <Button
                    color="lime"
                    size="lg"
                    className="primary-action"
                    onClick={session.start}
                  >
                    START SESSION <span>↗</span>
                  </Button>
                  {session.loadError && (
                    <p className="error-message">{session.loadError}</p>
                  )}
                </div>
              )}

              {session.phase === "loading" && (
                <div className="loading-state">
                  <Loader color="lime" type="bars" />
                  <span>LOADING PROTOCOL...</span>
                </div>
              )}

              {session.prompt &&
                (session.phase === "running" ||
                  session.phase === "paused") && (
                  <>
                    <div className="prompt-meta">
                      <Badge
                        color="lime"
                        variant="light"
                        radius="xs"
                        className="category-badge"
                      >
                        {session.prompt.category}
                      </Badge>
                      <span>{session.prompt.title}</span>
                      <span className="prompt-count">{completion}%</span>
                    </div>
                    <PromptText
                      text={session.prompt.text}
                      typed={session.typed}
                    />
                    <textarea
                      ref={session.inputRef}
                      className="capture-input"
                      value={session.typed}
                      onChange={session.onChange}
                      onKeyDown={session.onKeyDown}
                      onPaste={(event) => event.preventDefault()}
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck={false}
                      aria-label="タイピング入力"
                    />
                    <div className="typing-foot">
                      <span>
                        <i className="pulse-dot" /> INPUT CAPTURED
                      </span>
                      <span>TYPE THE HIGHLIGHTED CHARACTER</span>
                    </div>
                    {session.transitioning && (
                      <div className="clear-flash">
                        <span>LOCKED IN</span>
                        <b>+</b>
                      </div>
                    )}
                  </>
                )}

              {session.phase === "paused" && (
                <div className="state-overlay">
                  <span>SESSION PAUSED</span>
                  <h2>指を休めたら、流れへ戻ろう。</h2>
                  <Button
                    color="lime"
                    className="primary-action"
                    onClick={session.resume}
                  >
                    RESUME
                  </Button>
                </div>
              )}

              {session.phase === "finished" && (
                <div className="result-state">
                  <p>SESSION COMPLETE</p>
                  <h2>{session.score.toLocaleString()}</h2>
                  <span>TOTAL SCORE</span>
                  <div className="result-summary">
                    <div>
                      <strong>{session.wpm}</strong>
                      <span>WPM</span>
                    </div>
                    <div>
                      <strong>{session.accuracy}%</strong>
                      <span>ACCURACY</span>
                    </div>
                    <div>
                      <strong>{session.completed}</strong>
                      <span>CLEARED</span>
                    </div>
                  </div>
                  <Button
                    color="lime"
                    size="lg"
                    className="primary-action"
                    onClick={session.start}
                  >
                    RUN IT AGAIN <span>↗</span>
                  </Button>
                  <Button
                    variant="subtle"
                    color="gray"
                    className="secondary-action"
                    onClick={session.reset}
                  >
                    CHANGE PROTOCOL
                  </Button>
                </div>
              )}
            </div>

            <div className="shortcut-row">
              <Tooltip label="改行文字を入力します" withArrow>
                <span>
                  <kbd>ALT</kbd> + <kbd>ENTER</kbd> 改行
                </span>
              </Tooltip>
              <Tooltip label="Tab文字を入力します" withArrow>
                <span>
                  <kbd>TAB</kbd> インデント
                </span>
              </Tooltip>
              <Tooltip label="セッションを一時停止します" withArrow>
                <span>
                  <kbd>ESC</kbd> 一時停止
                </span>
              </Tooltip>
              {session.phase === "running" && (
                <button className="pause-button" onClick={session.pause}>
                  PAUSE
                </button>
              )}
            </div>
          </div>

          <aside className="stats-column">
            <div className="metrics-grid">
              <Metric label="WORDS / MIN" value={session.wpm} accent />
              <Metric label="ACCURACY" value={session.accuracy} unit="%" />
              <Metric label="SCORE" value={session.score.toLocaleString()} />
              <Metric label="STREAK" value={session.streak} unit="×" />
            </div>

            <div className="knowledge-card">
              <div className="knowledge-head">
                <span>KNOWLEDGE DROP</span>
                <i>{session.lastLearned ? "UNLOCKED" : "STANDBY"}</i>
              </div>
              {session.lastLearned ? (
                <div className="knowledge-content">
                  <span className="knowledge-index">
                    0{Math.min(session.completed, 9)}
                  </span>
                  <Badge color="lime" variant="dot">
                    {session.lastLearned.category}
                  </Badge>
                  <h3>{session.lastLearned.title}</h3>
                  <p>{session.lastLearned.explanation}</p>
                </div>
              ) : (
                <div className="knowledge-empty">
                  <span>◇</span>
                  <p>
                    問題を完了すると、
                    <br />
                    ここに知識の解説が現れます。
                  </p>
                </div>
              )}
            </div>

            <div className="run-status">
              <span>CLEARED</span>
              <strong>{String(session.completed).padStart(2, "0")}</strong>
              <span>KEEP YOUR RHYTHM</span>
            </div>
          </aside>
        </section>
      </main>

      <footer>
        <span>KEYDRIFT LAB / TOUCH TYPING SYSTEM</span>
        <span>NO ACCOUNT. NO DISTRACTIONS. JUST FLOW.</span>
      </footer>
    </div>
  );
}
