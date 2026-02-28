import { useState } from 'react';
import { EngagementCalculator } from './components/EngagementCalculator';
import { GrowthSimulator } from './components/GrowthSimulator';
import { DecaySimulator } from './components/DecaySimulator';
import { HowItWorks } from './components/HowItWorks';
import { TipsAndTricks } from './components/TipsAndTricks';
import { Heart, Zap } from 'lucide-react';

const tabs = [
  {
    value: 'engagement',
    emoji: '📊',
    label: 'Engagement',
    description: 'Measures how much your audience actually vibes with your reel.',
    formula: 'Rate = (Likes + Comments + Shares) / Views × 100',
    gradient: 'from-neon-pink to-neon-purple',
    activeGlow: 'glow-pink',
    accentClass: 'gradient-text-purple-pink',
  },
  {
    value: 'growth',
    emoji: '🚀',
    label: 'Growth',
    description: 'Models how your content blows up through sharing chains.',
    formula: 'Reach = Initial × (Shares ^ Rounds)',
    gradient: 'from-neon-cyan to-neon-green',
    activeGlow: 'glow-cyan',
    accentClass: 'gradient-text-cyan-green',
  },
  {
    value: 'decay',
    emoji: '📉',
    label: 'Decay',
    description: 'Shows how fast your views drop off as content gets old.',
    formula: 'Views = Peak × (Decay Rate ^ Days)',
    gradient: 'from-neon-purple to-neon-pink',
    activeGlow: 'glow-purple',
    accentClass: 'gradient-text-pink-yellow',
  },
  {
    value: 'how-it-works',
    emoji: '🧠',
    label: 'How It Works',
    description: '',
    formula: '',
    gradient: 'from-neon-cyan to-neon-purple',
    activeGlow: 'glow-cyan',
    accentClass: 'gradient-text-cyan-green',
  },
  {
    value: 'tips',
    emoji: '💡',
    label: 'Tips & Tricks',
    description: '',
    formula: '',
    gradient: 'from-neon-pink to-neon-cyan',
    activeGlow: 'glow-pink',
    accentClass: 'gradient-text-purple-pink',
  },
];

const calculatorTabs = tabs.slice(0, 3);
const pageTabs = tabs.slice(3);

function getTabStyle(value: string, isActive: boolean) {
  if (!isActive) return {};
  const styles: Record<string, { background: string; boxShadow: string }> = {
    engagement: {
      background: 'linear-gradient(135deg, oklch(0.72 0.28 340), oklch(0.68 0.26 295))',
      boxShadow: '0 4px 20px oklch(0.72 0.28 340 / 0.40)',
    },
    growth: {
      background: 'linear-gradient(135deg, oklch(0.82 0.20 195), oklch(0.78 0.22 145))',
      boxShadow: '0 4px 20px oklch(0.82 0.20 195 / 0.40)',
    },
    decay: {
      background: 'linear-gradient(135deg, oklch(0.68 0.26 295), oklch(0.72 0.28 340))',
      boxShadow: '0 4px 20px oklch(0.68 0.26 295 / 0.40)',
    },
    'how-it-works': {
      background: 'linear-gradient(135deg, oklch(0.82 0.20 195), oklch(0.68 0.26 295))',
      boxShadow: '0 4px 20px oklch(0.82 0.20 195 / 0.40)',
    },
    tips: {
      background: 'linear-gradient(135deg, oklch(0.72 0.28 340), oklch(0.82 0.20 195))',
      boxShadow: '0 4px 20px oklch(0.72 0.28 340 / 0.40)',
    },
  };
  return styles[value] ?? {};
}

export default function App() {
  const [activeTab, setActiveTab] = useState('engagement');
  const currentTab = tabs.find(t => t.value === activeTab) ?? tabs[0];
  const isCalculatorTab = ['engagement', 'growth', 'decay'].includes(activeTab);

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-x-hidden">
      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, oklch(0.68 0.26 295), transparent 70%)' }}
        />
        <div
          className="absolute top-1/3 -right-24 w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, oklch(0.72 0.28 340), transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, oklch(0.82 0.20 195), transparent 70%)' }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-20 glass border-b border-white/5">
        <div className="max-w-2xl mx-auto px-4 py-2 flex items-center justify-between">
          {/* Logo + Tagline */}
          <div className="flex items-center gap-3">
            <img
              src="/assets/generated/logo.dim_512x512.png"
              alt="Viral Math App"
              className="h-24 w-auto object-contain flex-shrink-0"
              style={{ filter: 'drop-shadow(0 0 12px oklch(0.72 0.28 340 / 0.55))' }}
            />
            <div className="flex flex-col justify-center">
              <p
                className="font-display font-bold leading-tight text-sm sm:text-base"
                style={{
                  background: 'linear-gradient(135deg, oklch(0.88 0.12 295), oklch(0.92 0.10 340))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Understand Virality
              </p>
              <p
                className="font-display font-bold leading-tight text-sm sm:text-base"
                style={{
                  background: 'linear-gradient(135deg, oklch(0.82 0.20 195), oklch(0.78 0.22 145))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Through Mathematics
              </p>
            </div>
          </div>

          {/* Badge */}
          <div
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold"
            style={{
              background: 'linear-gradient(135deg, oklch(0.68 0.26 295 / 0.20), oklch(0.72 0.28 340 / 0.20))',
              border: '1px solid oklch(0.68 0.26 295 / 0.35)',
            }}
          >
            <Zap className="w-3 h-3" style={{ color: 'oklch(0.82 0.20 195)' }} />
            <span className="gradient-text-purple-pink">no cap</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 relative z-10">

        {/* Hero */}
        <div className="mb-8 text-center relative">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-widest"
            style={{ background: 'oklch(0.68 0.26 295 / 0.15)', border: '1px solid oklch(0.68 0.26 295 / 0.30)', color: 'oklch(0.82 0.20 195)' }}>
            ✨ instagram reel analytics
          </div>
          <h2 className="font-display text-4xl font-extrabold leading-tight mb-3">
            <span className="gradient-text-purple-pink">Understand</span>
            <br />
            <span className="text-foreground">Viral Math</span>
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
            Do the math. Go viral. <span className="font-bold text-foreground">No cap.</span> 🔥
          </p>
        </div>

        {/* Calculator Tab Navigation */}
        <div className="mb-3">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 px-1">
            🔢 Calculators
          </p>
          <div className="glass rounded-3xl p-1.5 flex gap-1">
            {calculatorTabs.map(({ value, emoji, label }) => {
              const isActive = activeTab === value;
              return (
                <button
                  key={value}
                  onClick={() => setActiveTab(value)}
                  className={`
                    flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-2xl
                    font-display text-sm font-bold transition-all duration-300
                    ${isActive
                      ? 'text-white shadow-lg scale-[1.02]'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                    }
                  `}
                  style={getTabStyle(value, isActive)}
                >
                  <span className="text-base">{emoji}</span>
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Page Tab Navigation */}
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 px-1">
            📚 Learn
          </p>
          <div className="glass rounded-3xl p-1.5 flex gap-1">
            {pageTabs.map(({ value, emoji, label }) => {
              const isActive = activeTab === value;
              return (
                <button
                  key={value}
                  onClick={() => setActiveTab(value)}
                  className={`
                    flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl
                    font-display text-sm font-bold transition-all duration-300
                    ${isActive
                      ? 'text-white shadow-lg scale-[1.02]'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                    }
                  `}
                  style={getTabStyle(value, isActive)}
                >
                  <span className="text-base">{emoji}</span>
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div key={activeTab} className="animate-fade-in">
          {isCalculatorTab ? (
            <>
              {/* Description Card */}
              <div className="glass-card rounded-3xl p-5 mb-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-2xl pointer-events-none"
                  style={{
                    background: currentTab.value === 'engagement'
                      ? 'oklch(0.72 0.28 340)'
                      : currentTab.value === 'growth'
                      ? 'oklch(0.82 0.20 195)'
                      : 'oklch(0.68 0.26 295)'
                  }}
                />
                <p className="text-sm text-foreground/80 leading-relaxed mb-3 font-medium">
                  {currentTab.description}
                </p>
                <div className="rounded-2xl px-4 py-2.5 inline-flex items-center gap-2"
                  style={{ background: 'oklch(0.10 0.015 280 / 0.80)', border: '1px solid oklch(0.40 0.04 280 / 0.40)' }}>
                  <span className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: 'oklch(0.68 0.26 295)' }}>
                    formula
                  </span>
                  <code className="text-xs font-mono text-foreground/90">{currentTab.formula}</code>
                </div>
              </div>

              {/* Calculator Card */}
              <div className="glass-card rounded-3xl p-5 relative overflow-hidden">
                <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full opacity-8 blur-3xl pointer-events-none"
                  style={{
                    background: currentTab.value === 'engagement'
                      ? 'oklch(0.72 0.28 340)'
                      : currentTab.value === 'growth'
                      ? 'oklch(0.82 0.20 195)'
                      : 'oklch(0.68 0.26 295)'
                  }}
                />
                {activeTab === 'engagement' && <EngagementCalculator />}
                {activeTab === 'growth' && <GrowthSimulator />}
                {activeTab === 'decay' && <DecaySimulator />}
              </div>
            </>
          ) : activeTab === 'how-it-works' ? (
            <HowItWorks />
          ) : (
            <TipsAndTricks />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 mt-auto">
        <div className="max-w-2xl mx-auto px-4 py-5 text-center">
          <p className="text-xs text-muted-foreground">
            Built with{' '}
            <Heart className="inline w-3 h-3 mx-0.5" style={{ color: 'oklch(0.72 0.28 340)', fill: 'oklch(0.72 0.28 340)' }} />
            {' '}using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'viral-math-app')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:underline gradient-text-purple-pink"
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-xs text-muted-foreground/40 mt-1">
            © {new Date().getFullYear()} Viral Math — For educational purposes only
          </p>
        </div>
      </footer>
    </div>
  );
}
