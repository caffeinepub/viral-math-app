interface GrowthCurveChartProps {
  initialViewers: number;
  sharesPerPerson: number;
  rounds: number;
}

export function GrowthCurveChart({ initialViewers, sharesPerPerson, rounds }: GrowthCurveChartProps) {
  const maxRounds = Math.min(rounds, 20);
  const points: { round: number; reach: number }[] = [];

  for (let i = 0; i <= maxRounds; i++) {
    const reach = initialViewers * Math.pow(sharesPerPerson, i);
    if (!isFinite(reach)) break;
    points.push({ round: i, reach });
  }

  if (points.length < 2) {
    return (
      <div
        className="rounded-3xl p-5 text-center text-muted-foreground text-sm"
        style={{
          background: 'oklch(0.12 0.022 285 / 0.85)',
          border: '1px solid oklch(0.30 0.030 285 / 0.25)',
        }}
      >
        Not enough data to plot growth curve.
      </div>
    );
  }

  const maxReach = Math.max(...points.map(p => p.reach));
  const minReach = Math.min(...points.map(p => p.reach));

  // SVG dimensions
  const svgW = 280;
  const svgH = 140;
  const padL = 48;
  const padR = 16;
  const padT = 16;
  const padB = 28;
  const chartW = svgW - padL - padR;
  const chartH = svgH - padT - padB;

  const toX = (round: number) => padL + (round / maxRounds) * chartW;
  const toY = (reach: number) => {
    if (maxReach === minReach) return padT + chartH / 2;
    return padT + chartH - ((reach - minReach) / (maxReach - minReach)) * chartH;
  };

  const pathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(p.round).toFixed(1)} ${toY(p.reach).toFixed(1)}`)
    .join(' ');

  // Area fill path
  const areaD =
    pathD +
    ` L ${toX(points[points.length - 1].round).toFixed(1)} ${(padT + chartH).toFixed(1)}` +
    ` L ${toX(0).toFixed(1)} ${(padT + chartH).toFixed(1)} Z`;

  const formatNum = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return Math.round(n).toString();
  };

  return (
    <div
      className="rounded-3xl p-5 relative overflow-hidden"
      style={{
        background: 'oklch(0.12 0.022 285 / 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid oklch(0.30 0.030 285 / 0.25)',
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl"
        style={{ background: 'linear-gradient(90deg, oklch(0.82 0.20 195), oklch(0.78 0.22 145))' }}
      />

      <p className="text-xs font-bold uppercase tracking-widest text-center text-muted-foreground mb-3">
        📈 Exponential Growth Curve
      </p>

      <svg
        width="100%"
        viewBox={`0 0 ${svgW} ${svgH}`}
        className="overflow-visible"
        style={{ display: 'block' }}
      >
        <defs>
          <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map(frac => {
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
        <path d={areaD} fill="url(#growthGrad)" />

        {/* Curve line */}
        <path
          d={pathD}
          fill="none"
          stroke="#22d3ee"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: 'drop-shadow(0 0 6px rgba(34,211,238,0.7))' }}
        />

        {/* Data points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={toX(p.round)}
            cy={toY(p.reach)}
            r="3"
            fill="#22d3ee"
            style={{ filter: 'drop-shadow(0 0 4px rgba(34,211,238,0.9))' }}
          />
        ))}

        {/* Y-axis labels */}
        <text x={padL - 4} y={padT + 4} textAnchor="end" fontSize="8" fill="oklch(0.55 0.020 285)">
          {formatNum(maxReach)}
        </text>
        <text x={padL - 4} y={padT + chartH} textAnchor="end" fontSize="8" fill="oklch(0.55 0.020 285)">
          {formatNum(minReach)}
        </text>

        {/* X-axis labels */}
        <text x={padL} y={svgH - 4} textAnchor="middle" fontSize="8" fill="oklch(0.55 0.020 285)">
          R0
        </text>
        <text x={padL + chartW} y={svgH - 4} textAnchor="middle" fontSize="8" fill="oklch(0.55 0.020 285)">
          R{maxRounds}
        </text>

        {/* Axis lines */}
        <line x1={padL} y1={padT} x2={padL} y2={padT + chartH} stroke="oklch(0.35 0.025 285)" strokeWidth="1" />
        <line x1={padL} y1={padT + chartH} x2={padL + chartW} y2={padT + chartH} stroke="oklch(0.35 0.025 285)" strokeWidth="1" />
      </svg>

      <p className="text-center text-xs text-muted-foreground mt-1 opacity-60">
        Rounds (X) vs Total Reach (Y)
      </p>
    </div>
  );
}
