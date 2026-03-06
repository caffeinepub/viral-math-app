export function HowItWorks() {
  const sections = [
    {
      emoji: "📊",
      title: "Engagement Rate",
      tagline: "Are people actually vibing or just scrolling past?",
      color: "oklch(0.72 0.28 340)",
      colorAlt: "oklch(0.68 0.26 295)",
      formula: "Rate = (Likes + Comments + Shares) / Views × 100",
      steps: [
        {
          icon: "👍",
          label: "Add up all interactions",
          detail: "Likes + Comments + Shares = total engagement actions",
        },
        {
          icon: "👁️",
          label: "Divide by total views",
          detail: "This normalizes the number so you can compare across reels",
        },
        {
          icon: "✖️",
          label: "Multiply by 100",
          detail: "Converts the decimal into a clean percentage",
        },
      ],
      benchmarks: [
        { range: "< 1%", label: "mid 😐", color: "oklch(0.65 0.10 60)" },
        { range: "1–3%", label: "decent 👌", color: "oklch(0.78 0.22 145)" },
        { range: "3–6%", label: "slay 🔥", color: "oklch(0.82 0.20 195)" },
        {
          range: "> 6%",
          label: "absolutely unhinged 🤯",
          color: "oklch(0.72 0.28 340)",
        },
      ],
      tip: "Saves count too — if Instagram shows saves, add them in with shares for a more accurate picture.",
    },
    {
      emoji: "🚀",
      title: "Viral Growth Simulator",
      tagline: "How does content actually blow up?",
      color: "oklch(0.82 0.20 195)",
      colorAlt: "oklch(0.78 0.22 145)",
      formula:
        "Reach = Initial Views × (Avg Shares per Viewer ^ Sharing Rounds)",
      steps: [
        {
          icon: "🌱",
          label: "Start with initial views",
          detail: "Your reel's first audience — followers, explore page, etc.",
        },
        {
          icon: "🔁",
          label: "Each viewer shares to N people",
          detail: "If avg shares = 2, each round doubles your reach",
        },
        {
          icon: "📈",
          label: "Repeat for R rounds",
          detail:
            "Exponential growth kicks in fast — this is why things go viral",
        },
      ],
      benchmarks: [
        {
          range: "Shares < 1",
          label: "dying out 💀",
          color: "oklch(0.65 0.10 60)",
        },
        {
          range: "Shares = 1",
          label: "stable 😐",
          color: "oklch(0.78 0.22 145)",
        },
        {
          range: "Shares 1–2",
          label: "growing 📈",
          color: "oklch(0.82 0.20 195)",
        },
        {
          range: "Shares > 2",
          label: "viral arc 🚀",
          color: "oklch(0.72 0.28 340)",
        },
      ],
      tip: "Real viral content usually has a shares-per-viewer ratio between 0.1–0.5. A ratio above 1 is genuinely rare and means your content is hitting different.",
    },
    {
      emoji: "📉",
      title: "View Decay Simulator",
      tagline: "Nothing lasts forever — especially on the algorithm.",
      color: "oklch(0.68 0.26 295)",
      colorAlt: "oklch(0.72 0.28 340)",
      formula: "Views on Day D = Peak Views × (Decay Rate ^ D)",
      steps: [
        {
          icon: "🏔️",
          label: "Start at peak views",
          detail: "The highest daily view count your reel ever hit",
        },
        {
          icon: "📅",
          label: "Apply decay rate each day",
          detail: "A rate of 0.85 means you keep 85% of yesterday's views",
        },
        {
          icon: "🔢",
          label: "Raise to the power of days",
          detail: "Exponential decay — the drop compounds over time",
        },
      ],
      benchmarks: [
        {
          range: "Rate > 0.95",
          label: "evergreen content 🌿",
          color: "oklch(0.78 0.22 145)",
        },
        {
          range: "Rate 0.85–0.95",
          label: "normal drop-off 📊",
          color: "oklch(0.82 0.20 195)",
        },
        {
          range: "Rate 0.70–0.85",
          label: "fading fast ⏳",
          color: "oklch(0.65 0.10 60)",
        },
        {
          range: "Rate < 0.70",
          label: "one-hit wonder 💨",
          color: "oklch(0.72 0.28 340)",
        },
      ],
      tip: "Trending audio and challenges decay faster. Original, niche content tends to have slower decay because it keeps getting discovered.",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="glass-card rounded-3xl p-6 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, oklch(0.68 0.26 295 / 0.12), transparent 70%)",
          }}
        />
        <div className="text-4xl mb-3">🧠</div>
        <h1 className="font-display text-3xl font-extrabold mb-2">
          <span className="gradient-text-purple-pink">How It Works</span>
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
          The math behind going viral, explained in plain English. No PhD
          required. 💅
        </p>
      </div>

      {/* Sections */}
      {sections.map((section) => (
        <div
          key={section.title}
          className="glass-card rounded-3xl overflow-hidden"
        >
          {/* Section header bar */}
          <div className="px-5 pt-5 pb-4 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
              style={{
                background: `linear-gradient(90deg, ${section.color}, ${section.colorAlt})`,
              }}
            />
            <div className="flex items-center gap-3 mb-1">
              <span className="text-2xl">{section.emoji}</span>
              <h2 className="font-display text-xl font-extrabold text-foreground">
                {section.title}
              </h2>
            </div>
            <p className="text-sm text-muted-foreground italic">
              {section.tagline}
            </p>
          </div>

          {/* Formula */}
          <div
            className="mx-5 mb-4 rounded-2xl px-4 py-3"
            style={{
              background: "oklch(0.10 0.015 280 / 0.80)",
              border: `1px solid ${section.color}40`,
            }}
          >
            <p
              className="text-xs font-bold uppercase tracking-widest mb-1"
              style={{ color: section.color }}
            >
              formula
            </p>
            <code className="text-xs font-mono text-foreground/90 break-all">
              {section.formula}
            </code>
          </div>

          {/* Steps */}
          <div className="px-5 mb-4 space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
              How the math works
            </p>
            {section.steps.map((step) => (
              <div
                key={step.label}
                className="flex items-start gap-3 rounded-2xl p-3"
                style={{ background: "oklch(0.14 0.02 280 / 0.60)" }}
              >
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-base"
                  style={{
                    background: `${section.color}20`,
                    border: `1px solid ${section.color}30`,
                  }}
                >
                  {step.icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">
                    {step.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Benchmarks */}
          <div className="px-5 mb-4">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
              Benchmarks
            </p>
            <div className="grid grid-cols-2 gap-2">
              {section.benchmarks.map((b) => (
                <div
                  key={b.range}
                  className="rounded-2xl p-3 text-center"
                  style={{
                    background: "oklch(0.14 0.02 280 / 0.60)",
                    border: `1px solid ${b.color}30`,
                  }}
                >
                  <p
                    className="text-xs font-mono font-bold mb-1"
                    style={{ color: b.color }}
                  >
                    {b.range}
                  </p>
                  <p className="text-xs text-foreground/80">{b.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pro tip */}
          <div
            className="mx-5 mb-5 rounded-2xl px-4 py-3 flex gap-3"
            style={{
              background: `${section.color}10`,
              border: `1px solid ${section.color}25`,
            }}
          >
            <span className="text-base flex-shrink-0">💡</span>
            <p className="text-xs text-foreground/80 leading-relaxed">
              {section.tip}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
