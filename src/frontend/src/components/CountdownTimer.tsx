import { useEffect, useRef, useState } from "react";

interface CountdownTimerProps {
  seconds: number;
  onTimeout: () => void;
  isRunning: boolean;
  timerKey?: number;
}

export function CountdownTimer({
  seconds,
  onTimeout,
  isRunning,
  timerKey = 0,
}: CountdownTimerProps) {
  const [remaining, setRemaining] = useState(seconds);
  const onTimeoutRef = useRef(onTimeout);
  const secondsRef = useRef(seconds);
  onTimeoutRef.current = onTimeout;
  secondsRef.current = seconds;

  // Reset when timerKey or seconds changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: timerKey is a reset signal prop
  useEffect(() => {
    setRemaining(secondsRef.current);
  }, [timerKey]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: timerKey is a reset signal prop
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // Use setTimeout to defer calling the callback outside of state update
          setTimeout(() => onTimeoutRef.current(), 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timerKey]);

  const pct = (remaining / seconds) * 100;
  const isUrgent = remaining <= 5;
  const isWarning = remaining <= Math.floor(seconds * 0.25) && !isUrgent;
  const isMedium =
    remaining <= Math.floor(seconds * 0.5) && !isWarning && !isUrgent;

  let barColor: string;
  let glowColor: string;
  if (isUrgent) {
    barColor =
      "linear-gradient(90deg, oklch(0.65 0.28 25), oklch(0.70 0.30 15))";
    glowColor = "oklch(0.65 0.28 25 / 0.60)";
  } else if (isWarning) {
    barColor =
      "linear-gradient(90deg, oklch(0.82 0.22 70), oklch(0.85 0.20 90))";
    glowColor = "oklch(0.82 0.22 70 / 0.50)";
  } else if (isMedium) {
    barColor =
      "linear-gradient(90deg, oklch(0.88 0.20 100), oklch(0.82 0.22 70))";
    glowColor = "oklch(0.88 0.20 100 / 0.40)";
  } else {
    barColor =
      "linear-gradient(90deg, oklch(0.78 0.22 145), oklch(0.82 0.20 195))";
    glowColor = "oklch(0.78 0.22 145 / 0.40)";
  }

  let textColor: string;
  if (isUrgent) textColor = "oklch(0.80 0.26 25)";
  else if (isWarning) textColor = "oklch(0.88 0.20 80)";
  else textColor = "oklch(0.82 0.20 195)";

  return (
    <div className="flex items-center gap-3">
      {/* Timer number */}
      <div
        className="flex-shrink-0 font-display font-extrabold text-sm tabular-nums w-8 text-center transition-colors duration-300"
        style={{
          color: textColor,
          textShadow: isUrgent ? `0 0 8px ${glowColor}` : undefined,
        }}
      >
        {remaining}s
      </div>

      {/* Progress bar */}
      <div
        className="flex-1 h-2.5 rounded-full overflow-hidden relative"
        style={{ background: "oklch(0.20 0.025 280)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: `${pct}%`,
            background: barColor,
            boxShadow: `0 0 8px ${glowColor}`,
            animation: isUrgent
              ? "pulse-glow 0.5s ease-in-out infinite"
              : undefined,
          }}
        />
        {isUrgent && (
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "oklch(0.65 0.28 25 / 0.15)",
              animation: "pulse 0.5s ease-in-out infinite",
            }}
          />
        )}
      </div>

      {/* Timer emoji */}
      <div
        className="flex-shrink-0 text-sm"
        style={{
          filter: isUrgent
            ? "drop-shadow(0 0 4px oklch(0.65 0.28 25))"
            : undefined,
        }}
      >
        {isUrgent ? "🚨" : isWarning ? "⚠️" : "⏱️"}
      </div>
    </div>
  );
}
