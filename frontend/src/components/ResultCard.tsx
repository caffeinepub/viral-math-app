import { cn } from '@/lib/utils';

interface ResultCardProps {
  label: string;
  value: string;
  unit?: string;
  emoji?: string;
  variant?: 'pink-purple' | 'cyan-green' | 'purple-pink';
  className?: string;
}

export function ResultCard({
  label,
  value,
  unit,
  emoji = '🔥',
  variant = 'pink-purple',
  className,
}: ResultCardProps) {
  const gradientMap = {
    'pink-purple': 'linear-gradient(135deg, oklch(0.72 0.30 340), oklch(0.68 0.26 295))',
    'cyan-green': 'linear-gradient(135deg, oklch(0.82 0.20 195), oklch(0.78 0.22 145))',
    'purple-pink': 'linear-gradient(135deg, oklch(0.68 0.26 295), oklch(0.72 0.30 340))',
  };

  const glowMap = {
    'pink-purple': '0 0 40px oklch(0.72 0.30 340 / 0.35), 0 0 80px oklch(0.68 0.26 295 / 0.18)',
    'cyan-green': '0 0 40px oklch(0.82 0.20 195 / 0.35), 0 0 80px oklch(0.78 0.22 145 / 0.18)',
    'purple-pink': '0 0 40px oklch(0.68 0.26 295 / 0.35), 0 0 80px oklch(0.72 0.30 340 / 0.18)',
  };

  const borderMap = {
    'pink-purple': 'oklch(0.72 0.30 340 / 0.35)',
    'cyan-green': 'oklch(0.82 0.20 195 / 0.35)',
    'purple-pink': 'oklch(0.68 0.26 295 / 0.35)',
  };

  return (
    <div
      className={cn(
        'rounded-3xl p-6 text-center relative overflow-hidden',
        className
      )}
      style={{
        background: 'oklch(0.12 0.022 285 / 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${borderMap[variant]}`,
        boxShadow: glowMap[variant],
      }}
    >
      {/* Gradient accent bar at top */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl"
        style={{ background: gradientMap[variant] }}
      />

      {/* Background glow blob */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ background: gradientMap[variant] }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-2xl animate-float">{emoji}</span>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {label}
          </p>
        </div>

        <div className="flex items-baseline justify-center gap-1">
          <span
            className="font-display text-5xl font-extrabold leading-none"
            style={{
              background: gradientMap[variant],
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {value}
          </span>
          {unit && (
            <span
              className="font-display text-2xl font-bold ml-1"
              style={{
                background: gradientMap[variant],
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                opacity: 0.75,
              }}
            >
              {unit}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
