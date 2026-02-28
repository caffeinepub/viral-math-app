const tips = [
  {
    category: '⏰ Timing is Everything',
    color: 'oklch(0.72 0.28 340)',
    colorAlt: 'oklch(0.68 0.26 295)',
    items: [
      {
        title: 'Post when your audience is awake',
        body: 'Best windows: 6–9 AM, 12–2 PM, and 7–10 PM in your audience\'s timezone. The algorithm rewards early engagement velocity.',
        tag: 'algorithm hack',
      },
      {
        title: 'Consistency > perfection',
        body: 'Posting 4–5x per week beats posting one "perfect" reel per month. The algorithm rewards accounts that keep it moving.',
        tag: 'growth tip',
      },
      {
        title: 'Don\'t post and ghost',
        body: 'Stick around for 30–60 minutes after posting to reply to comments. Early engagement signals tell the algorithm your content is worth pushing.',
        tag: 'engagement',
      },
    ],
  },
  {
    category: '🎣 Hook or Get Cooked',
    color: 'oklch(0.82 0.20 195)',
    colorAlt: 'oklch(0.78 0.22 145)',
    items: [
      {
        title: 'First 1–3 seconds decide everything',
        body: 'Open with a bold statement, a surprising visual, or a question. If you don\'t hook them immediately, they\'re already gone.',
        tag: 'content strategy',
      },
      {
        title: 'Use pattern interrupts',
        body: 'Sudden cuts, text overlays, or unexpected sounds in the first 3 seconds spike watch time. Watch time = algorithm love.',
        tag: 'watch time',
      },
      {
        title: 'End with a loop or cliffhanger',
        body: 'Reels that loop seamlessly or end mid-thought get rewatched. Rewatches are one of the strongest signals you can send.',
        tag: 'rewatch hack',
      },
    ],
  },
  {
    category: '#️⃣ Hashtag Strategy',
    color: 'oklch(0.68 0.26 295)',
    colorAlt: 'oklch(0.72 0.28 340)',
    items: [
      {
        title: 'Mix hashtag sizes',
        body: 'Use a combo: 2–3 large (1M+ posts), 3–4 medium (100K–1M), and 3–4 niche (under 100K). Niche tags get you seen; large tags get you discovered.',
        tag: 'discoverability',
      },
      {
        title: 'Avoid banned or spammy tags',
        body: 'Some hashtags are shadowbanned. If a hashtag\'s "recent" tab is empty, skip it. Use Instagram\'s search to check before posting.',
        tag: 'safety',
      },
      {
        title: 'Hashtags in caption > comments',
        body: 'Putting hashtags in the caption (not the first comment) gives the algorithm more context about your content from the start.',
        tag: 'placement',
      },
    ],
  },
  {
    category: '🎵 Audio & Trends',
    color: 'oklch(0.78 0.22 145)',
    colorAlt: 'oklch(0.82 0.20 195)',
    items: [
      {
        title: 'Ride trends early, not late',
        body: 'Jump on trending audio within the first 24–48 hours of it trending. After 72 hours, the wave is usually over and you\'re just adding noise.',
        tag: 'trend timing',
      },
      {
        title: 'Original audio builds brand',
        body: 'If you create original audio that others use, every reel using it links back to you. It\'s free distribution and brand building.',
        tag: 'brand play',
      },
      {
        title: 'Captions boost accessibility AND reach',
        body: 'Adding captions keeps viewers watching even on mute (most people scroll silently). More watch time = more reach. It\'s a win-win.',
        tag: 'accessibility',
      },
    ],
  },
  {
    category: '📐 Format & Production',
    color: 'oklch(0.72 0.28 340)',
    colorAlt: 'oklch(0.82 0.20 195)',
    items: [
      {
        title: 'Shoot vertical, always',
        body: '9:16 aspect ratio fills the full screen. Horizontal or square content gets cropped and looks lazy. Full-screen = more immersive = more watch time.',
        tag: 'format',
      },
      {
        title: 'Keep it under 30 seconds if possible',
        body: 'Shorter reels have higher completion rates. Completion rate is one of the top signals Instagram uses to decide who sees your content.',
        tag: 'length',
      },
      {
        title: 'High contrast thumbnails stop the scroll',
        body: 'Your cover frame is your billboard. Use bold text, bright colors, or a face with a strong expression. Curiosity gaps work too.',
        tag: 'thumbnail',
      },
    ],
  },
];

export function TipsAndTricks() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="glass-card rounded-3xl p-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, oklch(0.72 0.28 340 / 0.12), transparent 70%)' }} />
        <div className="text-4xl mb-3">💡</div>
        <h1 className="font-display text-3xl font-extrabold mb-2">
          <span className="gradient-text-purple-pink">Tips & Tricks</span>
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
          Actionable strategies to grow your Reels. Straight facts, no fluff. 🎯
        </p>
      </div>

      {/* Tip Categories */}
      {tips.map((category) => (
        <div key={category.category} className="glass-card rounded-3xl overflow-hidden">
          {/* Category header */}
          <div className="px-5 pt-5 pb-3 relative">
            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
              style={{ background: `linear-gradient(90deg, ${category.color}, ${category.colorAlt})` }} />
            <h2 className="font-display text-lg font-extrabold text-foreground">{category.category}</h2>
          </div>

          {/* Tips */}
          <div className="px-5 pb-5 space-y-3">
            {category.items.map((tip, i) => (
              <div key={i} className="rounded-2xl p-4 relative overflow-hidden"
                style={{ background: 'oklch(0.14 0.02 280 / 0.60)', border: `1px solid ${category.color}20` }}>
                {/* Subtle glow blob */}
                <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full blur-2xl pointer-events-none"
                  style={{ background: `${category.color}15` }} />

                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-sm font-bold text-foreground leading-snug">{tip.title}</h3>
                  <span className="flex-shrink-0 text-xs font-bold rounded-full px-2 py-0.5 whitespace-nowrap"
                    style={{
                      background: `${category.color}18`,
                      border: `1px solid ${category.color}35`,
                      color: category.color,
                    }}>
                    {tip.tag}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{tip.body}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Bottom CTA */}
      <div className="glass-card rounded-3xl p-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 100%, oklch(0.68 0.26 295 / 0.10), transparent 70%)' }} />
        <p className="text-2xl mb-2">🏆</p>
        <p className="font-display text-base font-extrabold text-foreground mb-1">
          Now go run the numbers
        </p>
        <p className="text-xs text-muted-foreground">
          Use the calculators to see exactly where your content stands. Knowledge is power. 💪
        </p>
      </div>
    </div>
  );
}
