import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ResultCard } from './ResultCard';
import { ViralMeter } from './ViralMeter';
import { EngagementBarChart } from './EngagementBarChart';
import { Eye, Heart, MessageCircle, Share2, AlertCircle, Loader2 } from 'lucide-react';

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
  const [fields, setFields] = useState<Fields>({ views: '', likes: '', comments: '', shares: '' });
  const [result, setResult] = useState<ResultData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [bouncing, setBouncing] = useState(false);

  const handleChange = (field: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields(prev => ({ ...prev, [field]: e.target.value }));
    setResult(null);
    setError(null);
  };

  const calculate = () => {
    setBouncing(true);
    setTimeout(() => setBouncing(false), 400);

    const views = parseFloat(fields.views);
    const likes = parseFloat(fields.likes);
    const comments = parseFloat(fields.comments);
    const shares = parseFloat(fields.shares);

    if (
      fields.views.trim() === '' ||
      fields.likes.trim() === '' ||
      fields.comments.trim() === '' ||
      fields.shares.trim() === ''
    ) {
      setError('Fill in all fields first bestie 👀');
      setResult(null);
      return;
    }

    if (isNaN(views) || isNaN(likes) || isNaN(comments) || isNaN(shares)) {
      setError('Those need to be valid numbers fr fr.');
      setResult(null);
      return;
    }

    if (views <= 0) {
      setError('Views gotta be more than zero, no cap.');
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
    { key: 'views' as keyof Fields, label: 'Views', icon: Eye, emoji: '👁', placeholder: 'e.g. 100000' },
    { key: 'likes' as keyof Fields, label: 'Likes', icon: Heart, emoji: '❤️', placeholder: 'e.g. 4500' },
    { key: 'comments' as keyof Fields, label: 'Comments', icon: MessageCircle, emoji: '💬', placeholder: 'e.g. 320' },
    { key: 'shares' as keyof Fields, label: 'Shares', icon: Share2, emoji: '🔁', placeholder: 'e.g. 180' },
  ];

  return (
    <div className="space-y-5">
      <h3
        className="font-display text-3xl font-extrabold text-center"
        style={{
          background: 'linear-gradient(135deg, oklch(0.72 0.30 340), oklch(0.68 0.26 295))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
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
              style={{ color: 'oklch(0.72 0.30 340)' }}
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
                  background: 'oklch(0.08 0.018 285 / 0.80)',
                  border: '1px solid oklch(0.35 0.04 285 / 0.50)',
                  color: 'oklch(0.97 0.008 280)',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={calculate}
        disabled={loading}
        className={`
          w-full h-14 rounded-full font-display text-base font-extrabold uppercase tracking-wider
          text-white transition-all duration-200 active:scale-95 hover-glow-pink
          flex items-center justify-center gap-2
          ${bouncing ? 'animate-bounce-scale' : ''}
          ${loading ? 'opacity-80 cursor-not-allowed' : ''}
        `}
        style={{
          background: 'linear-gradient(135deg, oklch(0.72 0.30 340), oklch(0.68 0.26 295))',
          boxShadow: '0 4px 24px oklch(0.72 0.30 340 / 0.45), 0 1px 0 oklch(1 0 0 / 0.15) inset',
        }}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Calculating...</span>
          </>
        ) : (
          '✨ Calculate Engagement'
        )}
      </button>

      {error && (
        <Alert variant="destructive" className="rounded-2xl border-destructive/40 bg-destructive/10">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm font-medium">{error}</AlertDescription>
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
