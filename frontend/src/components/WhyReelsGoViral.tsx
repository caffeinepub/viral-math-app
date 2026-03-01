const factors = [
  {
    emoji: '⏱️',
    title: 'High Watch Time',
    description:
      'Keeping viewers engaged longer signals quality to the algorithm, boosting promotion to new audiences.',
    color: 'oklch(0.72 0.30 340)',
    bg: 'oklch(0.72 0.30 340 / 0.10)',
    border: 'oklch(0.72 0.30 340 / 0.30)',
    gradient: 'linear-gradient(135deg, oklch(0.72 0.30 340), oklch(0.68 0.26 295))',
  },
  {
    emoji: '🔁',
    title: 'More Shares',
    description:
      'Each share amplifies reach exponentially, spreading your content to entirely new audiences beyond your followers.',
    color: 'oklch(0.82 0.20 195)',
    bg: 'oklch(0.82 0.20 195 / 0.10)',
    border: 'oklch(0.82 0.20 195 / 0.30)',
    gradient: 'linear-gradient(135deg, oklch(0.82 0.20 195), oklch(0.78 0.22 145))',
  },
  {
    emoji: '🎯',
    title: 'Strong Hook in First 3 Seconds',
    description:
      'Capturing attention immediately prevents users from scrolling past your reel — the algorithm rewards low drop-off rates.',
    color: 'oklch(0.68 0.26 295)',
    bg: 'oklch(0.68 0.26 295 / 0.10)',
    border: 'oklch(0.68 0.26 295 / 0.30)',
    gradient: 'linear-gradient(135deg, oklch(0.68 0.26 295), oklch(0.72 0.30 340))',
  },
  {
    emoji: '💬',
    title: 'High Comment Engagement',
    description:
      'Comments signal active discussion and community interest, pushing your reel higher in the algorithm rankings.',
    color: 'oklch(0.72 0.22 220)',
    bg: 'oklch(0.72 0.22 220 / 0.10)',
    border: 'oklch(0.72 0.22 220 / 0.30)',
    gradient: 'linear-gradient(135deg, oklch(0.72 0.22 220), oklch(0.82 0.20 195))',
  },
  {
    emoji: '🎵',
    title: 'Trending Audio',
    description:
      'Using trending sounds boosts discoverability — the algorithm actively promotes reels with popular audio tracks.',
    color: 'oklch(0.78 0.22 145)',
    bg: 'oklch(0.78 0.22 145 / 0.10)',
    border: 'oklch(0.78 0.22 145 / 0.30)',
    gradient: 'linear-gradient(135deg, oklch(0.78 0.22 145), oklch(0.82 0.20 195))',
  },
  {
    emoji: '📱',
    title: 'Vertical Full-Screen Format',
    description:
      'Native vertical video fills the screen completely, creating an immersive experience that keeps viewers watching longer.',
    color: 'oklch(0.88 0.20 100)',
    bg: 'oklch(0.88 0.20 100 / 0.10)',
    border: 'oklch(0.88 0.20 100 / 0.30)',
    gradient: 'linear-gradient(135deg, oklch(0.88 0.20 100), oklch(0.78 0.22 145))',
  },
];

export function WhyReelsGoViral() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="text-center">
        <h3
          className="font-display text-3xl font-extrabold"
          style={{
            background: 'linear-gradient(135deg, oklch(0.72 0.30 340), oklch(0.68 0.26 295))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          🔥 Why Reels Go Viral?
        </h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
          The science behind viral content — explained simply.
        </p>
      </div>

      {/* Factor cards */}
      <div className="space-y-3">
        {factors.map(({ emoji, title, description, color, bg, border, gradient }) => (
          <div
            key={title}
            className="rounded-3xl p-5 relative overflow-hidden transition-all duration-300 hover:scale-[1.01]"
            style={{
              background: 'oklch(0.12 0.022 285 / 0.85)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: `1px solid ${border}`,
            }}
          >
            {/* Top accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl"
              style={{ background: gradient }}
            />

            <div className="flex items-start gap-4">
              {/* Emoji badge */}
              <div
                className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                style={{ background: bg, border: `1px solid ${border}` }}
              >
                {emoji}
              </div>

              <div className="flex-1 min-w-0">
                <h4
                  className="font-display text-base font-extrabold mb-1"
                  style={{ color }}
                >
                  {title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom callout */}
      <div
        className="rounded-3xl p-5 text-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, oklch(0.72 0.30 340 / 0.12), oklch(0.72 0.22 220 / 0.12))',
          border: '1px solid oklch(0.72 0.30 340 / 0.25)',
        }}
      >
        <p
          className="font-display text-lg font-extrabold"
          style={{
            background: 'linear-gradient(135deg, oklch(0.72 0.30 340), oklch(0.72 0.22 220))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Virality is Mathematics, Not Magic. ✨
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Master these factors and let the algorithm work for you.
        </p>
      </div>
    </div>
  );
}
