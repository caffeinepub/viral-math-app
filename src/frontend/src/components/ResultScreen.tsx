import { Check, Copy, RotateCcw, Share2, Trophy } from "lucide-react";
import { useState } from "react";
import { getLeaderboard, isHighScore, saveScore } from "../utils/leaderboard";
import type { LeaderboardEntry } from "../utils/leaderboard";

interface ResultScreenProps {
  score: number;
  total: number;
  timeTakenSeconds: number;
  gameType: string;
  onPlayAgain: () => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

function getRank(pct: number): {
  title: string;
  emoji: string;
  gradient: string;
  glow: string;
} {
  if (pct >= 80) {
    return {
      title: "Math Genius",
      emoji: "🧠",
      gradient:
        "linear-gradient(135deg, oklch(0.68 0.26 295), oklch(0.72 0.30 340))",
      glow: "oklch(0.72 0.30 340 / 0.50)",
    };
  }
  if (pct >= 60) {
    return {
      title: "Math Master",
      emoji: "🔥",
      gradient:
        "linear-gradient(135deg, oklch(0.72 0.28 340), oklch(0.80 0.24 55))",
      glow: "oklch(0.72 0.28 340 / 0.50)",
    };
  }
  if (pct >= 40) {
    return {
      title: "Getting There",
      emoji: "💪",
      gradient:
        "linear-gradient(135deg, oklch(0.82 0.20 195), oklch(0.72 0.22 220))",
      glow: "oklch(0.82 0.20 195 / 0.50)",
    };
  }
  return {
    title: "Keep Studying",
    emoji: "📚",
    gradient:
      "linear-gradient(135deg, oklch(0.55 0.12 285), oklch(0.50 0.10 260))",
    glow: "oklch(0.55 0.12 285 / 0.40)",
  };
}

export function ResultScreen({
  score,
  total,
  timeTakenSeconds,
  gameType,
  onPlayAgain,
}: ResultScreenProps) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const points = score * 10;
  const rank = getRank(pct);

  const qualifies = isHighScore(points, gameType);
  const [name, setName] = useState("You");
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() =>
    getLeaderboard(gameType),
  );

  function handleSaveScore() {
    const entry: LeaderboardEntry = {
      name: name.trim() || "You",
      score: points,
      total,
      gameType,
      date: new Date().toISOString(),
    };
    saveScore(entry);
    setSaved(true);
    setLeaderboard(getLeaderboard(gameType));
  }

  function handleWhatsAppShare() {
    const text = encodeURIComponent(
      `I scored ${points} points on Likes to Logic! Can you beat me? 🔥 Try it now at ${window.location.href}`,
    );
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  }

  function handleCopyForInstagram() {
    const text = `I scored ${points} points on Likes to Logic! 🔥\n${rank.emoji} Rank: ${rank.title}\n✅ ${score}/${total} correct in ${formatTime(timeTakenSeconds)}\n\nCan you beat me? → ${window.location.href}`;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      })
      .catch(() => {
        // Fallback: do nothing
      });
  }

  const topLeaderboard = leaderboard.slice(0, 5);

  return (
    <div
      data-ocid="result.panel"
      className="flex flex-col gap-4 animate-scale-in"
    >
      {/* Rank Card */}
      <div
        className="rounded-3xl p-6 text-center relative overflow-hidden"
        style={{
          background: "oklch(0.13 0.022 285 / 0.90)",
          border: `1px solid ${rank.glow}`,
          boxShadow: `0 0 40px ${rank.glow}, 0 8px 32px oklch(0 0 0 / 0.40)`,
        }}
      >
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ background: rank.gradient }}
        />
        {/* Top accent */}
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
          style={{ background: rank.gradient }}
        />

        <div className="relative z-10">
          <div className="text-6xl mb-2 animate-bounce-scale">{rank.emoji}</div>
          <h2
            className="font-display text-2xl font-extrabold mb-1"
            style={{
              background: rank.gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {rank.title}
          </h2>
          <p className="text-sm text-muted-foreground">{pct}% accuracy</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        {/* Score */}
        <div
          className="glass-card rounded-2xl p-4 text-center"
          style={{ border: "1px solid oklch(0.72 0.30 340 / 0.25)" }}
        >
          <div className="text-2xl font-display font-extrabold gradient-text-purple-pink">
            {score}/{total}
          </div>
          <div className="text-xs text-muted-foreground mt-1">correct</div>
        </div>

        {/* Points */}
        <div
          className="glass-card rounded-2xl p-4 text-center"
          style={{ border: "1px solid oklch(0.82 0.20 195 / 0.25)" }}
        >
          <div className="text-2xl font-display font-extrabold gradient-text-cyan-green">
            {points}
          </div>
          <div className="text-xs text-muted-foreground mt-1">points</div>
        </div>

        {/* Time */}
        <div
          className="glass-card rounded-2xl p-4 text-center"
          style={{ border: "1px solid oklch(0.68 0.26 295 / 0.25)" }}
        >
          <div className="text-2xl font-display font-extrabold gradient-text-blue-purple">
            {formatTime(timeTakenSeconds)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">time</div>
        </div>
      </div>

      {/* Save Score / Leaderboard */}
      <div
        className="glass-card rounded-3xl p-5 relative overflow-hidden"
        style={{ border: "1px solid oklch(0.68 0.26 295 / 0.20)" }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Trophy
            className="w-4 h-4"
            style={{ color: "oklch(0.88 0.20 100)" }}
          />
          <h3 className="font-display font-bold text-sm gradient-text-pink-yellow">
            Leaderboard
          </h3>
        </div>

        {/* Save score input (if qualifies and not saved) */}
        {qualifies && !saved && (
          <div
            className="mb-4 p-3 rounded-2xl"
            style={{
              background: "oklch(0.72 0.30 340 / 0.10)",
              border: "1px solid oklch(0.72 0.30 340 / 0.25)",
            }}
          >
            <p
              className="text-xs font-bold mb-2"
              style={{ color: "oklch(0.88 0.18 340)" }}
            >
              🎉 New High Score! Enter your name:
            </p>
            <div className="flex gap-2">
              <input
                data-ocid="result.input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={20}
                placeholder="Your name"
                className="flex-1 rounded-xl px-3 py-2 text-sm font-display font-bold bg-transparent text-foreground outline-none neon-input-pink"
                style={{
                  background: "oklch(0.10 0.018 285 / 0.80)",
                  border: "1px solid oklch(0.72 0.30 340 / 0.40)",
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveScore();
                }}
              />
              <button
                type="button"
                data-ocid="result.save_score_button"
                onClick={handleSaveScore}
                className="px-4 py-2 rounded-xl text-sm font-display font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.30 340), oklch(0.68 0.26 295))",
                  boxShadow: "0 4px 12px oklch(0.72 0.30 340 / 0.40)",
                }}
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* Leaderboard entries */}
        {topLeaderboard.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-2">
            No scores yet. Be the first! 🏆
          </p>
        ) : (
          <div className="space-y-2">
            {topLeaderboard.map((entry, i) => (
              <div
                key={`${entry.name}-${entry.score}-${i}`}
                className="flex items-center gap-3 rounded-xl px-3 py-2"
                style={{
                  background:
                    i === 0
                      ? "oklch(0.88 0.20 100 / 0.08)"
                      : "oklch(0.18 0.025 285 / 0.50)",
                  border:
                    i === 0
                      ? "1px solid oklch(0.88 0.20 100 / 0.25)"
                      : "1px solid oklch(0.30 0.030 285 / 0.15)",
                }}
              >
                <span
                  className="font-display font-extrabold text-sm w-6 text-center flex-shrink-0"
                  style={{
                    color:
                      i === 0
                        ? "oklch(0.88 0.20 100)"
                        : i === 1
                          ? "oklch(0.75 0.08 280)"
                          : i === 2
                            ? "oklch(0.65 0.12 55)"
                            : "oklch(0.55 0.020 285)",
                  }}
                >
                  {i === 0
                    ? "🥇"
                    : i === 1
                      ? "🥈"
                      : i === 2
                        ? "🥉"
                        : `${i + 1}.`}
                </span>
                <span className="flex-1 text-sm font-display font-bold text-foreground truncate">
                  {entry.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {entry.score}/{entry.total * 10} pts
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Share Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          data-ocid="result.share_button"
          onClick={handleWhatsAppShare}
          className="flex items-center justify-center gap-2 py-3 rounded-2xl font-display font-bold text-sm text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.55 0.18 150), oklch(0.45 0.15 145))",
            boxShadow: "0 4px 16px oklch(0.55 0.18 150 / 0.40)",
          }}
        >
          <Share2 className="w-4 h-4" />
          WhatsApp
        </button>

        <button
          type="button"
          onClick={handleCopyForInstagram}
          className="flex items-center justify-center gap-2 py-3 rounded-2xl font-display font-bold text-sm text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: copied
              ? "linear-gradient(135deg, oklch(0.78 0.22 145), oklch(0.72 0.26 160))"
              : "linear-gradient(135deg, oklch(0.72 0.30 340), oklch(0.68 0.26 295))",
            boxShadow: copied
              ? "0 4px 16px oklch(0.78 0.22 145 / 0.40)"
              : "0 4px 16px oklch(0.72 0.30 340 / 0.40)",
          }}
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          {copied ? "Copied!" : "Instagram"}
        </button>
      </div>

      {/* Challenge Friends */}
      <button
        type="button"
        data-ocid="result.play_again_button"
        onClick={onPlayAgain}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-display font-bold text-base text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.82 0.20 195), oklch(0.68 0.26 295), oklch(0.72 0.30 340))",
          boxShadow: "0 4px 20px oklch(0.82 0.20 195 / 0.35)",
        }}
      >
        <RotateCcw className="w-4 h-4" />
        Play Again 🎮
      </button>
    </div>
  );
}
