import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2, RefreshCw, Share2, Users } from "lucide-react";
import { useState } from "react";
import { GrowthCurveChart } from "./GrowthCurveChart";
import { ResultCard } from "./ResultCard";

interface Fields {
  initial: string;
  sharesPerPerson: string;
  rounds: string;
}

interface ResultData {
  value: string;
  initial: number;
  sharesPerPerson: number;
  rounds: number;
  key: number;
}

export function GrowthSimulator() {
  const [fields, setFields] = useState<Fields>({
    initial: "",
    sharesPerPerson: "",
    rounds: "",
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

    const initial = Number.parseFloat(fields.initial);
    const sharesPerPerson = Number.parseFloat(fields.sharesPerPerson);
    const rounds = Number.parseFloat(fields.rounds);

    if (
      fields.initial.trim() === "" ||
      fields.sharesPerPerson.trim() === "" ||
      fields.rounds.trim() === ""
    ) {
      setError("Fill in all fields first bestie 👀");
      setResult(null);
      return;
    }

    if (
      Number.isNaN(initial) ||
      Number.isNaN(sharesPerPerson) ||
      Number.isNaN(rounds)
    ) {
      setError("Those need to be valid numbers fr fr.");
      setResult(null);
      return;
    }

    if (initial <= 0) {
      setError("Initial viewers gotta be more than zero.");
      setResult(null);
      return;
    }

    if (sharesPerPerson < 0) {
      setError("Shares per person can't be negative.");
      setResult(null);
      return;
    }

    if (rounds < 0 || !Number.isInteger(rounds)) {
      setError("Rounds must be a whole number, no decimals.");
      setResult(null);
      return;
    }

    const totalReach = initial * sharesPerPerson ** rounds;

    if (!Number.isFinite(totalReach)) {
      setError("That's too big to display 🤯 Try smaller values.");
      setResult(null);
      return;
    }

    setLoading(true);
    setResult(null);
    setError(null);

    setTimeout(() => {
      setResult({
        value: Math.round(totalReach).toLocaleString(),
        initial,
        sharesPerPerson,
        rounds,
        key: Date.now(),
      });
      setLoading(false);
    }, 1000);
  };

  const inputFields = [
    {
      key: "initial" as keyof Fields,
      label: "Initial Viewers",
      icon: Users,
      placeholder: "e.g. 100",
    },
    {
      key: "sharesPerPerson" as keyof Fields,
      label: "Shares / Person",
      icon: Share2,
      placeholder: "e.g. 3",
    },
    {
      key: "rounds" as keyof Fields,
      label: "Rounds",
      icon: RefreshCw,
      placeholder: "e.g. 5",
    },
  ];

  return (
    <div className="space-y-5">
      <h3
        className="font-display text-3xl font-extrabold text-center"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.82 0.20 195), oklch(0.78 0.22 145))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Viral Growth Simulator
      </h3>

      <div className="grid grid-cols-1 gap-3">
        {inputFields.map(({ key, label, icon: Icon, placeholder }) => (
          <div key={key} className="space-y-1.5">
            <Label
              htmlFor={key}
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
              style={{ color: "oklch(0.82 0.20 195)" }}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </Label>
            <Input
              id={key}
              type="number"
              min="0"
              placeholder={placeholder}
              value={fields[key]}
              onChange={handleChange(key)}
              className="neon-input-cyan h-11 text-base rounded-2xl font-medium"
              style={{
                background: "oklch(0.08 0.018 285 / 0.80)",
                border: "1px solid oklch(0.35 0.04 285 / 0.50)",
                color: "oklch(0.97 0.008 280)",
              }}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={simulate}
        disabled={loading}
        className={`
          w-full h-14 rounded-full font-display text-base font-extrabold uppercase tracking-wider
          text-white transition-all duration-200 active:scale-95 hover-glow-cyan
          flex items-center justify-center gap-2
          ${bouncing ? "animate-bounce-scale" : ""}
          ${loading ? "opacity-80 cursor-not-allowed" : ""}
        `}
        style={{
          background:
            "linear-gradient(135deg, oklch(0.82 0.20 195), oklch(0.78 0.22 145))",
          boxShadow:
            "0 4px 24px oklch(0.82 0.20 195 / 0.45), 0 1px 0 oklch(1 0 0 / 0.15) inset",
        }}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Simulating...</span>
          </>
        ) : (
          "🚀 Simulate Growth"
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
            label="Total Reach"
            value={result.value}
            emoji="📈"
            variant="cyan-green"
          />
          <p className="text-center text-xs text-muted-foreground font-medium">
            Initial × (Shares Per Person ^ Rounds)
          </p>
          <GrowthCurveChart
            initialViewers={result.initial}
            sharesPerPerson={result.sharesPerPerson}
            rounds={result.rounds}
          />
        </div>
      )}
    </div>
  );
}
