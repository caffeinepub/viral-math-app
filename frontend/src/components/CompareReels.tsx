import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';

interface ReelFields {
  views: string;
  likes: string;
  comments: string;
  shares: string;
}

interface ReelResult {
  rate: number;
  label: string;
}

const emptyFields = (): ReelFields => ({ views: '', likes: '', comments: '', shares: '' });

const inputDefs = [
  { key: 'views' as keyof ReelFields, emoji: '👁', label: 'Views', placeholder: 'e.g. 100000' },
  { key: 'likes' as keyof ReelFields, emoji: '❤️', label: 'Likes', placeholder: 'e.g. 4500' },
  { key: 'comments' as keyof ReelFields, emoji: '💬', label: 'Comments', placeholder: 'e.g. 320' },
  { key: 'shares' as keyof ReelFields, emoji: '🔁', label: 'Shares', placeholder: 'e.g. 180' },
];

function ReelInputPanel({
  label,
  fields,
  onChange,
  accentColor,
  borderColor,
}: {
  label: string;
  fields: ReelFields;
  onChange: (field: keyof ReelFields, value: string) => void;
  accentColor: string;
  borderColor: string;
}) {
  return (
    <div
      className="rounded-3xl p-4 space-y-3 relative overflow-hidden"
      style={{
        background: 'oklch(0.12 0.022 285 / 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${borderColor}`,
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl"
        style={{ background: accentColor }}
      />
      <p
        className="font-display text-base font-extrabold text-center"
        style={{
          background: accentColor,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {label}
      </p>
      {inputDefs.map(({ key, emoji, label: fieldLabel, placeholder }) => (
        <div key={key} className="space-y-1">
          <Label
            htmlFor={`${label}-${key}`}
            className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider"
            style={{ color: 'oklch(0.65 0.020 285)' }}
          >
            <span>{emoji}</span>
            {fieldLabel}
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm pointer-events-none select-none z-10">
              {emoji}
            </span>
            <Input
              id={`${label}-${key}`}
              type="number"
              min="0"
              placeholder={placeholder}
              value={fields[key]}
              onChange={e => onChange(key, e.target.value)}
              className="h-10 text-sm rounded-2xl font-medium pl-8"
              style={{
                background: 'oklch(0.08 0.018 285 / 0.80)',
                border: '1px solid oklch(0.30 0.030 285 / 0.50)',
                color: 'oklch(0.97 0.008 280)',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function RateDisplay({
  label,
  rate,
  isWinner,
  accentColor,
  borderColor,
}: {
  label: string;
  rate: number;
  isWinner: boolean;
  accentColor: string;
  borderColor: string;
}) {
  return (
    <div
      className="rounded-3xl p-4 text-center relative overflow-hidden transition-all duration-300"
      style={{
        background: 'oklch(0.12 0.022 285 / 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${borderColor}`,
        boxShadow: isWinner ? `0 0 30px ${borderColor}` : 'none',
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl"
        style={{ background: accentColor }}
      />
      {isWinner && (
        <div className="text-lg mb-1">🏆</div>
      )}
      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
      <p
        className="font-display text-4xl font-extrabold"
        style={{
          background: accentColor,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {rate.toFixed(2)}%
      </p>
      <p className="text-xs text-muted-foreground mt-1">Engagement Rate</p>
    </div>
  );
}

export function CompareReels() {
  const [reel1, setReel1] = useState<ReelFields>(emptyFields());
  const [reel2, setReel2] = useState<ReelFields>(emptyFields());
  const [results, setResults] = useState<{ r1: ReelResult; r2: ReelResult; key: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [bouncing, setBouncing] = useState(false);

  const handleChange1 = (field: keyof ReelFields, value: string) => {
    setReel1(prev => ({ ...prev, [field]: value }));
    setResults(null);
    setError(null);
  };

  const handleChange2 = (field: keyof ReelFields, value: string) => {
    setReel2(prev => ({ ...prev, [field]: value }));
    setResults(null);
    setError(null);
  };

  const parseFields = (f: ReelFields) => ({
    views: parseFloat(f.views),
    likes: parseFloat(f.likes),
    comments: parseFloat(f.comments),
    shares: parseFloat(f.shares),
  });

  const validate = (f: ReelFields, label: string): string | null => {
    if (Object.values(f).some(v => v.trim() === '')) {
      return `Fill in all fields for ${label} first 👀`;
    }
    const { views, likes, comments, shares } = parseFields(f);
    if ([views, likes, comments, shares].some(isNaN)) {
      return `${label} has invalid numbers fr fr.`;
    }
    if (views <= 0) {
      return `${label}: Views must be greater than zero.`;
    }
    return null;
  };

  const compare = () => {
    setBouncing(true);
    setTimeout(() => setBouncing(false), 400);

    const err1 = validate(reel1, 'Reel 1');
    if (err1) { setError(err1); setResults(null); return; }
    const err2 = validate(reel2, 'Reel 2');
    if (err2) { setError(err2); setResults(null); return; }

    setLoading(true);
    setResults(null);
    setError(null);

    setTimeout(() => {
      const p1 = parseFields(reel1);
      const p2 = parseFields(reel2);
      const rate1 = ((p1.likes + p1.comments + p1.shares) / p1.views) * 100;
      const rate2 = ((p2.likes + p2.comments + p2.shares) / p2.views) * 100;
      setResults({
        r1: { rate: rate1, label: 'Reel 1' },
        r2: { rate: rate2, label: 'Reel 2' },
        key: Date.now(),
      });
      setLoading(false);
    }, 1000);
  };

  const winner =
    results
      ? results.r1.rate > results.r2.rate
        ? 'reel1'
        : results.r2.rate > results.r1.rate
        ? 'reel2'
        : 'tie'
      : null;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="text-center">
        <h3
          className="font-display text-3xl font-extrabold"
          style={{
            background: 'linear-gradient(135deg, oklch(0.72 0.30 340), oklch(0.72 0.22 220))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          ⚔️ Compare Two Reels
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Which reel has higher viral potential?
        </p>
      </div>

      {/* Input panels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ReelInputPanel
          label="🎬 Reel 1"
          fields={reel1}
          onChange={handleChange1}
          accentColor="linear-gradient(135deg, oklch(0.72 0.30 340), oklch(0.68 0.26 295))"
          borderColor="oklch(0.72 0.30 340 / 0.30)"
        />
        <ReelInputPanel
          label="🎬 Reel 2"
          fields={reel2}
          onChange={handleChange2}
          accentColor="linear-gradient(135deg, oklch(0.72 0.22 220), oklch(0.82 0.20 195))"
          borderColor="oklch(0.72 0.22 220 / 0.30)"
        />
      </div>

      {/* Compare button */}
      <button
        onClick={compare}
        disabled={loading}
        className={`
          w-full h-14 rounded-full font-display text-base font-extrabold uppercase tracking-wider
          text-white transition-all duration-200 active:scale-95 hover-glow-pink
          flex items-center justify-center gap-2
          ${bouncing ? 'animate-bounce-scale' : ''}
          ${loading ? 'opacity-80 cursor-not-allowed' : ''}
        `}
        style={{
          background: 'linear-gradient(135deg, oklch(0.72 0.30 340), oklch(0.72 0.22 220))',
          boxShadow: '0 4px 24px oklch(0.72 0.30 340 / 0.45), 0 1px 0 oklch(1 0 0 / 0.15) inset',
        }}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Comparing...</span>
          </>
        ) : (
          '⚔️ Compare Reels'
        )}
      </button>

      {error && (
        <Alert variant="destructive" className="rounded-2xl border-destructive/40 bg-destructive/10">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm font-medium">{error}</AlertDescription>
        </Alert>
      )}

      {results !== null && (
        <div key={results.key} className="space-y-4 animate-scale-in">
          {/* Results side by side */}
          <div className="grid grid-cols-2 gap-3">
            <RateDisplay
              label="Reel 1"
              rate={results.r1.rate}
              isWinner={winner === 'reel1'}
              accentColor="linear-gradient(135deg, oklch(0.72 0.30 340), oklch(0.68 0.26 295))"
              borderColor={winner === 'reel1' ? 'oklch(0.72 0.30 340 / 0.60)' : 'oklch(0.72 0.30 340 / 0.25)'}
            />
            <RateDisplay
              label="Reel 2"
              rate={results.r2.rate}
              isWinner={winner === 'reel2'}
              accentColor="linear-gradient(135deg, oklch(0.72 0.22 220), oklch(0.82 0.20 195))"
              borderColor={winner === 'reel2' ? 'oklch(0.72 0.22 220 / 0.60)' : 'oklch(0.72 0.22 220 / 0.25)'}
            />
          </div>

          {/* Winner banner */}
          <div
            className="rounded-3xl p-4 text-center relative overflow-hidden"
            style={{
              background:
                winner === 'tie'
                  ? 'oklch(0.68 0.26 295 / 0.15)'
                  : winner === 'reel1'
                  ? 'oklch(0.72 0.30 340 / 0.15)'
                  : 'oklch(0.72 0.22 220 / 0.15)',
              border:
                winner === 'tie'
                  ? '1px solid oklch(0.68 0.26 295 / 0.40)'
                  : winner === 'reel1'
                  ? '1px solid oklch(0.72 0.30 340 / 0.50)'
                  : '1px solid oklch(0.72 0.22 220 / 0.50)',
            }}
          >
            <p className="font-display text-xl font-extrabold text-white">
              {winner === 'tie'
                ? "It's a Tie! 🤝"
                : winner === 'reel1'
                ? '🏆 Reel 1 Wins!'
                : '🏆 Reel 2 Wins!'}
            </p>
            {winner !== 'tie' && (
              <p className="text-sm text-muted-foreground mt-1">
                {winner === 'reel1'
                  ? `Reel 1 has ${(results.r1.rate - results.r2.rate).toFixed(2)}% higher engagement`
                  : `Reel 2 has ${(results.r2.rate - results.r1.rate).toFixed(2)}% higher engagement`}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
