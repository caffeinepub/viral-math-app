import { Calendar, Flame, Lightbulb, Share2 } from "lucide-react";
import { useMemo, useState } from "react";
import { triggerConfetti } from "../utils/confetti";
import { playBuzz, playDing } from "../utils/soundEffects";
import { CountdownTimer } from "./CountdownTimer";

interface DailyQuestion {
  q: string;
  correct: string;
  wrong: string[];
}

const dailyQuestions: DailyQuestion[] = [
  {
    q: "What is the Engagement Rate formula?",
    correct: "(Likes + Comments + Shares) / Views × 100",
    wrong: [
      "Likes / Followers × 100",
      "Views / Total Posts × 100",
      "Shares / Comments × 100",
    ],
  },
  {
    q: "A reel gets 1000 views, 50 likes, 20 comments, 30 shares. What's the ER?",
    correct: "10%",
    wrong: ["5%", "0.1%", "15%"],
  },
  {
    q: "Viral Growth formula?",
    correct: "Initial Viewers × (Shares^Rounds)",
    wrong: [
      "Initial + Shares × Rounds",
      "Initial × Shares + Rounds",
      "Initial / Shares ^ Rounds",
    ],
  },
  {
    q: "100 viewers, 3 shares each, 3 rounds = ?",
    correct: "2700 viewers",
    wrong: ["900 viewers", "300 viewers", "27000 viewers"],
  },
  {
    q: "View Decay formula?",
    correct: "Peak Views × (Decay Rate ^ Days)",
    wrong: [
      "Peak Views - Decay Rate × Days",
      "Peak Views / Days × Decay Rate",
      "Peak Views + Decay Rate ^ Days",
    ],
  },
  {
    q: "Decay rate 0.8 means a reel retains how much per day?",
    correct: "80% of views",
    wrong: ["20% of views", "8% of views", "180% of views"],
  },
  {
    q: "What engagement rate tier is 5%?",
    correct: "It's giving 🌟 (3-7%)",
    wrong: ["Mid 😬 (0-3%)", "Absolutely slay 🔥 (7%+)", "Dead 💀 (below 1%)"],
  },
  {
    q: "Share factor of 1 in viral growth means?",
    correct: "No growth — audience stays flat",
    wrong: ["1% daily growth", "Doubles every round", "Guaranteed to go viral"],
  },
  {
    q: "Which has more reach? A: 1000 viewers × 2 shares × 4 rounds. B: 100 viewers × 4 shares × 4 rounds.",
    correct: "B: 25,600 (vs A: 16,000)",
    wrong: ["A: 16,000 wins", "They're equal", "B: 6,400"],
  },
  {
    q: "What does a decay rate closer to 1.0 mean?",
    correct: "Views drop very slowly — content stays relevant longer",
    wrong: [
      "Views drop very fast",
      "Content goes viral",
      "Views stay exactly the same",
    ],
  },
  {
    q: "A micro-influencer with 10K followers has 8% ER vs mega-influencer 1M followers 0.5% ER. Who is more valuable to brands per-post?",
    correct: "Micro-influencer (higher engagement quality)",
    wrong: [
      "Mega-influencer (more absolute reach)",
      "They are equal",
      "Neither — brands prefer verified accounts",
    ],
  },
  {
    q: "Reel peaks at 50K views. Decay rate 0.9. Views after 2 days?",
    correct: "40,500 views",
    wrong: ["45,000 views", "25,000 views", "36,000 views"],
  },
  {
    q: "What is the key signal Instagram's algorithm uses to decide future reach?",
    correct: "Engagement Rate",
    wrong: ["Follower count", "Post frequency", "Caption length"],
  },
  {
    q: "1000 initial viewers, 3 shares, 5 rounds = total reach?",
    correct: "243,000",
    wrong: ["15,000", "3,000", "729,000"],
  },
  {
    q: "Engagement rate below 3% is rated as?",
    correct: "Mid 😬",
    wrong: ["Absolutely slay 🔥", "It's giving 🌟", "Fire content 🎯"],
  },
];

function getTodayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function getDailyQuestion(): DailyQuestion {
  const now = new Date();
  const dayIndex =
    (now.getFullYear() * 366 + getDayOfYear(now)) % dailyQuestions.length;
  return dailyQuestions[dayIndex];
}

function shuffleOptions(
  correct: string,
  wrong: string[],
): { text: string; isCorrect: boolean }[] {
  const options = [
    { text: correct, isCorrect: true },
    ...wrong.map((w) => ({ text: w, isCorrect: false })),
  ];
  // Deterministic shuffle based on today's date
  const now = new Date();
  const seed = now.getDate() + now.getMonth() * 31;
  for (let i = options.length - 1; i > 0; i--) {
    const j = (seed + i * 7) % (i + 1);
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
}

function getStreak(): number {
  try {
    const raw = localStorage.getItem("daily_streak");
    if (!raw) return 0;
    const data = JSON.parse(raw) as { count: number; lastDate: string };
    const today = getTodayKey();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`;

    if (data.lastDate === yesterdayKey) {
      return data.count;
    }
    if (data.lastDate === today) {
      return data.count;
    }
    return 0;
  } catch {
    return 0;
  }
}

function updateStreak(): void {
  try {
    const today = getTodayKey();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`;

    const raw = localStorage.getItem("daily_streak");
    let count = 1;
    if (raw) {
      const data = JSON.parse(raw) as { count: number; lastDate: string };
      if (data.lastDate === yesterdayKey) {
        count = data.count + 1;
      } else if (data.lastDate === today) {
        count = data.count; // Already updated today
      }
    }
    localStorage.setItem(
      "daily_streak",
      JSON.stringify({ count, lastDate: today }),
    );
  } catch {
    // ignore
  }
}

type GameState = "playing" | "answered" | "completed";

export function DailyChallenge() {
  const todayKey = getTodayKey();
  const storageKey = `daily_challenge_${todayKey}`;

  const alreadyPlayed = useMemo(() => {
    try {
      return !!localStorage.getItem(storageKey);
    } catch {
      return false;
    }
  }, [storageKey]);

  const question = useMemo(() => getDailyQuestion(), []);
  const options = useMemo(
    () => shuffleOptions(question.correct, question.wrong),
    [question],
  );

  const [gameState, setGameState] = useState<GameState>(
    alreadyPlayed ? "completed" : "playing",
  );
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [timerKey] = useState(0);
  const [timeouted, setTimeouted] = useState(false);
  const [score, setScore] = useState(0);
  const [streak] = useState(getStreak);
  const [copied, setCopied] = useState(false);

  function handleTimeout() {
    if (gameState !== "playing") return;
    setTimeouted(true);
    setGameState("completed");
    playBuzz();
    saveResult(0);
  }

  function saveResult(pts: number) {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ score: pts, date: todayKey }),
      );
      updateStreak();
    } catch {
      // ignore
    }
  }

  function handleAnswer(option: { text: string; isCorrect: boolean }) {
    if (gameState !== "playing") return;

    setSelectedAnswer(option.text);
    const correct = option.isCorrect;
    setIsCorrect(correct);

    let pts = 0;
    if (correct) {
      pts = hintUsed ? 5 : 10;
      playDing();
      triggerConfetti();
    } else {
      playBuzz();
    }

    setScore(pts);
    setGameState("answered");
    saveResult(pts);

    // Auto-advance to completed
    setTimeout(() => setGameState("completed"), 1500);
  }

  function handleUseHint() {
    setHintUsed(true);
    setShowHint(true);
  }

  function handleShare() {
    const text = encodeURIComponent(
      `I just completed today's Daily Likes to Logic Challenge! 🔥 Score: ${score}/10 pts\nCan you beat it? → ${window.location.href}`,
    );
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  }

  function handleCopyShare() {
    const text = `Daily Likes to Logic Challenge ✅\nDate: ${todayKey}\nScore: ${score}/10 pts\n🔥 Try it at ${window.location.href}`;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {});
  }

  const isAnswered = gameState === "answered" || gameState === "completed";

  // Already played today
  if (alreadyPlayed && gameState === "completed") {
    const savedData = (() => {
      try {
        const raw = localStorage.getItem(storageKey);
        return raw
          ? (JSON.parse(raw) as { score: number; date: string })
          : null;
      } catch {
        return null;
      }
    })();

    return (
      <div
        data-ocid="daily.panel"
        className="glass-card rounded-3xl p-6 text-center relative overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.72 0.30 340), oklch(0.82 0.20 195))",
          }}
        />
        <div className="relative z-10">
          <div className="text-5xl mb-3">📅</div>
          <h3 className="font-display text-xl font-extrabold gradient-text-pink-blue mb-2">
            Daily Challenge Done!
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            You already played today. Come back tomorrow for a new question!
          </p>
          {savedData && (
            <div
              className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 mb-4"
              style={{
                background: "oklch(0.82 0.20 195 / 0.15)",
                border: "1px solid oklch(0.82 0.20 195 / 0.30)",
              }}
            >
              <span className="font-display font-extrabold gradient-text-cyan-green">
                Today's Score: {savedData.score}/10 pts
              </span>
            </div>
          )}
          <div className="flex items-center justify-center gap-2">
            <Flame
              className="w-4 h-4"
              style={{ color: "oklch(0.80 0.28 55)" }}
            />
            <span
              className="font-display font-bold text-sm"
              style={{ color: "oklch(0.80 0.28 55)" }}
            >
              {streak} day streak 🔥
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div data-ocid="daily.panel" className="flex flex-col gap-4">
      {/* Header */}
      <div className="glass-card rounded-3xl p-5 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.72 0.30 340), oklch(0.82 0.20 195), oklch(0.78 0.22 145))",
          }}
        />
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calendar
              className="w-5 h-5"
              style={{ color: "oklch(0.82 0.20 195)" }}
            />
            <div>
              <h2 className="font-display text-xl font-extrabold gradient-text-pink-blue">
                Daily Challenge 📅
              </h2>
              <p className="text-xs text-muted-foreground">{todayKey}</p>
            </div>
          </div>
          {streak > 0 && (
            <div
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
              style={{
                background: "oklch(0.80 0.28 55 / 0.15)",
                border: "1px solid oklch(0.80 0.28 55 / 0.35)",
              }}
            >
              <Flame
                className="w-3.5 h-3.5"
                style={{ color: "oklch(0.85 0.24 55)" }}
              />
              <span
                className="font-display font-bold text-xs"
                style={{ color: "oklch(0.85 0.24 55)" }}
              >
                {streak} day streak
              </span>
            </div>
          )}
        </div>

        {/* Timer (only during play) */}
        {gameState === "playing" && (
          <CountdownTimer
            seconds={20}
            onTimeout={handleTimeout}
            isRunning={gameState === "playing"}
            timerKey={timerKey}
          />
        )}
      </div>

      {/* Question */}
      <div
        className="glass-card rounded-3xl p-6 relative overflow-hidden"
        style={{ border: "1px solid oklch(0.72 0.30 340 / 0.20)" }}
      >
        <div
          className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ background: "oklch(0.72 0.30 340)" }}
        />
        <p className="font-display text-lg font-bold text-foreground leading-snug relative z-10">
          {question.q}
        </p>

        {/* Hint */}
        {showHint && (
          <div
            className="mt-3 rounded-2xl p-3 text-xs text-foreground/80 relative z-10"
            style={{
              background: "oklch(0.88 0.20 100 / 0.10)",
              border: "1px solid oklch(0.88 0.20 100 / 0.25)",
            }}
          >
            <span
              className="font-bold"
              style={{ color: "oklch(0.88 0.20 100)" }}
            >
              💡 Hint:{" "}
            </span>
            Focus on the formula and what each variable represents.
          </div>
        )}
      </div>

      {/* Answer Options */}
      <div className="grid grid-cols-1 gap-3">
        {options.map((option, idx) => {
          const isSelected = selectedAnswer === option.text;
          const showResult = isAnswered && (isSelected || option.isCorrect);

          let bg = "oklch(0.18 0.025 285 / 0.80)";
          let border = "oklch(0.35 0.04 285 / 0.30)";
          let textColor = "oklch(0.90 0.010 280)";

          if (showResult) {
            if (option.isCorrect) {
              bg = "oklch(0.78 0.22 145 / 0.15)";
              border = "oklch(0.78 0.22 145 / 0.50)";
              textColor = "oklch(0.88 0.20 145)";
            } else if (isSelected && !option.isCorrect) {
              bg = "oklch(0.65 0.28 25 / 0.15)";
              border = "oklch(0.65 0.28 25 / 0.50)";
              textColor = "oklch(0.80 0.24 25)";
            }
          }

          const ocids = [
            "daily.answer_button.1",
            "daily.answer_button.2",
            "daily.answer_button.3",
            "daily.answer_button.4",
          ] as const;

          return (
            <button
              type="button"
              key={option.text}
              data-ocid={ocids[idx]}
              onClick={() => handleAnswer(option)}
              disabled={isAnswered}
              className="w-full text-left rounded-2xl px-4 py-3.5 font-display font-semibold text-sm transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed"
              style={{
                background: bg,
                border: `1px solid ${border}`,
                color: textColor,
                boxShadow:
                  showResult && option.isCorrect
                    ? "0 0 12px oklch(0.78 0.22 145 / 0.30)"
                    : undefined,
              }}
            >
              <span className="opacity-50 mr-2 font-mono">
                {String.fromCharCode(65 + idx)}.
              </span>
              {option.text}
              {showResult && option.isCorrect && " ✅"}
              {showResult && isSelected && !option.isCorrect && " ❌"}
            </button>
          );
        })}
      </div>

      {/* Hint Button (only during play, not yet used) */}
      {gameState === "playing" && !hintUsed && (
        <button
          type="button"
          data-ocid="daily.hint_button"
          onClick={handleUseHint}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl font-display font-bold text-sm transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
          style={{
            background: "oklch(0.88 0.20 100 / 0.10)",
            border: "1px solid oklch(0.88 0.20 100 / 0.30)",
            color: "oklch(0.88 0.20 100)",
          }}
        >
          <Lightbulb className="w-4 h-4" />
          Use Hint 💡 <span className="text-xs opacity-70">(–5 pts)</span>
        </button>
      )}

      {/* Result feedback */}
      {gameState !== "playing" && (
        <div
          className="glass-card rounded-3xl p-5 text-center relative overflow-hidden animate-scale-in"
          style={{
            border: timeouted
              ? "1px solid oklch(0.65 0.28 25 / 0.40)"
              : isCorrect
                ? "1px solid oklch(0.78 0.22 145 / 0.40)"
                : "1px solid oklch(0.65 0.28 25 / 0.40)",
          }}
        >
          <div className="text-4xl mb-2">
            {timeouted ? "⏰" : isCorrect ? "🎉" : "😬"}
          </div>
          <h3
            className="font-display text-lg font-extrabold mb-1"
            style={{
              color: timeouted
                ? "oklch(0.80 0.24 25)"
                : isCorrect
                  ? "oklch(0.88 0.20 145)"
                  : "oklch(0.80 0.24 25)",
            }}
          >
            {timeouted
              ? "Time's Up!"
              : isCorrect
                ? "Correct! 🔥"
                : "Wrong Answer!"}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            {timeouted
              ? `You ran out of time! The answer was: ${question.correct}`
              : isCorrect
                ? `You earned ${score} points${hintUsed ? " (hint used)" : ""}!`
                : `The correct answer was: ${question.correct}`}
          </p>
          <p className="text-xs text-muted-foreground">
            Come back tomorrow for a new question! 📅
          </p>

          {/* Share result */}
          {(isCorrect || timeouted) && (
            <div className="flex gap-3 mt-4 justify-center">
              <button
                type="button"
                data-ocid="daily.share_button"
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 rounded-2xl font-display font-bold text-sm text-white transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.55 0.18 150), oklch(0.45 0.15 145))",
                  boxShadow: "0 4px 12px oklch(0.55 0.18 150 / 0.35)",
                }}
              >
                <Share2 className="w-3.5 h-3.5" />
                Share
              </button>
              <button
                type="button"
                onClick={handleCopyShare}
                className="flex items-center gap-2 px-4 py-2 rounded-2xl font-display font-bold text-sm text-white transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: copied
                    ? "linear-gradient(135deg, oklch(0.78 0.22 145), oklch(0.72 0.26 160))"
                    : "linear-gradient(135deg, oklch(0.72 0.30 340), oklch(0.68 0.26 295))",
                  boxShadow: "0 4px 12px oklch(0.72 0.30 340 / 0.35)",
                }}
              >
                {copied ? "✅ Copied!" : "📋 Copy"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
