interface EngagementBarChartProps {
  likes: number;
  comments: number;
  shares: number;
}

export function EngagementBarChart({
  likes,
  comments,
  shares,
}: EngagementBarChartProps) {
  const data = [
    {
      label: "❤️ Likes",
      value: likes,
      color: "#f472b6",
      glow: "oklch(0.72 0.30 340 / 0.50)",
    },
    {
      label: "💬 Comments",
      value: comments,
      color: "#818cf8",
      glow: "oklch(0.68 0.26 295 / 0.50)",
    },
    {
      label: "🔁 Shares",
      value: shares,
      color: "#22d3ee",
      glow: "oklch(0.82 0.20 195 / 0.50)",
    },
  ];

  const maxValue = Math.max(...data.map((d) => d.value), 1);

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
            "linear-gradient(90deg, oklch(0.72 0.30 340), oklch(0.68 0.26 295), oklch(0.82 0.20 195))",
        }}
      />

      <p className="text-xs font-bold uppercase tracking-widest text-center text-muted-foreground mb-4">
        📊 Engagement Breakdown
      </p>

      <div className="space-y-3">
        {data.map(({ label, value, color, glow }) => {
          const pct = maxValue > 0 ? (value / maxValue) * 100 : 0;
          return (
            <div key={label} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-white/80">{label}</span>
                <span
                  className="text-xs font-extrabold font-display"
                  style={{ color }}
                >
                  {value.toLocaleString()}
                </span>
              </div>
              <div
                className="h-3 rounded-full overflow-hidden"
                style={{ background: "oklch(0.18 0.025 285)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${pct}%`,
                    background: color,
                    boxShadow: `0 0 8px ${glow}`,
                    minWidth: value > 0 ? "4px" : "0",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-center text-xs text-muted-foreground mt-3 opacity-60">
        Relative engagement distribution
      </p>
    </div>
  );
}
