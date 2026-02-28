import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ResultCard } from './ResultCard';
import { BarChart2, Percent, Calendar, AlertCircle } from 'lucide-react';

interface Fields {
  peakViews: string;
  decayRate: string;
  days: string;
}

export function DecaySimulator() {
  const [fields, setFields] = useState<Fields>({ peakViews: '', decayRate: '', days: '' });
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [bouncing, setBouncing] = useState(false);

  const handleChange = (field: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields(prev => ({ ...prev, [field]: e.target.value }));
    setResult(null);
    setError(null);
  };

  const simulate = () => {
    setBouncing(true);
    setTimeout(() => setBouncing(false), 400);

    const peakViews = parseFloat(fields.peakViews);
    const decayRate = parseFloat(fields.decayRate);
    const days = parseFloat(fields.days);

    if (
      fields.peakViews.trim() === '' ||
      fields.decayRate.trim() === '' ||
      fields.days.trim() === ''
    ) {
      setError('Fill in all fields first bestie 👀');
      setResult(null);
      return;
    }

    if (isNaN(peakViews) || isNaN(decayRate) || isNaN(days)) {
      setError('Those need to be valid numbers fr fr.');
      setResult(null);
      return;
    }

    if (peakViews <= 0) {
      setError('Peak views gotta be more than zero.');
      setResult(null);
      return;
    }

    if (decayRate <= 0 || decayRate >= 1) {
      setError('Decay rate must be between 0 and 1, e.g. 0.85.');
      setResult(null);
      return;
    }

    if (days < 0) {
      setError('Days can\'t be negative bestie.');
      setResult(null);
      return;
    }

    const remaining = peakViews * Math.pow(decayRate, days);
    setResult(Math.round(remaining).toLocaleString());
    setError(null);
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-3">
        <div className="space-y-1.5">
          <Label
            htmlFor="peakViews"
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
            style={{ color: 'oklch(0.68 0.26 295)' }}
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
            onChange={handleChange('peakViews')}
            className="neon-input h-11 text-base rounded-2xl font-medium"
            style={{
              background: 'oklch(0.10 0.015 280 / 0.80)',
              border: '1px solid oklch(0.40 0.04 280 / 0.50)',
              color: 'oklch(0.97 0.008 280)',
            }}
          />
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="decayRate"
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
            style={{ color: 'oklch(0.68 0.26 295)' }}
          >
            <Percent className="w-3.5 h-3.5" />
            Decay Rate
            <span className="text-xs font-normal normal-case tracking-normal text-muted-foreground ml-1">(0–1)</span>
          </Label>
          <Input
            id="decayRate"
            type="number"
            min="0"
            max="1"
            step="0.01"
            placeholder="e.g. 0.85"
            value={fields.decayRate}
            onChange={handleChange('decayRate')}
            className="neon-input h-11 text-base rounded-2xl font-medium"
            style={{
              background: 'oklch(0.10 0.015 280 / 0.80)',
              border: '1px solid oklch(0.40 0.04 280 / 0.50)',
              color: 'oklch(0.97 0.008 280)',
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
            style={{ color: 'oklch(0.68 0.26 295)' }}
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
            onChange={handleChange('days')}
            className="neon-input h-11 text-base rounded-2xl font-medium"
            style={{
              background: 'oklch(0.10 0.015 280 / 0.80)',
              border: '1px solid oklch(0.40 0.04 280 / 0.50)',
              color: 'oklch(0.97 0.008 280)',
            }}
          />
        </div>
      </div>

      <button
        onClick={simulate}
        className={`
          w-full h-14 rounded-full font-display text-base font-extrabold uppercase tracking-wider
          text-white transition-all duration-200 active:scale-95
          ${bouncing ? 'animate-bounce-scale' : ''}
        `}
        style={{
          background: 'linear-gradient(135deg, oklch(0.68 0.26 295), oklch(0.72 0.28 340))',
          boxShadow: '0 4px 24px oklch(0.68 0.26 295 / 0.45), 0 1px 0 oklch(1 0 0 / 0.15) inset',
        }}
      >
        📉 Simulate Decay
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
            label="Remaining Views"
            value={result}
            emoji="⏳"
            variant="purple-pink"
          />
          <p className="text-center text-xs text-muted-foreground mt-3 font-medium">
            Peak × (Decay Rate ^ Days)
          </p>
        </div>
      )}
    </div>
  );
}
