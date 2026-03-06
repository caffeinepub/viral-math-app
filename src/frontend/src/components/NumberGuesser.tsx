import { CheckCircle2, ChevronRight, XCircle } from "lucide-react";
import { useRef, useState } from "react";
import { ResultScreen } from "./ResultScreen";

interface Question {
  id: number;
  topic: "Engagement Rate" | "Viral Growth" | "View Decay";
  topicEmoji: string;
  question: string;
  answer: number;
  tolerance: number;
  unit: string;
  hint: string;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    topic: "Engagement Rate",
    topicEmoji: "📊",
    question:
      "A reel gets 5,000 views, 300 likes, 50 comments, and 50 shares. What is the engagement rate (%)?",
    answer: 8,
    tolerance: 0.5,
    unit: "%",
    hint: "ER = (Likes + Comments + Shares) / Views × 100",
    explanation: "(300 + 50 + 50) / 5,000 × 100 = 400 / 5,000 × 100 = 8%",
  },
  {
    id: 2,
    topic: "Engagement Rate",
    topicEmoji: "📊",
    question:
      "A reel has 20,000 views, 1,200 likes, 200 comments, and 600 shares. What is the engagement rate (%)?",
    answer: 10,
    tolerance: 0.5,
    unit: "%",
    hint: "ER = (Likes + Comments + Shares) / Views × 100",
    explanation:
      "(1,200 + 200 + 600) / 20,000 × 100 = 2,000 / 20,000 × 100 = 10%",
  },
  {
    id: 3,
    topic: "Engagement Rate",
    topicEmoji: "📊",
    question:
      "Your reel has 100,000 views and a 3.5% engagement rate. How many total interactions did it get?",
    answer: 3500,
    tolerance: 1,
    unit: "interactions",
    hint: "Interactions = ER% × Views / 100",
    explanation: "3.5 / 100 × 100,000 = 3,500 interactions",
  },
  {
    id: 4,
    topic: "Viral Growth",
    topicEmoji: "🚀",
    question:
      "A reel starts with 50 viewers. Each shares it to 2 others. After 3 rounds, what is the total reach?",
    answer: 400,
    tolerance: 1,
    unit: "people",
    hint: "Reach = Initial × (Shares ^ Rounds)",
    explanation: "50 × (2^3) = 50 × 8 = 400 people",
  },
  {
    id: 5,
    topic: "Viral Growth",
    topicEmoji: "🚀",
    question:
      "Starting with 200 viewers, each sharing to 3 others over 2 rounds. What is the total reach?",
    answer: 1800,
    tolerance: 1,
    unit: "people",
    hint: "Reach = Initial × (Shares ^ Rounds)",
    explanation: "200 × (3^2) = 200 × 9 = 1,800 people",
  },
  {
    id: 6,
    topic: "Viral Growth",
    topicEmoji: "🚀",
    question:
      "A reel starts with 1,000 viewers. Each shares to 4 others. After 1 round, what is the total reach?",
    answer: 4000,
    tolerance: 1,
    unit: "people",
    hint: "Reach = Initial × (Shares ^ Rounds)",
    explanation: "1,000 × (4^1) = 1,000 × 4 = 4,000 people",
  },
  {
    id: 7,
    topic: "View Decay",
    topicEmoji: "📉",
    question:
      "A reel peaks at 10,000 views/day with a 0.5 daily decay rate. How many views on day 2?",
    answer: 5000,
    tolerance: 1,
    unit: "views",
    hint: "Views = Peak × (Decay Rate ^ Days)",
    explanation: "10,000 × (0.5^1) = 10,000 × 0.5 = 5,000 views",
  },
  {
    id: 8,
    topic: "View Decay",
    topicEmoji: "📉",
    question:
      "A reel peaks at 80,000 views with a 0.8 decay rate. How many views remain after 2 days?",
    answer: 51200,
    tolerance: 100,
    unit: "views",
    hint: "Views = Peak × (Decay Rate ^ Days)",
    explanation: "80,000 × (0.8^2) = 80,000 × 0.64 = 51,200 views",
  },
  {
    id: 9,
    topic: "View Decay",
    topicEmoji: "📉",
    question:
      "A reel peaks at 50,000 views with a 0.9 decay rate. How many views after 3 days? (round to nearest whole number)",
    answer: 36450,
    tolerance: 100,
    unit: "views",
    hint: "Views = Peak × (Decay Rate ^ Days)",
    explanation: "50,000 × (0.9^3) = 50,000 × 0.729 = 36,450 views",
  },
  {
    id: 10,
    topic: "Engagement Rate",
    topicEmoji: "📊",
    question:
      "Two reels: Reel A has 500 views and 50 interactions. Reel B has 10,000 views and 500 interactions. Which has a higher ER? Enter Reel A's ER (%).",
    answer: 10,
    tolerance: 0.5,
    unit: "%",
    hint: "ER = Interactions / Views × 100",
    explanation:
      "Reel A: 50/500×100 = 10%. Reel B: 500/10,000×100 = 5%. Reel A wins despite fewer views! 🔥",
  },
];

const topicGradients: Record<
  string,
  { gradient: string; glow: string; badge: string }
> = {
  "Engagement Rate": {
    gradient:
      "linear-gradient(135deg, oklch(0.72 0.28 340), oklch(0.68 0.26 295))",
    glow: "oklch(0.72 0.28 340 / 0.35)",
    badge: "oklch(0.72 0.28 340 / 0.20)",
  },
  "Viral Growth": {
    gradient:
      "linear-gradient(135deg, oklch(0.82 0.20 195), oklch(0.78 0.22 145))",
    glow: "oklch(0.82 0.20 195 / 0.35)",
    badge: "oklch(0.82 0.20 195 / 0.20)",
  },
  "View Decay": {
    gradient:
      "linear-gradient(135deg, oklch(0.68 0.26 295), oklch(0.72 0.28 340))",
    glow: "oklch(0.68 0.26 295 / 0.35)",
    badge: "oklch(0.68 0.26 295 / 0.20)",
  },
};

export function NumberGuesser() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean[]>(
    new Array(questions.length).fill(false),
  );
  const [showHint, setShowHint] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [timeTaken, setTimeTaken] = useState(0);
  const startTimeRef = useRef<number>(Date.now());

  const current = questions[currentIndex];
  const styles = topicGradients[current.topic];
  function handleSubmit() {
    if (feedback !== null || answered[currentIndex]) return;
    const num = Number.parseFloat(inputValue.replace(/,/g, ""));
    if (Number.isNaN(num)) return;
    const isCorrect = Math.abs(num - current.answer) <= current.tolerance;
    setFeedback(isCorrect ? "correct" : "wrong");
    if (isCorrect) {
      setScore((s) => s + 1);
    }
    const newAnswered = [...answered];
    newAnswered[currentIndex] = true;
    setAnswered(newAnswered);
  }

  function handleNext() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setInputValue("");
      setFeedback(null);
      setShowHint(false);
    } else {
      const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000);
      setTimeTaken(elapsed);
      setIsComplete(true);
    }
  }

  function handleRestart() {
    setCurrentIndex(0);
    setInputValue("");
    setFeedback(null);
    setScore(0);
    setAnswered(new Array(questions.length).fill(false));
    setShowHint(false);
    setIsComplete(false);
    setTimeTaken(0);
    startTimeRef.current = Date.now();
  }

  if (isComplete) {
    return (
      <ResultScreen
        score={score}
        total={questions.length}
        timeTakenSeconds={timeTaken}
        gameType="numberguesser"
        onPlayAgain={handleRestart}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Score + Progress */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Score
          </span>
          <span className="font-display font-extrabold text-sm gradient-text-purple-pink">
            {score} / {questions.length}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {questions.map((q, i) => (
            <div
              key={q.id}
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
          {currentIndex + 1} / {questions.length}
        </span>
      </div>

      {/* Question Card */}
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
          {current.question}
        </p>

        {/* Input */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              disabled={feedback !== null}
              placeholder={`Enter your answer in ${current.unit}...`}
              className="w-full rounded-2xl px-4 py-3 font-display font-bold text-sm bg-transparent text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-200 disabled:opacity-60"
              style={{
                border:
                  feedback === "correct"
                    ? "2px solid oklch(0.78 0.22 145)"
                    : feedback === "wrong"
                      ? "2px solid oklch(0.72 0.28 340)"
                      : "2px solid oklch(0.40 0.04 280 / 0.50)",
                background: "oklch(0.10 0.015 280 / 0.60)",
              }}
            />
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={feedback !== null || !inputValue.trim()}
            className="px-5 py-3 rounded-2xl font-display font-bold text-sm text-white transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100"
            style={{
              background: styles.gradient,
              boxShadow: `0 4px 16px ${styles.glow}`,
            }}
          >
            Submit
          </button>
        </div>

        {/* Hint toggle */}
        {!feedback && (
          <button
            type="button"
            onClick={() => setShowHint((h) => !h)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 underline underline-offset-2"
          >
            {showHint ? "Hide hint" : "💡 Show hint"}
          </button>
        )}
        {showHint && !feedback && (
          <div
            className="mt-2 rounded-2xl px-4 py-2.5 text-xs font-mono text-foreground/80"
            style={{
              background: "oklch(0.10 0.015 280 / 0.80)",
              border: "1px solid oklch(0.40 0.04 280 / 0.40)",
            }}
          >
            {current.hint}
          </div>
        )}

        {/* Feedback */}
        {feedback && (
          <div
            className="mt-4 rounded-2xl p-4 flex items-start gap-3"
            style={{
              background:
                feedback === "correct"
                  ? "oklch(0.78 0.22 145 / 0.12)"
                  : "oklch(0.72 0.28 340 / 0.12)",
              border: `1px solid ${feedback === "correct" ? "oklch(0.78 0.22 145 / 0.40)" : "oklch(0.72 0.28 340 / 0.40)"}`,
            }}
          >
            {feedback === "correct" ? (
              <CheckCircle2
                className="w-5 h-5 flex-shrink-0 mt-0.5"
                style={{ color: "oklch(0.78 0.22 145)" }}
              />
            ) : (
              <XCircle
                className="w-5 h-5 flex-shrink-0 mt-0.5"
                style={{ color: "oklch(0.72 0.28 340)" }}
              />
            )}
            <div>
              <p
                className="font-display font-bold text-sm mb-1"
                style={{
                  color:
                    feedback === "correct"
                      ? "oklch(0.78 0.22 145)"
                      : "oklch(0.72 0.28 340)",
                }}
              >
                {feedback === "correct"
                  ? "🔥 Correct!"
                  : `😬 Not quite — answer: ${current.answer.toLocaleString()} ${current.unit}`}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {current.explanation}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Next Button */}
      {feedback && (
        <button
          type="button"
          onClick={handleNext}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-display font-bold text-sm text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.68 0.26 295), oklch(0.82 0.20 195))",
            boxShadow: "0 4px 20px oklch(0.68 0.26 295 / 0.35)",
          }}
        >
          {currentIndex < questions.length - 1 ? (
            <>
              Next Question <ChevronRight className="w-4 h-4" />
            </>
          ) : (
            <>See Results 🎉</>
          )}
        </button>
      )}
    </div>
  );
}
