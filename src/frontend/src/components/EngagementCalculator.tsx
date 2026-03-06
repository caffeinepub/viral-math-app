import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  Eye,
  Heart,
  Loader2,
  MessageCircle,
  Share2,
} from "lucide-react";
import { useState } from "react";
import { EngagementBarChart } from "./EngagementBarChart";
import { ResultCard } from "./ResultCard";
import { ViralMeter } from "./ViralMeter";

// ---------------------------------------------------------------------------
// Gen Z Viral Score Badge
// ---------------------------------------------------------------------------

function getViralScore(rate: number): {
  label: string;
  emoji: string;
  gradient: string;
  glow: string;
  border: string;
  bg: string;
  tagline: string;
} {
  if (rate >= 7) {
    return {
      label: "absolutely slay",
      emoji: "🔥",
      gradient:
        "linear-gradient(135deg, oklch(0.72 0.30 340), oklch(0.68 0.26 295))",
      glow: "oklch(0.72 0.30 340 / 0.55)",
      border: "oklch(0.72 0.30 340 / 0.50)",
      bg: "oklch(0.72 0.30 340 / 0.12)",
      tagline: "ur reel is eating and leaving no crumbs bestie 🍽️",
    };
  }
  if (rate >= 3) {
    return {
      label: "it's giving 🌟",
      emoji: "✨",
      gradient:
        "linear-gradient(135deg, oklch(0.88 0.22 120), oklch(0.82 0.24 85))",
      glow: "oklch(0.88 0.22 120 / 0.45)",
      border: "oklch(0.88 0.22 120 / 0.45)",
      bg: "oklch(0.88 0.22 120 / 0.10)",
      tagline: "solid numbers fr fr, keep pushing bestie 💪",
    };
  }
  return {
    label: "mid 😬",
    emoji: "💀",
    gradient:
      "linear-gradient(135deg, oklch(0.65 0.16 50), oklch(0.60 0.14 40))",
    glow: "oklch(0.65 0.16 50 / 0.40)",
    border: "oklch(0.65 0.16 50 / 0.40)",
    bg: "oklch(0.65 0.16 50 / 0.10)",
    tagline: "not it rn, time to level up the strategy no cap",
  };
}

function ViralScoreBadge({ rate }: { rate: number }) {
  const vs = getViralScore(rate);

  return (
    <div
      data-ocid="engagement.viral_score.card"
      className="rounded-2xl p-4 relative overflow-hidden flex flex-col items-center gap-2"
      style={{
        background: vs.bg,
        border: `1px solid ${vs.border}`,
        boxShadow: `0 0 28px ${vs.glow}, 0 4px 12px oklch(0 0 0 / 0.25)`,
      }}
    >
      {/* Soft glow blob */}
      <div
        className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-20 rounded-full blur-3xl pointer-events-none"
        style={{ background: vs.glow }}
      />

      <p className="relative z-10 text-xs font-bold uppercase tracking-widest text-muted-foreground">
        ✦ Viral Score ✦
      </p>

      {/* Main badge pill */}
      <div
        className="relative z-10 inline-flex items-center gap-2 rounded-full px-5 py-2"
        style={{
          background: vs.gradient,
          boxShadow: `0 4px 20px ${vs.glow}`,
        }}
      >
        <span className="text-xl">{vs.emoji}</span>
        <span className="font-display text-xl font-extrabold text-white tracking-wide">
          {vs.label}
        </span>
      </div>

      <p className="relative z-10 text-xs text-muted-foreground text-center italic mt-0.5">
        {vs.tagline}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------

interface Fields {
  views: string;
  likes: string;
  comments: string;
  shares: string;
}

interface ResultData {
  rate: number;
  likes: number;
  comments: number;
  shares: number;
  key: number;
}

export function EngagementCalculator() {
  const [fields, setFields] = useState<Fields>({
    views: "",
    likes: "",
    comments: "",
    shares: "",
  });
  const [result, setResult] = useState<ResultData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [bouncing, setBouncing] = useState(false);

  const handleChange =
    (field: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFields((prev) => ({ ...prev, [field]: e.target.value }));
      setResult(null);
      setError(null);
    };

  const calculate = () => {
    setBouncing(true);
    setTimeout(() => setBouncing(false), 400);

    const views = Number.parseFloat(fields.views);
    const likes = Number.parseFloat(fields.likes);
    const comments = Number.parseFloat(fields.comments);
    const shares = Number.parseFloat(fields.shares);

    if (
      fields.views.trim() === "" ||
      fields.likes.trim() === "" ||
      fields.comments.trim() === "" ||
      fields.shares.trim() === ""
    ) {
      setError("Fill in all fields first bestie 👀");
      setResult(null);
      return;
    }

    if (
      Number.isNaN(views) ||
      Number.isNaN(likes) ||
      Number.isNaN(comments) ||
      Number.isNaN(shares)
    ) {
      setError("Those need to be valid numbers fr fr.");
      setResult(null);
      return;
    }

    if (views <= 0) {
      setError("Views gotta be more than zero, no cap.");
      setResult(null);
      return;
    }

    setLoading(true);
    setResult(null);
    setError(null);

    setTimeout(() => {
      const rate = ((likes + comments + shares) / views) * 100;
      setResult({ rate, likes, comments, shares, key: Date.now() });
      setLoading(false);
    }, 1000);
  };

  const inputFields = [
    {
      key: "views" as keyof Fields,
      label: "Views",
      icon: Eye,
      emoji: "👁",
      placeholder: "e.g. 100000",
    },
    {
      key: "likes" as keyof Fields,
      label: "Likes",
      icon: Heart,
      emoji: "❤️",
      placeholder: "e.g. 4500",
    },
    {
      key: "comments" as keyof Fields,
      label: "Comments",
      icon: MessageCircle,
      emoji: "💬",
      placeholder: "e.g. 320",
    },
    {
      key: "shares" as keyof Fields,
      label: "Shares",
      icon: Share2,
      emoji: "🔁",
      placeholder: "e.g. 180",
    },
  ];

  return (
    <div className="space-y-5">
      <h3
        className="font-display text-3xl font-extrabold text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.72 0.30 340), oklch(0.68 0.26 295))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Engagement Rate Calculator
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {inputFields.map(({ key, label, emoji, placeholder }) => (
          <div key={key} className="space-y-1.5">
            <Label
              htmlFor={key}
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
              style={{ color: "oklch(0.72 0.30 340)" }}
            >
              <span className="text-sm">{emoji}</span>
              {label}
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base pointer-events-none select-none z-10">
                {emoji}
              </span>
              <Input
                id={key}
                type="number"
                min="0"
                placeholder={placeholder}
                value={fields[key]}
                onChange={handleChange(key)}
                className="neon-input-pink h-11 text-base rounded-2xl font-medium pl-9"
                style={{
                  background: "oklch(0.08 0.018 285 / 0.80)",
                  border: "1px solid oklch(0.35 0.04 285 / 0.50)",
                  color: "oklch(0.97 0.008 280)",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={calculate}
        disabled={loading}
        className={`
          w-full h-14 rounded-full font-display text-base font-extrabold uppercase tracking-wider
          text-white transition-all duration-200 active:scale-95 hover-glow-pink
          flex items-center justify-center gap-2
          ${bouncing ? "animate-bounce-scale" : ""}
          ${loading ? "opacity-80 cursor-not-allowed" : ""}
        `}
        style={{
          background:
            "linear-gradient(135deg, oklch(0.72 0.30 340), oklch(0.68 0.26 295))",
          boxShadow:
            "0 4px 24px oklch(0.72 0.30 340 / 0.45), 0 1px 0 oklch(1 0 0 / 0.15) inset",
        }}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Calculating...</span>
          </>
        ) : (
          "✨ Calculate Engagement"
        )}
      </button>

      {error && (
        <Alert
          variant="destructive"
          className="rounded-2xl border-destructive/40 bg-destructive/10"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm font-medium">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {result !== null && (
        <div key={result.key} className="space-y-4 animate-scale-in">
          <ResultCard
            label="Engagement Rate"
            value={result.rate.toFixed(2)}
            unit="%"
            emoji="🔥"
            variant="pink-purple"
          />

          {/* Gen Z Viral Score Badge */}
          <ViralScoreBadge rate={result.rate} />

          <p className="text-center text-xs text-muted-foreground font-medium">
            (Likes + Comments + Shares) ÷ Views × 100
          </p>
          <ViralMeter engagementRate={result.rate} />
          <EngagementBarChart
            likes={result.likes}
            comments={result.comments}
            shares={result.shares}
          />
        </div>
      )}
    </div>
  );
}
