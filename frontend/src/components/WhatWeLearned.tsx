const takeaways = [
  {
    emoji: '📊',
    title: 'Percentage Controls Engagement',
    description:
      'The engagement rate formula reveals how much interaction your content generates relative to its reach.',
    color: 'oklch(0.72 0.30 340)',
    bg: 'oklch(0.72 0.30 340 / 0.10)',
    border: 'oklch(0.72 0.30 340 / 0.30)',
    gradient: 'linear-gradient(135deg, oklch(0.72 0.30 340), oklch(0.68 0.26 295))',
  },
  {
    emoji: '🚀',
    title: 'Sharing Creates Exponential Growth',
    description:
      'Each share multiplies your reach, driving viral momentum that compounds with every round of sharing.',
    color: 'oklch(0.82 0.20 195)',
    bg: 'oklch(0.82 0.20 195 / 0.10)',
    border: 'oklch(0.82 0.20 195 / 0.30)',
    gradient: 'linear-gradient(135deg, oklch(0.82 0.20 195), oklch(0.78 0.22 145))',
  },
  {
    emoji: '⏳',
    title: 'Time Causes Decay',
    description:
      'Views naturally decline over time, making timing and consistency critical for sustained content performance.',
    color: 'oklch(0.68 0.26 295)',
    bg: 'oklch(0.68 0.26 295 / 0.10)',
    border: 'oklch(0.68 0.26 295 / 0.30)',
    gradient: 'linear-gradient(135deg, oklch(0.68 0.26 295), oklch(0.72 0.30 340))',
  },
  {
    emoji: '🤖',
    title: 'The Algorithm Works on Logic',
    description:
      'Understanding the math behind virality helps you create strategic content that the algorithm actively promotes.',
    color: 'oklch(0.72 0.22 220)',
    bg: 'oklch(0.72 0.22 220 / 0.10)',
    border: 'oklch(0.72 0.22 220 / 0.30)',
    gradient: 'linear-gradient(135deg, oklch(0.72 0.22 220), oklch(0.82 0.20 195))',
  },
];

export function WhatWeLearned() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="text-center">
        <h3
          className="font-display text-3xl font-extrabold"
          style={{
            background: 'linear-gradient(135deg, oklch(0.72 0.22 220), oklch(0.68 0.26 295))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          🏆 What We Learned
        </h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
          Key takeaways from your viral math journey.
        </p>
      </div>

      {/* Takeaway cards */}
      <div className="space-y-3">
        {takeaways.map(({ emoji, title, description, color, bg, border, gradient }, index) => (
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
              {/* Number + emoji badge */}
              <div
                className="flex-shrink-0 w-12 h-12 rounded-2xl flex flex-col items-center justify-center"
                style={{ background: bg, border: `1px solid ${border}` }}
              >
                <span className="text-xl leading-none">{emoji}</span>
                <span
                  className="text-xs font-extrabold font-display leading-none mt-0.5"
                  style={{ color }}
                >
                  #{index + 1}
                </span>
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

      {/* Motivational closing line */}
      <div
        className="rounded-3xl p-6 text-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, oklch(0.72 0.22 220 / 0.12), oklch(0.68 0.26 295 / 0.12))',
          border: '1px solid oklch(0.72 0.22 220 / 0.30)',
        }}
      >
        {/* Accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl"
          style={{ background: 'linear-gradient(90deg, oklch(0.72 0.22 220), oklch(0.68 0.26 295), oklch(0.72 0.30 340))' }}
        />

        <p className="text-3xl mb-3">🚀</p>
        <p
          className="font-display text-xl font-extrabold"
          style={{
            background: 'linear-gradient(135deg, oklch(0.72 0.22 220), oklch(0.68 0.26 295), oklch(0.72 0.30 340))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Now you know the math behind every viral moment.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Use these insights to create content that the algorithm loves. 🔥
        </p>
      </div>
    </div>
  );
}
