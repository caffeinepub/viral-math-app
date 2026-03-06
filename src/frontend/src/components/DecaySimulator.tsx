import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  BarChart2,
  Calendar,
  Loader2,
  Percent,
} from "lucide-react";
import { useState } from "react";
import { DecayCurveChart } from "./DecayCurveChart";
import { ResultCard } from "./ResultCard";

interface Fields {
  peakViews: string;
  decayRate: string;
  days: string;
}

interface ResultData {
  value: string;
  peakViews: number;
  decayRate: number;
  days: number;
  key: number;
}

export function DecaySimulator() {
  const [fields, setFields] = useState<Fields>({
    peakViews: "",
    decayRate: "",
    days: "",
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

  const simulate = () => {
    setBouncing(true);
    setTimeout(() => setBouncing(false), 400);

    const peakViews = Number.parseFloat(fields.peakViews);
    const decayRate = Number.parseFloat(fields.decayRate);
    const days = Number.parseFloat(fields.days);

    if (
      fields.peakViews.trim() === "" ||
      fields.decayRate.trim() === "" ||
      fields.days.trim() === ""
    ) {
      setError("Fill in all fields first bestie 👀");
      setResult(null);
      return;
    }

    if (
      Number.isNaN(peakViews) ||
      Number.isNaN(decayRate) ||
      Number.isNaN(days)
    ) {
      setError("Those need to be valid numbers fr fr.");
      setResult(null);
      return;
    }

    if (peakViews <= 0) {
      setError("Peak views gotta be more than zero.");
      setResult(null);
      return;
    }

    if (decayRate <= 0 || decayRate >= 1) {
      setError("Decay rate must be between 0 and 1, e.g. 0.85.");
      setResult(null);
      return;
    }

    if (days < 0) {
      setError("Days can't be negative bestie.");
      setResult(null);
      return;
    }

    setLoading(true);
    setResult(null);
    setError(null);

    setTimeout(() => {
      const remaining = peakViews * decayRate ** days;
      setResult({
        value: Math.round(remaining).toLocaleString(),
        peakViews,
        decayRate,
        days,
        key: Date.now(),
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-5">
      <h3
        className="font-display text-3xl font-extrabold text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.68 0.26 295), oklch(0.72 0.30 340))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        View Decay Simulator
      </h3>

      <div className="grid grid-cols-1 gap-3">
        <div className="space-y-1.5">
          <Label
            htmlFor="peakViews"
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
            style={{ color: "oklch(0.68 0.26 295)" }}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            Peak Views
          </Label>
          <Input
            id="peakViews"
            type="number"
            min="0"
            placeholder="e.g. 500000"
            value={fields.peakViews}
            onChange={handleChange("peakViews")}
            className="neon-input h-11 text-base rounded-2xl font-medium"
            style={{
              background: "oklch(0.08 0.018 285 / 0.80)",
              border: "1px solid oklch(0.35 0.04 285 / 0.50)",
              color: "oklch(0.97 0.008 280)",
            }}
          />
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="decayRate"
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
            style={{ color: "oklch(0.68 0.26 295)" }}
          >
            <Percent className="w-3.5 h-3.5" />
            Decay Rate
            <span className="text-xs font-normal normal-case tracking-normal text-muted-foreground ml-1">
              (0–1)
            </span>
          </Label>
          <Input
            id="decayRate"
            type="number"
            min="0"
            max="1"
            step="0.01"
            placeholder="e.g. 0.85"
            value={fields.decayRate}
            onChange={handleChange("decayRate")}
            className="neon-input h-11 text-base rounded-2xl font-medium"
            style={{
              background: "oklch(0.08 0.018 285 / 0.80)",
              border: "1px solid oklch(0.35 0.04 285 / 0.50)",
              color: "oklch(0.97 0.008 280)",
            }}
          />
          <p className="text-xs text-muted-foreground pl-1 font-medium">
            0.85 = 85% of views stay each day
          </p>
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="days"
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
            style={{ color: "oklch(0.68 0.26 295)" }}
          >
            <Calendar className="w-3.5 h-3.5" />
            Days
          </Label>
          <Input
            id="days"
            type="number"
            min="0"
            placeholder="e.g. 7"
            value={fields.days}
            onChange={handleChange("days")}
            className="neon-input h-11 text-base rounded-2xl font-medium"
            style={{
              background: "oklch(0.08 0.018 285 / 0.80)",
              border: "1px solid oklch(0.35 0.04 285 / 0.50)",
              color: "oklch(0.97 0.008 280)",
            }}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={simulate}
        disabled={loading}
        className={`
          w-full h-14 rounded-full font-display text-base font-extrabold uppercase tracking-wider
          text-white transition-all duration-200 active:scale-95 hover-glow-purple
          flex items-center justify-center gap-2
          ${bouncing ? "animate-bounce-scale" : ""}
          ${loading ? "opacity-80 cursor-not-allowed" : ""}
        `}
        style={{
          background:
            "linear-gradient(135deg, oklch(0.68 0.26 295), oklch(0.72 0.30 340))",
          boxShadow:
            "0 4px 24px oklch(0.68 0.26 295 / 0.45), 0 1px 0 oklch(1 0 0 / 0.15) inset",
        }}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Simulating...</span>
          </>
        ) : (
          "📉 Simulate Decay"
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
            label="Remaining Views"
            value={result.value}
            emoji="⏳"
            variant="purple-pink"
          />
          <p className="text-center text-xs text-muted-foreground font-medium">
            Peak × (Decay Rate ^ Days)
          </p>
          <DecayCurveChart
            peakViews={result.peakViews}
            decayRate={result.decayRate}
            days={result.days}
          />
        </div>
      )}
    </div>
  );
}
