import { Lightbulb, RotateCcw, Shuffle } from "lucide-react";
import { useRef, useState } from "react";
import { triggerConfetti } from "../utils/confetti";
import { playBuzz, playDing } from "../utils/soundEffects";
import { CountdownTimer } from "./CountdownTimer";
import { ResultScreen } from "./ResultScreen";

interface Flashcard {
  id: number;
  topic: "Engagement Rate" | "Viral Growth" | "View Decay";
  topicEmoji: string;
  question: string;
  answer: string;
  explanation: string;
  gradient: string;
  glowColor: string;
}

const flashcards: Flashcard[] = [
  // Engagement Rate
  {
    id: 1,
    topic: "Engagement Rate",
    topicEmoji: "📊",
    question:
      "A reel gets 10,000 views, 800 likes, 120 comments, and 80 shares. What is the engagement rate?",
    answer: "10%",
    explanation:
      "ER = (800 + 120 + 80) / 10,000 × 100 = 1,000 / 10,000 × 100 = 10%. That's absolutely slay! 🔥",
    gradient:
      "linear-gradient(135deg, oklch(0.72 0.28 340), oklch(0.68 0.26 295))",
    glowColor: "oklch(0.72 0.28 340 / 0.40)",
  },
  {
    id: 2,
    topic: "Engagement Rate",
    topicEmoji: "📊",
    question: "What is the formula for Engagement Rate on Instagram Reels?",
    answer: "ER = (Likes + Comments + Shares) / Views × 100",
    explanation:
      "This formula measures the percentage of viewers who actually interacted with your content. Higher = more viral potential! 💅",
    gradient:
      "linear-gradient(135deg, oklch(0.68 0.26 295), oklch(0.72 0.28 340))",
    glowColor: "oklch(0.68 0.26 295 / 0.40)",
  },
  {
    id: 3,
    topic: "Engagement Rate",
    topicEmoji: "📊",
    question:
      "A reel has 5% engagement rate. Is this mid, it's giving, or absolutely slay?",
    answer: "It's giving! 🌟",
    explanation:
      "Below 3% = mid. 3–7% = it's giving. Above 7% = absolutely slay. 5% is solid — the algorithm will notice you! 👀",
    gradient:
      "linear-gradient(135deg, oklch(0.72 0.28 340), oklch(0.68 0.26 295))",
    glowColor: "oklch(0.72 0.28 340 / 0.40)",
  },
  {
    id: 4,
    topic: "Engagement Rate",
    topicEmoji: "📊",
    question:
      "Your reel has 50,000 views but only 200 likes, 30 comments, and 20 shares. What's the ER and vibe?",
    answer: "ER = 0.5% — mid 😬",
    explanation:
      "(200 + 30 + 20) / 50,000 × 100 = 0.5%. Low engagement despite high views means the algorithm won't push it further. Time to rethink your hook! 🎣",
    gradient:
      "linear-gradient(135deg, oklch(0.68 0.26 295), oklch(0.72 0.28 340))",
    glowColor: "oklch(0.68 0.26 295 / 0.40)",
  },
  {
    id: 5,
    topic: "Engagement Rate",
    topicEmoji: "📊",
    question:
      "Why does engagement rate matter more than raw view count for going viral?",
    answer: "The algorithm uses ER to decide who else to show your content to.",
    explanation:
      "Instagram's algorithm prioritizes content with high engagement signals. A reel with 1K views and 10% ER can outperform one with 100K views and 0.5% ER in terms of future reach! 🚀",
    gradient:
      "linear-gradient(135deg, oklch(0.72 0.28 340), oklch(0.68 0.26 295))",
    glowColor: "oklch(0.72 0.28 340 / 0.40)",
  },
  // Viral Growth
  {
    id: 6,
    topic: "Viral Growth",
    topicEmoji: "🚀",
    question:
      "A reel starts with 100 initial viewers. Each person shares it to 3 others. After 4 rounds, what's the total reach?",
    answer: "8,100 people",
    explanation:
      "Reach = 100 × (3^4) = 100 × 81 = 8,100. Exponential growth is no joke — that's the power of sharing chains! 🔗",
    gradient:
      "linear-gradient(135deg, oklch(0.82 0.20 195), oklch(0.78 0.22 145))",
    glowColor: "oklch(0.82 0.20 195 / 0.40)",
  },
  {
    id: 7,
    topic: "Viral Growth",
    topicEmoji: "🚀",
    question: "What is the Viral Growth formula for Instagram Reels?",
    answer: "Reach = Initial Viewers × (Shares per Person ^ Rounds)",
    explanation:
      "This exponential model shows how content spreads through sharing chains. Even a small increase in shares per person dramatically multiplies total reach! 📈",
    gradient:
      "linear-gradient(135deg, oklch(0.78 0.22 145), oklch(0.82 0.20 195))",
    glowColor: "oklch(0.78 0.22 145 / 0.40)",
  },
  {
    id: 8,
    topic: "Viral Growth",
    topicEmoji: "🚀",
    question:
      "Content A: 500 initial viewers, 2 shares/person, 5 rounds. Content B: 100 initial viewers, 4 shares/person, 5 rounds. Which reaches more people?",
    answer: "Content B reaches 102,400 vs Content A's 16,000!",
    explanation:
      "A: 500 × 2^5 = 16,000. B: 100 × 4^5 = 102,400. The shares-per-person multiplier is way more powerful than initial audience size. Quality > quantity! 💎",
    gradient:
      "linear-gradient(135deg, oklch(0.82 0.20 195), oklch(0.78 0.22 145))",
    glowColor: "oklch(0.82 0.20 195 / 0.40)",
  },
  {
    id: 9,
    topic: "Viral Growth",
    topicEmoji: "🚀",
    question:
      "If shares per person drops from 3 to 2, how does that affect reach after 6 rounds with 1,000 initial viewers?",
    answer: "Drops from 729,000 to 64,000 — a 91% decrease!",
    explanation:
      "1,000 × 3^6 = 729,000 vs 1,000 × 2^6 = 64,000. One less share per person = massive difference. This is why shareable content is everything! 🎯",
    gradient:
      "linear-gradient(135deg, oklch(0.78 0.22 145), oklch(0.82 0.20 195))",
    glowColor: "oklch(0.78 0.22 145 / 0.40)",
  },
  // View Decay
  {
    id: 10,
    topic: "View Decay",
    topicEmoji: "📉",
    question:
      "A reel peaks at 50,000 views. With a decay rate of 0.7 per day, how many views on day 3?",
    answer: "17,150 views",
    explanation:
      "Views = 50,000 × (0.7^3) = 50,000 × 0.343 = 17,150. Content loses momentum fast — that's why posting consistently is the move! 📅",
    gradient:
      "linear-gradient(135deg, oklch(0.68 0.26 295), oklch(0.72 0.28 340))",
    glowColor: "oklch(0.68 0.26 295 / 0.40)",
  },
  {
    id: 11,
    topic: "View Decay",
    topicEmoji: "📉",
    question: "What is the View Decay formula?",
    answer: "Views(t) = Peak Views × (Decay Rate ^ Days)",
    explanation:
      "Decay Rate is between 0 and 1. A rate of 0.8 means you retain 80% of views each day. Lower decay rate = faster drop-off. Evergreen content fights decay! 🌿",
    gradient:
      "linear-gradient(135deg, oklch(0.72 0.28 340), oklch(0.68 0.26 295))",
    glowColor: "oklch(0.72 0.28 340 / 0.40)",
  },
  {
    id: 12,
    topic: "View Decay",
    topicEmoji: "📉",
    question:
      "Reel A has decay rate 0.9, Reel B has 0.5. Both peak at 100K views. After 5 days, which has more views?",
    answer: "Reel A: ~59,049 views vs Reel B: 3,125 views",
    explanation:
      "A: 100K × 0.9^5 ≈ 59,049. B: 100K × 0.5^5 = 3,125. Higher decay rate = slower drop. Trending audio and hooks keep decay rate high! 🎵",
    gradient:
      "linear-gradient(135deg, oklch(0.68 0.26 295), oklch(0.72 0.28 340))",
    glowColor: "oklch(0.68 0.26 295 / 0.40)",
  },
  {
    id: 13,
    topic: "View Decay",
    topicEmoji: "📉",
    question: "What strategies help slow down view decay on Instagram Reels?",
    answer:
      "Trending audio, strong hooks, evergreen topics, and re-sharing to Stories.",
    explanation:
      "Content tied to trends decays faster. Evergreen content (tutorials, tips) maintains views longer. Re-sharing to Stories resets the decay clock! ⏰",
    gradient:
      "linear-gradient(135deg, oklch(0.72 0.28 340), oklch(0.68 0.26 295))",
    glowColor: "oklch(0.72 0.28 340 / 0.40)",
  },
  {
    id: 14,
    topic: "Engagement Rate",
    topicEmoji: "📊",
    question:
      "Two creators: Creator A has 10K followers with 8% ER. Creator B has 1M followers with 0.8% ER. Who's more valuable to brands?",
    answer: "Creator A — micro-influencers often win! 💪",
    explanation:
      "Creator A: 800 engaged people per post. Creator B: 8,000 engaged people. But ER signals authenticity. Brands increasingly prefer high-ER micro-influencers for better ROI! 💰",
    gradient:
      "linear-gradient(135deg, oklch(0.68 0.26 295), oklch(0.72 0.28 340))",
    glowColor: "oklch(0.68 0.26 295 / 0.40)",
  },
  {
    id: 15,
    topic: "Viral Growth",
    topicEmoji: "🚀",
    question:
      "What does it mean when shares per person = 1 in the viral growth model?",
    answer: "Linear growth — no viral effect! 😴",
    explanation:
      "When shares = 1, Reach = Initial × 1^n = Initial. No growth at all! You need shares > 1 for exponential viral spread. Aim for at least 2+ shares per viewer! 🎯",
    gradient:
      "linear-gradient(135deg, oklch(0.82 0.20 195), oklch(0.78 0.22 145))",
    glowColor: "oklch(0.82 0.20 195 / 0.40)",
  },
];

const topicColors: Record<string, { badge: string; border: string }> = {
  "Engagement Rate": {
    badge: "oklch(0.72 0.28 340 / 0.20)",
    border: "oklch(0.72 0.28 340 / 0.50)",
  },
  "Viral Growth": {
    badge: "oklch(0.82 0.20 195 / 0.20)",
    border: "oklch(0.82 0.20 195 / 0.50)",
  },
  "View Decay": {
    badge: "oklch(0.68 0.26 295 / 0.20)",
    border: "oklch(0.68 0.26 295 / 0.50)",
  },
};

const topicTextColors: Record<string, string> = {
  "Engagement Rate": "oklch(0.88 0.18 340)",
  "Viral Growth": "oklch(0.88 0.16 195)",
  "View Decay": "oklch(0.82 0.20 295)",
};

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type AnswerState = "unanswered" | "correct" | "wrong" | "timeout";

export function FlashcardGame() {
  const [deck, setDeck] = useState<Flashcard[]>(flashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [answerState, setAnswerState] = useState<AnswerState>("unanswered");
  const [timerKey, setTimerKey] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [startTime] = useState(() => new Date());
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  const currentCard = deck[currentIndex];
  const total = deck.length;
  const progress = (currentIndex / total) * 100;
  const topicColor = topicColors[currentCard.topic];
  const topicTextColor = topicTextColors[currentCard.topic];

  function handleFlip() {
    if (answerState === "unanswered") {
      setIsFlipped((prev) => !prev);
    }
  }

  function handleTimeout() {
    if (answerState !== "unanswered") return;
    setAnswerState("timeout");
    setIsTimerRunning(false);
    playBuzz();
    // Auto-advance after 1.5s
    setTimeout(() => advanceCard(), 1500);
  }

  function handleGotIt() {
    if (answerState !== "unanswered") return;
    const pts = hintUsed ? 5 : 10;
    setScore((prev) => prev + pts);
    setAnswerState("correct");
    setIsTimerRunning(false);
    playDing();
    triggerConfetti(cardRef.current ?? undefined);
    setTimeout(() => advanceCard(), 1500);
  }

  function handleMissedIt() {
    if (answerState !== "unanswered") return;
    setAnswerState("wrong");
    setIsTimerRunning(false);
    playBuzz();
    setTimeout(() => advanceCard(), 1500);
  }

  function advanceCard() {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= total) {
      setGameComplete(true);
    } else {
      setCurrentIndex(nextIndex);
      setIsFlipped(false);
      setAnswerState("unanswered");
      setHintUsed(false);
      setShowHint(false);
      setTimerKey((prev) => prev + 1);
      setIsTimerRunning(true);
    }
  }

  function handleShuffle() {
    setDeck(shuffleArray(flashcards));
    resetGame();
  }

  function handleRestart() {
    setDeck(flashcards);
    resetGame();
  }

  function resetGame() {
    setCurrentIndex(0);
    setIsFlipped(false);
    setScore(0);
    setHintUsed(false);
    setShowHint(false);
    setAnswerState("unanswered");
    setTimerKey((prev) => prev + 1);
    setGameComplete(false);
    setIsTimerRunning(true);
  }

  function handleUseHint() {
    setHintUsed(true);
    setShowHint(true);
  }

  if (gameComplete) {
    const timeTaken = Math.round(
      (new Date().getTime() - startTime.getTime()) / 1000,
    );
    return (
      <ResultScreen
        score={Math.round(score / 10)} // convert points back to correct count equiv
        total={total}
        timeTakenSeconds={timeTaken}
        gameType="flashcards"
        onPlayAgain={handleRestart}
      />
    );
  }

  return (
    <div
      data-ocid="flashcard.panel"
      className="flex flex-col gap-6"
      ref={cardRef}
    >
      {/* Header */}
      <div className="glass-card rounded-3xl p-5 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.72 0.28 340), oklch(0.68 0.26 295), oklch(0.82 0.20 195))",
          }}
        />
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-display text-xl font-extrabold gradient-text-purple-pink">
              Likes to Logic Quiz 🎮
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Score:{" "}
              <span className="font-bold gradient-text-cyan-green">
                {score} pts
              </span>{" "}
              • Card {currentIndex + 1} / {total}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              data-ocid="flashcard.shuffle_button"
              onClick={handleShuffle}
              className="flex items-center gap-1.5 rounded-2xl px-3 py-2 text-xs font-bold transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: "oklch(0.82 0.20 195 / 0.15)",
                border: "1px solid oklch(0.82 0.20 195 / 0.35)",
                color: "oklch(0.88 0.16 195)",
              }}
              title="Shuffle deck"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Shuffle</span>
            </button>
            <button
              type="button"
              data-ocid="flashcard.restart_button"
              onClick={handleRestart}
              className="flex items-center gap-1.5 rounded-2xl px-3 py-2 text-xs font-bold transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: "oklch(0.72 0.28 340 / 0.15)",
                border: "1px solid oklch(0.72 0.28 340 / 0.35)",
                color: "oklch(0.88 0.18 340)",
              }}
              title="Restart deck"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart</span>
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="flex-1 h-2 rounded-full overflow-hidden"
            style={{ background: "oklch(0.20 0.025 280)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background:
                  "linear-gradient(90deg, oklch(0.72 0.28 340), oklch(0.68 0.26 295), oklch(0.82 0.20 195))",
              }}
            />
          </div>
          <span
            className="text-xs font-bold font-display whitespace-nowrap"
            style={{ color: "oklch(0.68 0.26 295)" }}
          >
            {currentIndex + 1} / {total}
          </span>
        </div>

        {/* Countdown Timer */}
        <CountdownTimer
          seconds={15}
          onTimeout={handleTimeout}
          isRunning={isTimerRunning && answerState === "unanswered"}
          timerKey={timerKey}
        />
      </div>

      {/* Topic filter pills */}
      <div className="flex gap-2 flex-wrap">
        {(["Engagement Rate", "Viral Growth", "View Decay"] as const).map(
          (topic) => {
            const count = flashcards.filter((c) => c.topic === topic).length;
            const tc = topicColors[topic];
            return (
              <div
                key={topic}
                className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
                style={{
                  background: tc.badge,
                  border: `1px solid ${tc.border}`,
                  color: topicTextColors[topic],
                }}
              >
                <span>
                  {topic === "Engagement Rate"
                    ? "📊"
                    : topic === "Viral Growth"
                      ? "🚀"
                      : "📉"}
                </span>
                <span>{topic}</span>
                <span className="opacity-60">({count})</span>
              </div>
            );
          },
        )}
      </div>

      {/* Flashcard */}
      <button
        type="button"
        className="relative select-none w-full text-left"
        style={{
          perspective: "1200px",
          minHeight: "320px",
          background: "transparent",
          border: "none",
          padding: 0,
          cursor: "pointer",
        }}
        aria-label={
          isFlipped
            ? "Card showing answer, tap to flip back"
            : "Card showing question, tap to flip"
        }
        tabIndex={answerState === "unanswered" ? 0 : -1}
        onClick={handleFlip}
        data-ocid="flashcard.flip_button"
      >
        <div
          className="relative w-full transition-transform duration-500"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            minHeight: "320px",
            cursor: answerState === "unanswered" ? "pointer" : "default",
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 rounded-3xl p-6 flex flex-col justify-between overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              background: "oklch(0.14 0.020 280 / 0.90)",
              border: "1px solid oklch(0.68 0.26 295 / 0.25)",
              boxShadow: `0 0 40px ${currentCard.glowColor}, 0 8px 32px oklch(0 0 0 / 0.40)`,
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
              style={{ background: currentCard.gradient }}
            />
            <div
              className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-15 blur-3xl pointer-events-none"
              style={{ background: currentCard.gradient }}
            />

            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex items-center justify-between">
                <div
                  className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
                  style={{
                    background: topicColor.badge,
                    border: `1px solid ${topicColor.border}`,
                    color: topicTextColor,
                  }}
                >
                  <span>{currentCard.topicEmoji}</span>
                  <span>{currentCard.topic}</span>
                </div>
                {answerState === "unanswered" && (
                  <span className="text-xs text-muted-foreground font-medium">
                    Tap to flip ✨
                  </span>
                )}
                {answerState === "timeout" && (
                  <span
                    className="text-xs font-bold"
                    style={{ color: "oklch(0.80 0.24 25)" }}
                  >
                    ⏰ Time's up!
                  </span>
                )}
              </div>

              <div className="flex-1 flex flex-col items-start gap-3">
                <p className="font-display text-lg font-bold text-foreground leading-snug">
                  {currentCard.question}
                </p>
                {/* Hint text */}
                {showHint && (
                  <div
                    className="w-full rounded-2xl px-3 py-2 text-xs"
                    style={{
                      background: "oklch(0.88 0.20 100 / 0.10)",
                      border: "1px solid oklch(0.88 0.20 100 / 0.25)",
                      color: "oklch(0.88 0.20 100)",
                    }}
                  >
                    <span className="font-bold">💡 Hint: </span>
                    {currentCard.explanation.split(".")[0]}.
                  </div>
                )}
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between mt-4">
              {/* Hint button */}
              {answerState === "unanswered" && !hintUsed && (
                <button
                  type="button"
                  data-ocid="flashcard.hint_button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUseHint();
                  }}
                  className="flex items-center gap-1.5 rounded-2xl px-3 py-2 text-xs font-bold transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{
                    background: "oklch(0.88 0.20 100 / 0.10)",
                    border: "1px solid oklch(0.88 0.20 100 / 0.30)",
                    color: "oklch(0.88 0.20 100)",
                  }}
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Hint 💡</span>
                </button>
              )}
              {(answerState !== "unanswered" || hintUsed) && (
                <div className="flex-1" />
              )}
              <div
                className="rounded-2xl px-4 py-2 text-xs font-bold uppercase tracking-widest"
                style={{
                  background: "oklch(0.10 0.015 280 / 0.80)",
                  border: "1px solid oklch(0.40 0.04 280 / 0.40)",
                  color: "oklch(0.58 0.018 280)",
                }}
              >
                🤔 What's the answer?
              </div>
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 rounded-3xl p-6 flex flex-col justify-between overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: "oklch(0.14 0.020 280 / 0.90)",
              border: "1px solid oklch(0.68 0.26 295 / 0.25)",
              boxShadow: `0 0 40px ${currentCard.glowColor}, 0 8px 32px oklch(0 0 0 / 0.40)`,
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
              style={{ background: currentCard.gradient }}
            />
            <div
              className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full opacity-15 blur-3xl pointer-events-none"
              style={{ background: currentCard.gradient }}
            />

            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex items-center justify-between">
                <div
                  className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
                  style={{
                    background: topicColor.badge,
                    border: `1px solid ${topicColor.border}`,
                    color: topicTextColor,
                  }}
                >
                  <span>{currentCard.topicEmoji}</span>
                  <span>{currentCard.topic}</span>
                </div>
                <span
                  className="text-xs font-bold"
                  style={{ color: "oklch(0.78 0.22 145)" }}
                >
                  ✅ Answer
                </span>
              </div>

              <div
                className="rounded-2xl px-4 py-3"
                style={{
                  background: `${currentCard.glowColor.replace("0.40", "0.12")}`,
                  border: `1px solid ${topicColor.border}`,
                }}
              >
                <p
                  className="font-display text-xl font-extrabold"
                  style={{ color: topicTextColor }}
                >
                  {currentCard.answer}
                </p>
              </div>

              <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                {currentCard.explanation}
              </p>
            </div>

            {/* Got It / Missed It buttons */}
            <div className="relative z-10 mt-2">
              {answerState === "unanswered" ? (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    data-ocid="flashcard.correct_button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGotIt();
                    }}
                    className="py-3 rounded-2xl font-display font-bold text-sm text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.78 0.22 145), oklch(0.72 0.26 160))",
                      boxShadow: "0 4px 16px oklch(0.78 0.22 145 / 0.40)",
                    }}
                  >
                    ✅ Got It! (+{hintUsed ? 5 : 10}pts)
                  </button>
                  <button
                    type="button"
                    data-ocid="flashcard.wrong_button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMissedIt();
                    }}
                    className="py-3 rounded-2xl font-display font-bold text-sm text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.65 0.28 25), oklch(0.60 0.25 15))",
                      boxShadow: "0 4px 16px oklch(0.65 0.28 25 / 0.40)",
                    }}
                  >
                    ❌ Missed It
                  </button>
                </div>
              ) : (
                <div
                  className="rounded-2xl px-4 py-2.5 text-center text-sm font-bold"
                  style={{
                    background:
                      answerState === "correct"
                        ? "oklch(0.78 0.22 145 / 0.15)"
                        : answerState === "timeout"
                          ? "oklch(0.65 0.28 25 / 0.15)"
                          : "oklch(0.65 0.28 25 / 0.15)",
                    color:
                      answerState === "correct"
                        ? "oklch(0.88 0.20 145)"
                        : "oklch(0.80 0.24 25)",
                  }}
                >
                  {answerState === "correct"
                    ? "🎉 Next card loading..."
                    : answerState === "timeout"
                      ? "⏰ Moving on..."
                      : "📖 Next card loading..."}
                </div>
              )}
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
