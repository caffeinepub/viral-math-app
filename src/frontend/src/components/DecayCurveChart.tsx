interface DecayCurveChartProps {
  peakViews: number;
  decayRate: number;
  days: number;
}

export function DecayCurveChart({
  peakViews,
  decayRate,
  days,
}: DecayCurveChartProps) {
  const maxDays = Math.min(Math.ceil(days), 60);
  const points: { day: number; views: number }[] = [];

  for (let d = 0; d <= maxDays; d++) {
    const views = peakViews * decayRate ** d;
    points.push({ day: d, views });
  }

  if (points.length < 2) {
    return (
      <div
        className="rounded-3xl p-5 text-center text-muted-foreground text-sm"
        style={{
          background: "oklch(0.12 0.022 285 / 0.85)",
          border: "1px solid oklch(0.30 0.030 285 / 0.25)",
        }}
      >
        Not enough data to plot decay curve.
      </div>
    );
  }

  const maxViews = peakViews;
  const minViews = Math.min(...points.map((p) => p.views));

  // SVG dimensions
  const svgW = 280;
  const svgH = 140;
  const padL = 48;
  const padR = 16;
  const padT = 16;
  const padB = 28;
  const chartW = svgW - padL - padR;
  const chartH = svgH - padT - padB;

  const toX = (day: number) => padL + (day / maxDays) * chartW;
  const toY = (views: number) => {
    if (maxViews === minViews) return padT + chartH / 2;
    return (
      padT + chartH - ((views - minViews) / (maxViews - minViews)) * chartH
    );
  };

  const pathD = points
    .map(
      (p, i) =>
        `${i === 0 ? "M" : "L"} ${toX(p.day).toFixed(1)} ${toY(p.views).toFixed(1)}`,
    )
    .join(" ");

  const areaD = `${pathD} L ${toX(points[points.length - 1].day).toFixed(1)} ${(padT + chartH).toFixed(1)} L ${toX(0).toFixed(1)} ${(padT + chartH).toFixed(1)} Z`;

  const formatNum = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return Math.round(n).toString();
  };

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
          background:
            "linear-gradient(90deg, oklch(0.68 0.26 295), oklch(0.72 0.30 340))",
        }}
      />

      <p className="text-xs font-bold uppercase tracking-widest text-center text-muted-foreground mb-3">
        📉 View Decay Curve
      </p>

      <svg
        width="100%"
        viewBox={`0 0 ${svgW} ${svgH}`}
        className="overflow-visible"
        style={{ display: "block" }}
        role="img"
        aria-label="Decay curve chart"
      >
        <defs>
          <linearGradient id="decayGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
          const y = padT + frac * chartH;
          return (
            <line
              key={frac}
              x1={padL}
              y1={y}
              x2={padL + chartW}
              y2={y}
              stroke="oklch(0.30 0.025 285)"
              strokeWidth="0.5"
              strokeDasharray="3,3"
            />
          );
        })}

        {/* Area fill */}
        <path d={areaD} fill="url(#decayGrad)" />

        {/* Curve line */}
        <path
          d={pathD}
          fill="none"
          stroke="#c084fc"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: "drop-shadow(0 0 6px rgba(192,132,252,0.7))" }}
        />

        {/* Data points — only show a few to avoid clutter */}
        {points
          .filter(
            (_, i) =>
              i === 0 ||
              i === points.length - 1 ||
              i % Math.max(1, Math.floor(points.length / 5)) === 0,
          )
          .map((p) => (
            <circle
              key={p.day}
              cx={toX(p.day)}
              cy={toY(p.views)}
              r="3"
              fill="#c084fc"
              style={{ filter: "drop-shadow(0 0 4px rgba(192,132,252,0.9))" }}
            />
          ))}

        {/* Y-axis labels */}
        <text
          x={padL - 4}
          y={padT + 4}
          textAnchor="end"
          fontSize="8"
          fill="oklch(0.55 0.020 285)"
        >
          {formatNum(maxViews)}
        </text>
        <text
          x={padL - 4}
          y={padT + chartH}
          textAnchor="end"
          fontSize="8"
          fill="oklch(0.55 0.020 285)"
        >
          {formatNum(minViews)}
        </text>

        {/* X-axis labels */}
        <text
          x={padL}
          y={svgH - 4}
          textAnchor="middle"
          fontSize="8"
          fill="oklch(0.55 0.020 285)"
        >
          Day 0
        </text>
        <text
          x={padL + chartW}
          y={svgH - 4}
          textAnchor="middle"
          fontSize="8"
          fill="oklch(0.55 0.020 285)"
        >
          Day {maxDays}
        </text>

        {/* Axis lines */}
        <line
          x1={padL}
          y1={padT}
          x2={padL}
          y2={padT + chartH}
          stroke="oklch(0.35 0.025 285)"
          strokeWidth="1"
        />
        <line
          x1={padL}
          y1={padT + chartH}
          x2={padL + chartW}
          y2={padT + chartH}
          stroke="oklch(0.35 0.025 285)"
          strokeWidth="1"
        />
      </svg>

      <p className="text-center text-xs text-muted-foreground mt-1 opacity-60">
        Days (X) vs Remaining Views (Y)
      </p>
    </div>
  );
}
