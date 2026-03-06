interface ViralMeterProps {
  engagementRate: number;
}

export function ViralMeter({ engagementRate }: ViralMeterProps) {
  // Clamp to 0–20 for display (anything above 20% is off the charts)
  const maxRate = 20;
  const clampedRate = Math.min(engagementRate, maxRate);

  // Gauge is a 180-degree arc (semicircle)
  // Map 0–20% to 0–180 degrees
  const angleDeg = (clampedRate / maxRate) * 180;
  // Convert to radians for SVG
  const angleRad = ((angleDeg - 180) * Math.PI) / 180;

  const cx = 120;
  const cy = 110;
  const r = 80;

  // Needle tip
  const needleX = cx + r * Math.cos(angleRad);
  const needleY = cy + r * Math.sin(angleRad);

  // Zone boundaries (0–3% = red, 3–7% = yellow, 7%+ = green)
  // Map to angles: 0% = 180deg (left), 100% = 0deg (right)
  // 3% of 20 = 15% of arc = 27deg from left = 180-27=153deg
  // 7% of 20 = 35% of arc = 63deg from left = 180-63=117deg

  const describeArc = (startDeg: number, endDeg: number) => {
    const startRad = ((startDeg - 180) * Math.PI) / 180;
    const endRad = ((endDeg - 180) * Math.PI) / 180;
    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);
    const largeArc = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  // Zone: 0–3% → 0–27deg of 180 → arc from 0 to 27
  // Zone: 3–7% → 27–63deg
  // Zone: 7–20% → 63–180deg
  const redEnd = (3 / maxRate) * 180;
  const yellowEnd = (7 / maxRate) * 180;

  let zone: "low" | "medium" | "high" = "low";
  if (engagementRate >= 7) zone = "high";
  else if (engagementRate >= 3) zone = "medium";

  const zoneConfig = {
    low: {
      label: "🔴 Low Viral Chance",
      color: "#ef4444",
      bg: "oklch(0.45 0.22 25 / 0.15)",
      border: "oklch(0.55 0.22 25 / 0.40)",
    },
    medium: {
      label: "🟡 Medium Viral Chance",
      color: "#eab308",
      bg: "oklch(0.75 0.20 85 / 0.15)",
      border: "oklch(0.75 0.20 85 / 0.40)",
    },
    high: {
      label: "🟢 High Viral Chance",
      color: "#22c55e",
      bg: "oklch(0.65 0.22 145 / 0.15)",
      border: "oklch(0.65 0.22 145 / 0.40)",
    },
  };

  const zoneInfo = zoneConfig[zone];

  return (
    <div
      className="rounded-3xl p-5 relative overflow-hidden"
      style={{
        background: "oklch(0.12 0.022 285 / 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid oklch(0.30 0.030 285 / 0.25)",
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl"
        style={{
          background: "linear-gradient(90deg, #ef4444, #eab308, #22c55e)",
        }}
      />

      <p className="text-xs font-bold uppercase tracking-widest text-center text-muted-foreground mb-3">
        🔥 Viral Prediction Meter
      </p>

      <div className="flex justify-center">
        <svg
          width="240"
          height="130"
          viewBox="0 0 240 130"
          className="overflow-visible"
          role="img"
          aria-label="Viral prediction meter gauge"
        >
          {/* Background track */}
          <path
            d={describeArc(0, 180)}
            fill="none"
            stroke="oklch(0.25 0.025 285)"
            strokeWidth="16"
            strokeLinecap="round"
          />

          {/* Red zone: 0–3% */}
          <path
            d={describeArc(0, redEnd)}
            fill="none"
            stroke="#ef4444"
            strokeWidth="16"
            strokeLinecap="butt"
            opacity="0.85"
          />

          {/* Yellow zone: 3–7% */}
          <path
            d={describeArc(redEnd, yellowEnd)}
            fill="none"
            stroke="#eab308"
            strokeWidth="16"
            strokeLinecap="butt"
            opacity="0.85"
          />

          {/* Green zone: 7–20% */}
          <path
            d={describeArc(yellowEnd, 180)}
            fill="none"
            stroke="#22c55e"
            strokeWidth="16"
            strokeLinecap="butt"
            opacity="0.85"
          />

          {/* Zone labels */}
          <text
            x="18"
            y="118"
            fontSize="9"
            fill="#ef4444"
            fontWeight="bold"
            opacity="0.9"
          >
            LOW
          </text>
          <text
            x="100"
            y="42"
            fontSize="9"
            fill="#eab308"
            fontWeight="bold"
            opacity="0.9"
            textAnchor="middle"
          >
            MED
          </text>
          <text
            x="210"
            y="118"
            fontSize="9"
            fill="#22c55e"
            fontWeight="bold"
            opacity="0.9"
            textAnchor="end"
          >
            HIGH
          </text>

          {/* Needle */}
          <line
            x1={cx}
            y1={cy}
            x2={needleX}
            y2={needleY}
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 4px rgba(255,255,255,0.8))" }}
          />

          {/* Center dot */}
          <circle cx={cx} cy={cy} r="7" fill="white" opacity="0.95" />
          <circle cx={cx} cy={cy} r="4" fill="oklch(0.12 0.022 285)" />

          {/* Rate label */}
          <text
            x={cx}
            y={cy + 28}
            textAnchor="middle"
            fontSize="14"
            fontWeight="800"
            fontFamily="Space Grotesk, sans-serif"
            fill="white"
          >
            {engagementRate.toFixed(1)}%
          </text>
        </svg>
      </div>

      {/* Zone badge */}
      <div
        className="mx-auto mt-1 w-fit rounded-full px-4 py-1.5 text-sm font-bold text-center"
        style={{
          background: zoneInfo.bg,
          border: `1px solid ${zoneInfo.border}`,
          color: zoneInfo.color,
        }}
      >
        {zoneInfo.label}
      </div>

      {/* Scale hint */}
      <p className="text-center text-xs text-muted-foreground mt-2 opacity-60">
        0–3% Low · 3–7% Medium · 7%+ High
      </p>
    </div>
  );
}
