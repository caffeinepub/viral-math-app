import { CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import { triggerConfetti } from "../utils/confetti";
import { playBuzz, playDing } from "../utils/soundEffects";
import { CountdownTimer } from "./CountdownTimer";
import { ResultScreen } from "./ResultScreen";

interface Statement {
  id: number;
  topic: "Engagement Rate" | "Viral Growth" | "View Decay";
  topicEmoji: string;
  statement: string;
  isTrue: boolean;
  explanation: string;
}

const statements: Statement[] = [
  {
    id: 1,
    topic: "Engagement Rate",
    topicEmoji: "📊",
    statement:
      'An engagement rate above 7% on Instagram Reels is considered "absolutely slay" tier.',
    isTrue: true,
    explanation:
      "Correct! Below 3% = mid, 3–7% = it's giving, above 7% = absolutely slay. The algorithm loves high ER! 🔥",
  },
  {
    id: 2,
    topic: "Engagement Rate",
    topicEmoji: "📊",
    statement:
      "A reel with 1 million views and 0.1% engagement rate will always outperform a reel with 10,000 views and 8% engagement rate in future reach.",
    isTrue: false,
    explanation:
      "False! Instagram's algorithm prioritizes engagement rate over raw views. The 8% ER reel signals stronger audience connection and gets pushed further. 🚀",
  },
  {
    id: 3,
    topic: "Engagement Rate",
    topicEmoji: "📊",
    statement:
      "Engagement Rate = (Likes + Comments + Shares) / Followers × 100.",
    isTrue: false,
    explanation:
      "False! For Reels, ER is calculated using Views, not Followers: ER = (Likes + Comments + Shares) / Views × 100. 📐",
  },
  {
    id: 4,
    topic: "Engagement Rate",
    topicEmoji: "📊",
    statement:
      "If a reel gets 500 likes, 100 comments, and 400 shares from 10,000 views, the engagement rate is 10%.",
    isTrue: true,
    explanation:
      "(500 + 100 + 400) / 10,000 × 100 = 1,000 / 10,000 × 100 = 10%. That's slay tier! 💅",
  },
  {
    id: 5,
    topic: "Viral Growth",
    topicEmoji: "🚀",
    statement:
      "Viral growth is linear — each round adds the same fixed number of new viewers.",
    isTrue: false,
    explanation:
      "False! Viral growth is exponential. Each round multiplies the audience by the share factor. 100 viewers × 3 shares = 300, then 900, then 2,700... 📈",
  },
  {
    id: 6,
    topic: "Viral Growth",
    topicEmoji: "🚀",
    statement:
      "Starting with 100 viewers, each sharing to 2 others, after 5 rounds the total reach is 3,200.",
    isTrue: true,
    explanation:
      "100 × (2^5) = 100 × 32 = 3,200. Exponential growth hits different! 🤯",
  },
  {
    id: 7,
    topic: "Viral Growth",
    topicEmoji: "🚀",
    statement: "A share factor of 1 means your content will go viral.",
    isTrue: false,
    explanation:
      "False! A share factor of exactly 1 means each viewer shares to exactly 1 person — the audience stays flat, not growing. You need a share factor > 1 to go viral! 📊",
  },
  {
    id: 8,
    topic: "Viral Growth",
    topicEmoji: "🚀",
    statement:
      "Doubling the share factor has a bigger impact on reach than doubling the number of initial viewers.",
    isTrue: true,
    explanation:
      "True! Share factor is the exponent base — doubling it compounds exponentially across rounds. Initial viewers only scale linearly. The share factor is the real cheat code! 🎮",
  },
  {
    id: 9,
    topic: "View Decay",
    topicEmoji: "📉",
    statement:
      "A decay rate of 0.9 means a reel loses 90% of its views each day.",
    isTrue: false,
    explanation:
      "False! A decay rate of 0.9 means the reel retains 90% of views each day (loses only 10%). A decay rate of 0.1 would mean losing 90% daily. 📉",
  },
  {
    id: 10,
    topic: "View Decay",
    topicEmoji: "📉",
    statement:
      "A reel peaking at 100,000 views with a 0.5 decay rate will have approximately 12,500 views after 3 days.",
    isTrue: true,
    explanation:
      "100,000 × (0.5^3) = 100,000 × 0.125 = 12,500 views. That's the harsh reality of content decay! 😬",
  },
  {
    id: 11,
    topic: "View Decay",
    topicEmoji: "📉",
    statement:
      "Content with a higher decay rate stays relevant longer on the platform.",
    isTrue: false,
    explanation:
      "False! A higher decay rate means views drop off faster. Lower decay rate = longer shelf life. Evergreen content has a low decay rate! 🌿",
  },
  {
    id: 12,
    topic: "View Decay",
    topicEmoji: "📉",
    statement:
      "Trending audio can effectively lower a reel's decay rate by keeping it discoverable longer.",
    isTrue: true,
    explanation:
      "True! Trending audio keeps content surfaced in the audio discovery tab, extending its lifespan and reducing effective decay. Smart creators use this to their advantage! 🎵",
  },
];

const topicStyles: Record<
  string,
  { gradient: string; glow: string; badge: string }
> = {
  "Engagement Rate": {
    gradient:
      "linear-gradient(135deg, oklch(0.72 0.28 340), oklch(0.68 0.26 295))",
    glow: "oklch(0.72 0.28 340 / 0.35)",
    badge: "oklch(0.72 0.28 340 / 0.15)",
  },
  "Viral Growth": {
    gradient:
      "linear-gradient(135deg, oklch(0.82 0.20 195), oklch(0.78 0.22 145))",
    glow: "oklch(0.82 0.20 195 / 0.35)",
    badge: "oklch(0.82 0.20 195 / 0.15)",
  },
  "View Decay": {
    gradient:
      "linear-gradient(135deg, oklch(0.68 0.26 295), oklch(0.72 0.28 340))",
    glow: "oklch(0.68 0.26 295 / 0.35)",
    badge: "oklch(0.68 0.26 295 / 0.15)",
  },
};

export function TrueOrFalse() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean[]>(
    new Array(statements.length).fill(false),
  );
  const [timerKey, setTimerKey] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime] = useState(() => new Date());
  const [hasTimeouted, setHasTimeouted] = useState(false);

  const current = statements[currentIndex];
  const styles = topicStyles[current.topic];
  const isAnswered = answered[currentIndex];

  function handleTimeout() {
    if (isAnswered) return;
    setHasTimeouted(true);
    setIsTimerRunning(false);
    playBuzz();
    // Mark as answered (wrong/timeout)
    const newAnswered = [...answered];
    newAnswered[currentIndex] = true;
    setAnswered(newAnswered);
    setSelected(null); // null = timeout
  }

  function handleAnswer(choice: boolean) {
    if (isAnswered) return;
    setSelected(choice);
    setIsTimerRunning(false);
    const isCorrect = choice === current.isTrue;
    if (isCorrect) {
      setScore((s) => s + 10);
      playDing();
      triggerConfetti();
    } else {
      playBuzz();
    }
    const newAnswered = [...answered];
    newAnswered[currentIndex] = true;
    setAnswered(newAnswered);
  }

  function handleNext() {
    const nextIndex = currentIndex + 1;
    if (nextIndex < statements.length) {
      setCurrentIndex(nextIndex);
      setSelected(null);
      setHasTimeouted(false);
      setTimerKey((prev) => prev + 1);
      setIsTimerRunning(true);
    } else {
      setIsComplete(true);
    }
  }

  function handleRestart() {
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setAnswered(new Array(statements.length).fill(false));
    setTimerKey((prev) => prev + 1);
    setIsTimerRunning(true);
    setIsComplete(false);
    setHasTimeouted(false);
  }

  if (isComplete) {
    const timeTaken = Math.round(
      (new Date().getTime() - startTime.getTime()) / 1000,
    );
    const correctCount = Math.round(score / 10);
    return (
      <ResultScreen
        score={correctCount}
        total={statements.length}
        timeTakenSeconds={timeTaken}
        gameType="trueorfalse"
        onPlayAgain={handleRestart}
      />
    );
  }

  const isCorrectAnswer =
    isAnswered && selected !== null && selected === current.isTrue;
  const isTimeout = isAnswered && (hasTimeouted || selected === null);

  return (
    <div data-ocid="truefalse.panel" className="space-y-4">
      {/* Score + Progress */}
      <div className="glass-card rounded-3xl p-4 relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Score
            </span>
            <span className="font-display font-extrabold text-sm gradient-text-purple-pink">
              {score} pts
            </span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap justify-center max-w-[140px]">
            {statements.map((s, i) => (
              <div
                key={s.id}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  background:
                    i === currentIndex
                      ? "oklch(0.82 0.20 195)"
                      : answered[i]
                        ? "oklch(0.68 0.26 295)"
                        : "oklch(0.40 0.04 280 / 0.50)",
                  transform: i === currentIndex ? "scale(1.4)" : "scale(1)",
                }}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground font-bold">
            {currentIndex + 1} / {statements.length}
          </span>
        </div>

        {/* Timer */}
        <CountdownTimer
          seconds={15}
          onTimeout={handleTimeout}
          isRunning={isTimerRunning && !isAnswered}
          timerKey={timerKey}
        />
      </div>

      {/* Statement Card */}
      <div className="glass-card rounded-3xl p-6 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
          style={{ background: styles.gradient }}
        />
        <div
          className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ background: styles.glow }}
        />

        {/* Topic Badge */}
        <div
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 mb-4 text-xs font-bold"
          style={{
            background: styles.badge,
            border: `1px solid ${styles.glow}`,
          }}
        >
          <span>{current.topicEmoji}</span>
          <span className="text-foreground/80">{current.topic}</span>
        </div>

        <p className="font-display font-bold text-base text-foreground leading-relaxed mb-6">
          {current.statement}
        </p>

        {/* TRUE / FALSE Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* TRUE Button */}
          <button
            type="button"
            data-ocid="truefalse.true_button"
            onClick={() => handleAnswer(true)}
            disabled={isAnswered}
            className="py-4 rounded-2xl font-display font-extrabold text-lg text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] disabled:cursor-not-allowed relative overflow-hidden"
            style={{
              background: isAnswered
                ? current.isTrue
                  ? "linear-gradient(135deg, oklch(0.78 0.22 145), oklch(0.72 0.26 160))"
                  : selected === true
                    ? "oklch(0.30 0.04 280 / 0.60)"
                    : "oklch(0.30 0.04 280 / 0.40)"
                : "linear-gradient(135deg, oklch(0.78 0.22 145), oklch(0.72 0.26 160))",
              boxShadow:
                isAnswered && current.isTrue
                  ? "0 4px 20px oklch(0.78 0.22 145 / 0.50)"
                  : isAnswered && selected === true && !current.isTrue
                    ? "0 4px 20px oklch(0.72 0.28 340 / 0.30)"
                    : "0 4px 20px oklch(0.78 0.22 145 / 0.35)",
              opacity:
                isAnswered && selected === false && !current.isTrue ? 0.5 : 1,
            }}
          >
            {isAnswered && current.isTrue && (
              <CheckCircle2 className="inline w-5 h-5 mr-1.5 mb-0.5" />
            )}
            {isAnswered && selected === true && !current.isTrue && (
              <XCircle className="inline w-5 h-5 mr-1.5 mb-0.5" />
            )}
            ✅ TRUE
          </button>

          {/* FALSE Button */}
          <button
            type="button"
            data-ocid="truefalse.false_button"
            onClick={() => handleAnswer(false)}
            disabled={isAnswered}
            className="py-4 rounded-2xl font-display font-extrabold text-lg text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] disabled:cursor-not-allowed"
            style={{
              background: isAnswered
                ? !current.isTrue
                  ? "linear-gradient(135deg, oklch(0.72 0.28 340), oklch(0.68 0.26 295))"
                  : selected === false
                    ? "oklch(0.30 0.04 280 / 0.60)"
                    : "oklch(0.30 0.04 280 / 0.40)"
                : "linear-gradient(135deg, oklch(0.72 0.28 340), oklch(0.68 0.26 295))",
              boxShadow:
                isAnswered && !current.isTrue
                  ? "0 4px 20px oklch(0.72 0.28 340 / 0.50)"
                  : isAnswered && selected === false && current.isTrue
                    ? "0 4px 20px oklch(0.72 0.28 340 / 0.30)"
                    : "0 4px 20px oklch(0.72 0.28 340 / 0.35)",
              opacity:
                isAnswered && selected === true && current.isTrue ? 0.5 : 1,
            }}
          >
            {isAnswered && !current.isTrue && (
              <CheckCircle2 className="inline w-5 h-5 mr-1.5 mb-0.5" />
            )}
            {isAnswered && selected === false && current.isTrue && (
              <XCircle className="inline w-5 h-5 mr-1.5 mb-0.5" />
            )}
            ❌ FALSE
          </button>
        </div>

        {/* Explanation */}
        {isAnswered && (
          <div
            className="rounded-2xl p-4 flex items-start gap-3"
            style={{
              background: isCorrectAnswer
                ? "oklch(0.78 0.22 145 / 0.10)"
                : isTimeout
                  ? "oklch(0.65 0.28 25 / 0.10)"
                  : "oklch(0.72 0.28 340 / 0.10)",
              border: `1px solid ${
                isCorrectAnswer
                  ? "oklch(0.78 0.22 145 / 0.35)"
                  : isTimeout
                    ? "oklch(0.65 0.28 25 / 0.35)"
                    : "oklch(0.72 0.28 340 / 0.35)"
              }`,
            }}
          >
            {isCorrectAnswer ? (
              <CheckCircle2
                className="w-5 h-5 flex-shrink-0 mt-0.5"
                style={{ color: "oklch(0.78 0.22 145)" }}
              />
            ) : (
              <XCircle
                className="w-5 h-5 flex-shrink-0 mt-0.5"
                style={{
                  color: isTimeout
                    ? "oklch(0.65 0.28 25)"
                    : "oklch(0.72 0.28 340)",
                }}
              />
            )}
            <div>
              <p
                className="font-display font-bold text-sm mb-1"
                style={{
                  color: isCorrectAnswer
                    ? "oklch(0.78 0.22 145)"
                    : isTimeout
                      ? "oklch(0.80 0.24 25)"
                      : "oklch(0.72 0.28 340)",
                }}
              >
                {isCorrectAnswer
                  ? "🔥 Correct! +10 pts"
                  : isTimeout
                    ? "⏰ Time's Up!"
                    : "😬 Wrong!"}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {current.explanation}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Next Button */}
      {isAnswered && (
        <button
          type="button"
          data-ocid="truefalse.next_button"
          onClick={handleNext}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-display font-bold text-sm text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.72 0.28 340), oklch(0.82 0.20 195))",
            boxShadow: "0 4px 20px oklch(0.72 0.28 340 / 0.35)",
          }}
        >
          {currentIndex < statements.length - 1
            ? "Next Statement →"
            : "See Results 🎉"}
        </button>
      )}
    </div>
  );
}
