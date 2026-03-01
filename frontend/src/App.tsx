import { useState } from 'react';
import { EngagementCalculator } from './components/EngagementCalculator';
import { GrowthSimulator } from './components/GrowthSimulator';
import { DecaySimulator } from './components/DecaySimulator';
import { HowItWorks } from './components/HowItWorks';
import { TipsAndTricks } from './components/TipsAndTricks';
import { FlashcardGame } from './components/FlashcardGame';
import { NumberGuesser } from './components/NumberGuesser';
import { TrueOrFalse } from './components/TrueOrFalse';
import { CompareReels } from './components/CompareReels';
import { WhyReelsGoViral } from './components/WhyReelsGoViral';
import { WhatWeLearned } from './components/WhatWeLearned';
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
    value: 'compare',
    emoji: '⚔️',
    label: 'Compare',
    description: '',
    formula: '',
    gradient: 'from-neon-pink to-neon-blue',
    activeGlow: 'glow-pink',
    accentClass: 'gradient-text-pink-blue',
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
  {
    value: 'why-viral',
    emoji: '🔥',
    label: 'Why Go Viral?',
    description: '',
    formula: '',
    gradient: 'from-neon-pink to-neon-purple',
    activeGlow: 'glow-pink',
    accentClass: 'gradient-text-purple-pink',
  },
  {
    value: 'what-learned',
    emoji: '🏆',
    label: 'What We Learned',
    description: '',
    formula: '',
    gradient: 'from-neon-blue to-neon-purple',
    activeGlow: 'glow-blue',
    accentClass: 'gradient-text-blue-purple',
  },
  {
    value: 'game',
    emoji: '🃏',
    label: 'Flashcards',
    description: '',
    formula: '',
    gradient: 'from-neon-purple to-neon-cyan',
    activeGlow: 'glow-purple',
    accentClass: 'gradient-text-cyan-green',
  },
  {
    value: 'number-guesser',
    emoji: '🎯',
    label: 'Guess It',
    description: '',
    formula: '',
    gradient: 'from-neon-cyan to-neon-pink',
    activeGlow: 'glow-cyan',
    accentClass: 'gradient-text-cyan-green',
  },
  {
    value: 'true-or-false',
    emoji: '❓',
    label: 'True/False',
    description: '',
    formula: '',
    gradient: 'from-neon-pink to-neon-green',
    activeGlow: 'glow-pink',
    accentClass: 'gradient-text-purple-pink',
  },
];

const calculatorTabs = tabs.slice(0, 4);
const learnTabs = tabs.slice(4, 8);
const gameTabs = tabs.slice(8);

function getTabStyle(value: string, isActive: boolean) {
  if (!isActive) return {};
  const styles: Record<string, { background: string; boxShadow: string }> = {
    engagement: {
      background: 'linear-gradient(135deg, oklch(0.72 0.30 340), oklch(0.68 0.26 295))',
      boxShadow: '0 4px 20px oklch(0.72 0.30 340 / 0.40)',
    },
    growth: {
      background: 'linear-gradient(135deg, oklch(0.82 0.20 195), oklch(0.78 0.22 145))',
      boxShadow: '0 4px 20px oklch(0.82 0.20 195 / 0.40)',
    },
    decay: {
      background: 'linear-gradient(135deg, oklch(0.68 0.26 295), oklch(0.72 0.30 340))',
      boxShadow: '0 4px 20px oklch(0.68 0.26 295 / 0.40)',
    },
    compare: {
      background: 'linear-gradient(135deg, oklch(0.72 0.30 340), oklch(0.72 0.22 220))',
      boxShadow: '0 4px 20px oklch(0.72 0.30 340 / 0.40)',
    },
    'how-it-works': {
      background: 'linear-gradient(135deg, oklch(0.82 0.20 195), oklch(0.68 0.26 295))',
      boxShadow: '0 4px 20px oklch(0.82 0.20 195 / 0.40)',
    },
    tips: {
      background: 'linear-gradient(135deg, oklch(0.72 0.30 340), oklch(0.82 0.20 195))',
      boxShadow: '0 4px 20px oklch(0.72 0.30 340 / 0.40)',
    },
    'why-viral': {
      background: 'linear-gradient(135deg, oklch(0.72 0.30 340), oklch(0.68 0.26 295))',
      boxShadow: '0 4px 20px oklch(0.72 0.30 340 / 0.40)',
    },
    'what-learned': {
      background: 'linear-gradient(135deg, oklch(0.72 0.22 220), oklch(0.68 0.26 295))',
      boxShadow: '0 4px 20px oklch(0.72 0.22 220 / 0.40)',
    },
    game: {
      background: 'linear-gradient(135deg, oklch(0.68 0.26 295), oklch(0.82 0.20 195))',
      boxShadow: '0 4px 20px oklch(0.68 0.26 295 / 0.40)',
    },
    'number-guesser': {
      background: 'linear-gradient(135deg, oklch(0.82 0.20 195), oklch(0.72 0.30 340))',
      boxShadow: '0 4px 20px oklch(0.82 0.20 195 / 0.40)',
    },
    'true-or-false': {
      background: 'linear-gradient(135deg, oklch(0.72 0.30 340), oklch(0.78 0.22 145))',
      boxShadow: '0 4px 20px oklch(0.72 0.30 340 / 0.40)',
    },
  };
  return styles[value] ?? {};
}

export default function App() {
  const [activeTab, setActiveTab] = useState('engagement');
  const currentTab = tabs.find(t => t.value === activeTab) ?? tabs[0];
  const isCalculatorTab = ['engagement', 'growth', 'decay'].includes(activeTab);

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-x-hidden"
      style={{
        background: 'linear-gradient(135deg, oklch(0.07 0.030 295) 0%, oklch(0.09 0.025 285) 35%, oklch(0.11 0.022 250) 65%, oklch(0.10 0.020 230) 100%)',
      }}
    >
      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-25 blur-3xl"
          style={{ background: 'radial-gradient(circle, oklch(0.68 0.26 295), transparent 70%)' }}
        />
        <div
          className="absolute top-1/3 -right-24 w-80 h-80 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, oklch(0.72 0.30 340), transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, oklch(0.72 0.22 220), transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 right-1/3 w-72 h-72 rounded-full opacity-10 blur-3xl"
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
              className="h-20 w-auto object-contain flex-shrink-0"
              style={{ filter: 'drop-shadow(0 0 14px oklch(0.72 0.30 340 / 0.60))' }}
            />
            <div className="flex flex-col justify-center">
              <p
                className="font-display font-extrabold leading-tight text-base sm:text-lg"
                style={{
                  background: 'linear-gradient(135deg, oklch(0.72 0.30 340), oklch(0.68 0.26 295))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Virality is Mathematics,
              </p>
              <p
                className="font-display font-extrabold leading-tight text-base sm:text-lg"
                style={{
                  background: 'linear-gradient(135deg, oklch(0.72 0.22 220), oklch(0.82 0.20 195))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Not Magic. ✨
              </p>
            </div>
          </div>

          {/* Badge */}
          <div
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold"
            style={{
              background: 'linear-gradient(135deg, oklch(0.72 0.30 340 / 0.15), oklch(0.72 0.22 220 / 0.15))',
              border: '1px solid oklch(0.72 0.30 340 / 0.35)',
            }}
          >
            <Zap className="w-3 h-3" style={{ color: 'oklch(0.72 0.22 220)' }} />
            <span className="gradient-text-pink-blue">no cap</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 relative z-10">

        {/* Hero */}
        <div className="mb-8 text-center relative">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-widest"
            style={{
              background: 'oklch(0.72 0.30 340 / 0.12)',
              border: '1px solid oklch(0.72 0.30 340 / 0.30)',
              color: 'oklch(0.82 0.20 195)',
            }}
          >
            ✨ instagram reel analytics
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold leading-tight mb-3">
            <span className="gradient-text-pink-blue">Understand</span>
            <br />
            <span className="text-white">Viral Math</span>
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
            Do the math. Go viral. <span className="font-bold text-white">No cap.</span> 🔥
          </p>
        </div>

        {/* Calculator Tab Navigation */}
        <div className="mb-3">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 px-1">
            🔢 Calculators
          </p>
          <div className="glass rounded-3xl p-1.5 flex gap-1 flex-wrap">
            {calculatorTabs.map(({ value, emoji, label }) => {
              const isActive = activeTab === value;
              return (
                <button
                  key={value}
                  onClick={() => setActiveTab(value)}
                  className={`
                    flex-1 min-w-[70px] flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-2xl
                    font-display text-sm font-bold transition-all duration-300
                    ${isActive
                      ? 'text-white shadow-lg scale-[1.02]'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                    }
                  `}
                  style={getTabStyle(value, isActive)}
                >
                  <span className="text-base">{emoji}</span>
                  <span className="hidden sm:inline">{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Learn Tab Navigation */}
        <div className="mb-3">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 px-1">
            📚 Learn
          </p>
          <div className="glass rounded-3xl p-1.5 flex gap-1 flex-wrap">
            {learnTabs.map(({ value, emoji, label }) => {
              const isActive = activeTab === value;
              return (
                <button
                  key={value}
                  onClick={() => setActiveTab(value)}
                  className={`
                    flex-1 min-w-[70px] flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-2xl
                    font-display text-sm font-bold transition-all duration-300
                    ${isActive
                      ? 'text-white shadow-lg scale-[1.02]'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                    }
                  `}
                  style={getTabStyle(value, isActive)}
                >
                  <span className="text-base">{emoji}</span>
                  <span className="hidden sm:inline">{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Game Tab Navigation */}
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 px-1">
            🎮 Play
          </p>
          <div className="glass rounded-3xl p-1.5 flex gap-1 flex-wrap">
            {gameTabs.map(({ value, emoji, label }) => {
              const isActive = activeTab === value;
              return (
                <button
                  key={value}
                  onClick={() => setActiveTab(value)}
                  className={`
                    flex-1 min-w-[80px] flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-2xl
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
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-2xl pointer-events-none"
                  style={{
                    background: currentTab.value === 'engagement'
                      ? 'oklch(0.72 0.30 340)'
                      : currentTab.value === 'growth'
                      ? 'oklch(0.82 0.20 195)'
                      : 'oklch(0.68 0.26 295)',
                  }}
                />
                <p className="text-sm text-foreground/80 leading-relaxed mb-3 font-medium">
                  {currentTab.description}
                </p>
                <div
                  className="rounded-2xl px-4 py-2.5 inline-flex items-center gap-2"
                  style={{
                    background: 'oklch(0.08 0.018 285 / 0.80)',
                    border: '1px solid oklch(0.35 0.04 285 / 0.40)',
                  }}
                >
                  <span
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: 'oklch(0.72 0.22 220)' }}
                  >
                    formula
                  </span>
                  <code className="text-xs font-mono text-foreground/90">{currentTab.formula}</code>
                </div>
              </div>

              {/* Calculator Card */}
              <div className="glass-card rounded-3xl p-5 relative overflow-hidden">
                <div
                  className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full opacity-8 blur-3xl pointer-events-none"
                  style={{
                    background: currentTab.value === 'engagement'
                      ? 'oklch(0.72 0.30 340)'
                      : currentTab.value === 'growth'
                      ? 'oklch(0.82 0.20 195)'
                      : 'oklch(0.68 0.26 295)',
                  }}
                />
                {activeTab === 'engagement' && <EngagementCalculator />}
                {activeTab === 'growth' && <GrowthSimulator />}
                {activeTab === 'decay' && <DecaySimulator />}
              </div>
            </>
          ) : activeTab === 'compare' ? (
            <CompareReels />
          ) : activeTab === 'how-it-works' ? (
            <HowItWorks />
          ) : activeTab === 'tips' ? (
            <TipsAndTricks />
          ) : activeTab === 'why-viral' ? (
            <WhyReelsGoViral />
          ) : activeTab === 'what-learned' ? (
            <WhatWeLearned />
          ) : activeTab === 'game' ? (
            <FlashcardGame />
          ) : activeTab === 'number-guesser' ? (
            <NumberGuesser />
          ) : activeTab === 'true-or-false' ? (
            <TrueOrFalse />
          ) : null}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 mt-auto">
        <div className="max-w-2xl mx-auto px-4 py-5 text-center">
          <p className="text-xs text-muted-foreground">
            Built with{' '}
            <Heart
              className="inline w-3 h-3 mx-0.5"
              style={{ color: 'oklch(0.72 0.30 340)', fill: 'oklch(0.72 0.30 340)' }}
            />
            {' '}using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'viral-math-app')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:underline gradient-text-pink-blue"
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
