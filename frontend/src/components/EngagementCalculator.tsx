import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ResultCard } from './ResultCard';
import { Eye, Heart, MessageCircle, Share2, AlertCircle } from 'lucide-react';

interface Fields {
  views: string;
  likes: string;
  comments: string;
  shares: string;
}

export function EngagementCalculator() {
  const [fields, setFields] = useState<Fields>({ views: '', likes: '', comments: '', shares: '' });
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
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

    const rate = ((likes + comments + shares) / views) * 100;
    setResult(rate.toFixed(2));
    setError(null);
  };

  const inputFields = [
    { key: 'views' as keyof Fields, label: 'Views', icon: Eye, placeholder: 'e.g. 100000' },
    { key: 'likes' as keyof Fields, label: 'Likes', icon: Heart, placeholder: 'e.g. 4500' },
    { key: 'comments' as keyof Fields, label: 'Comments', icon: MessageCircle, placeholder: 'e.g. 320' },
    { key: 'shares' as keyof Fields, label: 'Shares', icon: Share2, placeholder: 'e.g. 180' },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        {inputFields.map(({ key, label, icon: Icon, placeholder }) => (
          <div key={key} className="space-y-1.5">
            <Label
              htmlFor={key}
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
              style={{ color: 'oklch(0.72 0.28 340)' }}
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
              className="neon-input-pink h-11 text-base rounded-2xl font-medium"
              style={{
                background: 'oklch(0.10 0.015 280 / 0.80)',
                border: '1px solid oklch(0.40 0.04 280 / 0.50)',
                color: 'oklch(0.97 0.008 280)',
              }}
            />
          </div>
        ))}
      </div>

      <button
        onClick={calculate}
        className={`
          w-full h-14 rounded-full font-display text-base font-extrabold uppercase tracking-wider
          text-white transition-all duration-200 active:scale-95
          ${bouncing ? 'animate-bounce-scale' : ''}
        `}
        style={{
          background: 'linear-gradient(135deg, oklch(0.72 0.28 340), oklch(0.68 0.26 295))',
          boxShadow: '0 4px 24px oklch(0.72 0.28 340 / 0.45), 0 1px 0 oklch(1 0 0 / 0.15) inset',
        }}
      >
        ✨ Calculate Engagement
      </button>

      {error && (
        <Alert variant="destructive" className="rounded-2xl border-destructive/40 bg-destructive/10">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm font-medium">{error}</AlertDescription>
        </Alert>
      )}

      {result !== null && (
        <div className="animate-fade-in">
          <ResultCard
            label="Engagement Rate"
            value={result}
            unit="%"
            emoji="🔥"
            variant="pink-purple"
          />
          <p className="text-center text-xs text-muted-foreground mt-3 font-medium">
            (Likes + Comments + Shares) ÷ Views × 100
          </p>
        </div>
      )}
    </div>
  );
}
