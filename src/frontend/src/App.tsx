import { Heart, Zap } from "lucide-react";
import { useState } from "react";
import { CompareReels } from "./components/CompareReels";
import { DailyChallenge } from "./components/DailyChallenge";
import { DecaySimulator } from "./components/DecaySimulator";
import { EngagementCalculator } from "./components/EngagementCalculator";
import { FlashcardGame } from "./components/FlashcardGame";
import { GrowthSimulator } from "./components/GrowthSimulator";
import { HomePage } from "./components/HomePage";
import { HowItWorks } from "./components/HowItWorks";
import { NumberGuesser } from "./components/NumberGuesser";
import { TipsAndTricks } from "./components/TipsAndTricks";
import { TrueOrFalse } from "./components/TrueOrFalse";
import { WhatWeLearned } from "./components/WhatWeLearned";
import { WhyReelsGoViral } from "./components/WhyReelsGoViral";

// ─── Tab definitions ──────────────────────────────────────────────────────────
const tabs = [
  {
    value: "engagement",
    emoji: "📊",
    label: "Engagement",
    description:
      "Measures how much your audience actually vibes with your reel.",
    formula: "Rate = (Likes + Comments + Shares) / Views × 100",
    gradient: "from-neon-pink to-neon-purple",
    activeGlow: "glow-pink",
    accentClass: "gradient-text-purple-pink",
    shortDesc: "Likes, comments, shares",
    ocid: "nav.engagement_card",
  },
  {
    value: "growth",
    emoji: "🚀",
    label: "Growth",
    description: "Models how your content blows up through sharing chains.",
    formula: "Reach = Initial × (Shares ^ Rounds)",
    gradient: "from-neon-cyan to-neon-green",
    activeGlow: "glow-cyan",
    accentClass: "gradient-text-cyan-green",
    shortDesc: "Sharing chain model",
    ocid: "nav.growth_card",
  },
  {
    value: "decay",
    emoji: "📉",
    label: "Decay",
    description: "Shows how fast your views drop off as content gets old.",
    formula: "Views = Peak × (Decay Rate ^ Days)",
    gradient: "from-neon-purple to-neon-pink",
    activeGlow: "glow-purple",
    accentClass: "gradient-text-pink-yellow",
    shortDesc: "View drop-off curve",
    ocid: "nav.decay_card",
  },
  {
    value: "compare",
    emoji: "⚔️",
    label: "Compare",
    description: "",
    formula: "",
    gradient: "from-neon-pink to-neon-blue",
    activeGlow: "glow-pink",
    accentClass: "gradient-text-pink-blue",
    shortDesc: "Two reels vs each other",
    ocid: "nav.compare_card",
  },
  {
    value: "how-it-works",
    emoji: "🧠",
    label: "How It Works",
    description: "",
    formula: "",
    gradient: "from-neon-cyan to-neon-purple",
    activeGlow: "glow-cyan",
    accentClass: "gradient-text-cyan-green",
    shortDesc: "Viral math explained",
    ocid: "nav.how_it_works_card",
  },
  {
    value: "tips",
    emoji: "💡",
    label: "Tips & Tricks",
    description: "",
    formula: "",
    gradient: "from-neon-pink to-neon-cyan",
    activeGlow: "glow-pink",
    accentClass: "gradient-text-purple-pink",
    shortDesc: "Boost your reach",
    ocid: "nav.tips_card",
  },
  {
    value: "why-viral",
    emoji: "🔥",
    label: "Why Go Viral?",
    description: "",
    formula: "",
    gradient: "from-neon-pink to-neon-purple",
    activeGlow: "glow-pink",
    accentClass: "gradient-text-purple-pink",
    shortDesc: "The viral formula",
    ocid: "nav.why_viral_card",
  },
  {
    value: "what-learned",
    emoji: "🏆",
    label: "What We Learned",
    description: "",
    formula: "",
    gradient: "from-neon-blue to-neon-purple",
    activeGlow: "glow-blue",
    accentClass: "gradient-text-blue-purple",
    shortDesc: "Key takeaways",
    ocid: "nav.what_learned_card",
  },
  {
    value: "game",
    emoji: "🃏",
    label: "Flashcards",
    description: "",
    formula: "",
    gradient: "from-neon-purple to-neon-cyan",
    activeGlow: "glow-purple",
    accentClass: "gradient-text-cyan-green",
    shortDesc: "Test your knowledge",
    ocid: "nav.flashcards_card",
  },
  {
    value: "number-guesser",
    emoji: "🎯",
    label: "Guess It",
    description: "",
    formula: "",
    gradient: "from-neon-cyan to-neon-pink",
    activeGlow: "glow-cyan",
    accentClass: "gradient-text-cyan-green",
    shortDesc: "Number challenge",
    ocid: "nav.guess_it_card",
  },
  {
    value: "true-or-false",
    emoji: "❓",
    label: "True/False",
    description: "",
    formula: "",
    gradient: "from-neon-pink to-neon-green",
    activeGlow: "glow-pink",
    accentClass: "gradient-text-purple-pink",
    shortDesc: "Quick fire quiz",
    ocid: "nav.true_false_card",
  },
  {
    value: "daily",
    emoji: "📅",
    label: "Daily",
    description: "",
    formula: "",
    gradient: "from-neon-pink to-neon-blue",
    activeGlow: "glow-pink",
    accentClass: "gradient-text-pink-blue",
    shortDesc: "Today's challenge",
    ocid: "nav.daily_card",
  },
];

const calculatorTabs = tabs.slice(0, 4);
const learnTabs = tabs.slice(4, 8);
const gameTabs = tabs.slice(8);

// ─── Active tab gradient styles ───────────────────────────────────────────────
function getActiveStyle(value: string): {
  background: string;
  boxShadow: string;
} {
  const styles: Record<string, { background: string; boxShadow: string }> = {
    engagement: {
      background:
        "linear-gradient(135deg, oklch(0.72 0.30 340), oklch(0.68 0.26 295))",
      boxShadow: "0 4px 20px oklch(0.72 0.30 340 / 0.45)",
    },
    growth: {
      background:
        "linear-gradient(135deg, oklch(0.82 0.20 195), oklch(0.78 0.22 145))",
      boxShadow: "0 4px 20px oklch(0.82 0.20 195 / 0.45)",
    },
    decay: {
      background:
        "linear-gradient(135deg, oklch(0.68 0.26 295), oklch(0.72 0.30 340))",
      boxShadow: "0 4px 20px oklch(0.68 0.26 295 / 0.45)",
    },
    compare: {
      background:
        "linear-gradient(135deg, oklch(0.72 0.30 340), oklch(0.72 0.22 220))",
      boxShadow: "0 4px 20px oklch(0.72 0.30 340 / 0.45)",
    },
    "how-it-works": {
      background:
        "linear-gradient(135deg, oklch(0.82 0.20 195), oklch(0.68 0.26 295))",
      boxShadow: "0 4px 20px oklch(0.82 0.20 195 / 0.45)",
    },
    tips: {
      background:
        "linear-gradient(135deg, oklch(0.72 0.30 340), oklch(0.82 0.20 195))",
      boxShadow: "0 4px 20px oklch(0.72 0.30 340 / 0.45)",
    },
    "why-viral": {
      background:
        "linear-gradient(135deg, oklch(0.72 0.30 340), oklch(0.68 0.26 295))",
      boxShadow: "0 4px 20px oklch(0.72 0.30 340 / 0.45)",
    },
    "what-learned": {
      background:
        "linear-gradient(135deg, oklch(0.72 0.22 220), oklch(0.68 0.26 295))",
      boxShadow: "0 4px 20px oklch(0.72 0.22 220 / 0.45)",
    },
    game: {
      background:
        "linear-gradient(135deg, oklch(0.68 0.26 295), oklch(0.82 0.20 195))",
      boxShadow: "0 4px 20px oklch(0.68 0.26 295 / 0.45)",
    },
    "number-guesser": {
      background:
        "linear-gradient(135deg, oklch(0.82 0.20 195), oklch(0.72 0.30 340))",
      boxShadow: "0 4px 20px oklch(0.82 0.20 195 / 0.45)",
    },
    "true-or-false": {
      background:
        "linear-gradient(135deg, oklch(0.72 0.30 340), oklch(0.78 0.22 145))",
      boxShadow: "0 4px 20px oklch(0.72 0.30 340 / 0.45)",
    },
    daily: {
      background:
        "linear-gradient(135deg, oklch(0.72 0.30 340), oklch(0.72 0.22 220))",
      boxShadow: "0 4px 20px oklch(0.72 0.30 340 / 0.45)",
    },
  };
  return styles[value] ?? { background: "transparent", boxShadow: "none" };
}

// ─── Nav Card Component ───────────────────────────────────────────────────────
interface NavCardProps {
  value: string;
  emoji: string;
  label: string;
  shortDesc: string;
  ocid: string;
  isActive: boolean;
  onClick: () => void;
}

function NavCard({
  value,
  emoji,
  label,
  shortDesc,
  ocid,
  isActive,
  onClick,
}: NavCardProps) {
  return (
    <button
      type="button"
      data-ocid={ocid}
      onClick={onClick}
      className={`
        relative flex flex-col items-start p-4 rounded-3xl glass-card
        min-h-[80px] w-full text-left overflow-hidden
        transition-all duration-300
        ${isActive ? "scale-[1.02]" : "hover:scale-[1.01] hover:bg-white/5"}
      `}
      style={
        isActive
          ? {
              ...getActiveStyle(value),
              border: "1px solid transparent",
            }
          : {
              border: "1px solid oklch(0.3 0.03 285 / 0.20)",
            }
      }
    >
      {/* Active glow streak */}
      {isActive && (
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top left, oklch(1 0 0 / 0.3), transparent 60%)",
          }}
        />
      )}
      <span className="text-2xl mb-2 relative">{emoji}</span>
      <span
        className={`font-display text-lg font-bold leading-tight relative ${isActive ? "text-white" : "text-foreground"}`}
      >
        {label}
      </span>
      <span
        className={`text-xs leading-tight mt-0.5 relative ${isActive ? "text-white/75" : "text-muted-foreground"}`}
      >
        {shortDesc}
      </span>
    </button>
  );
}

// ─── Nav Section Component ────────────────────────────────────────────────────
interface NavSectionProps {
  label: string;
  cards: typeof tabs;
  activeTab: string;
  onSelect: (value: string) => void;
}

function NavSection({ label, cards, activeTab, onSelect }: NavSectionProps) {
  return (
    <div className="mb-6">
      <p className="text-lg font-bold text-foreground mb-3 px-1">{label}</p>
      <div className="grid grid-cols-2 gap-3">
        {cards.map(({ value, emoji, label: cardLabel, shortDesc, ocid }) => (
          <NavCard
            key={value}
            value={value}
            emoji={emoji}
            label={cardLabel}
            shortDesc={shortDesc}
            ocid={ocid}
            isActive={activeTab === value}
            onClick={() => onSelect(value)}
          />
        ))}
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [showHome, setShowHome] = useState(true);
  const [activeTab, setActiveTab] = useState("engagement");

  const currentTab = tabs.find((t) => t.value === activeTab) ?? tabs[0];
  const isCalculatorTab = ["engagement", "growth", "decay"].includes(activeTab);

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-x-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.07 0.030 295) 0%, oklch(0.09 0.025 285) 35%, oklch(0.11 0.022 250) 65%, oklch(0.10 0.020 230) 100%)",
      }}
    >
      {/* Ambient blobs */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(0.68 0.26 295), transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/3 -right-24 w-80 h-80 rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.30 340), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-15 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.22 220), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/3 w-72 h-72 rounded-full opacity-10 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(0.82 0.20 195), transparent 70%)",
          }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-20 glass border-b border-white/5">
        <div className="max-w-2xl mx-auto px-4 py-2 flex items-center justify-between">
          {/* Logo + Tagline */}
          <button
            type="button"
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setShowHome(true)}
            aria-label="Go to home"
          >
            <img
              src="/assets/image.png"
              alt="Likes to Logic"
              className="h-20 w-auto object-contain flex-shrink-0"
              style={{
                filter: "drop-shadow(0 0 14px oklch(0.72 0.30 340 / 0.60))",
              }}
            />
            <div className="flex flex-col justify-center">
              <p
                className="font-display font-extrabold leading-tight text-base sm:text-lg"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.30 340), oklch(0.68 0.26 295))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Virality is Mathematics,
              </p>
              <p
                className="font-display font-extrabold leading-tight text-base sm:text-lg"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.22 220), oklch(0.82 0.20 195))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Not Magic. ✨
              </p>
            </div>
          </button>

          {/* Badge */}
          <div
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.72 0.30 340 / 0.15), oklch(0.72 0.22 220 / 0.15))",
              border: "1px solid oklch(0.72 0.30 340 / 0.35)",
            }}
          >
            <Zap
              className="w-3 h-3"
              style={{ color: "oklch(0.72 0.22 220)" }}
            />
            <span className="gradient-text-pink-blue">no cap</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 relative z-10">
        {showHome ? (
          /* ── Home Screen ── */
          <HomePage onStart={() => setShowHome(false)} />
        ) : (
          /* ── App Screen ── */
          <>
            {/* Navigation Cards */}
            <NavSection
              label="🔢 Calculators"
              cards={calculatorTabs}
              activeTab={activeTab}
              onSelect={setActiveTab}
            />
            <NavSection
              label="📚 Learn"
              cards={learnTabs}
              activeTab={activeTab}
              onSelect={setActiveTab}
            />
            <NavSection
              label="🎮 Play"
              cards={gameTabs}
              activeTab={activeTab}
              onSelect={setActiveTab}
            />

            {/* Tab Content */}
            <div key={activeTab} className="animate-fade-in mt-2">
              {isCalculatorTab ? (
                <>
                  {/* Description Card */}
                  {currentTab.description && (
                    <div className="glass-card rounded-3xl p-5 mb-4 relative overflow-hidden">
                      <div
                        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-2xl pointer-events-none"
                        style={{
                          background:
                            currentTab.value === "engagement"
                              ? "oklch(0.72 0.30 340)"
                              : currentTab.value === "growth"
                                ? "oklch(0.82 0.20 195)"
                                : "oklch(0.68 0.26 295)",
                        }}
                      />
                      <p className="text-sm text-foreground/80 leading-relaxed mb-3 font-medium">
                        {currentTab.description}
                      </p>
                      {currentTab.formula && (
                        <div
                          className="rounded-2xl px-4 py-2.5 inline-flex items-center gap-2"
                          style={{
                            background: "oklch(0.08 0.018 285 / 0.80)",
                            border: "1px solid oklch(0.35 0.04 285 / 0.40)",
                          }}
                        >
                          <span
                            className="text-xs font-bold uppercase tracking-widest"
                            style={{ color: "oklch(0.72 0.22 220)" }}
                          >
                            formula
                          </span>
                          <code className="text-xs font-mono text-foreground/90">
                            {currentTab.formula}
                          </code>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Calculator Card */}
                  <div className="glass-card rounded-3xl p-5 relative overflow-hidden">
                    <div
                      className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full opacity-8 blur-3xl pointer-events-none"
                      style={{
                        background:
                          currentTab.value === "engagement"
                            ? "oklch(0.72 0.30 340)"
                            : currentTab.value === "growth"
                              ? "oklch(0.82 0.20 195)"
                              : "oklch(0.68 0.26 295)",
                      }}
                    />
                    {activeTab === "engagement" && <EngagementCalculator />}
                    {activeTab === "growth" && <GrowthSimulator />}
                    {activeTab === "decay" && <DecaySimulator />}
                  </div>
                </>
              ) : activeTab === "compare" ? (
                <CompareReels />
              ) : activeTab === "how-it-works" ? (
                <HowItWorks />
              ) : activeTab === "tips" ? (
                <TipsAndTricks />
              ) : activeTab === "why-viral" ? (
                <WhyReelsGoViral />
              ) : activeTab === "what-learned" ? (
                <WhatWeLearned />
              ) : activeTab === "game" ? (
                <FlashcardGame />
              ) : activeTab === "number-guesser" ? (
                <NumberGuesser />
              ) : activeTab === "true-or-false" ? (
                <TrueOrFalse />
              ) : activeTab === "daily" ? (
                <DailyChallenge />
              ) : null}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 mt-auto">
        <div className="max-w-2xl mx-auto px-4 py-5 text-center">
          <p className="text-xs text-muted-foreground">
            Built with{" "}
            <Heart
              className="inline w-3 h-3 mx-0.5"
              style={{
                color: "oklch(0.72 0.30 340)",
                fill: "oklch(0.72 0.30 340)",
              }}
            />{" "}
            using{" "}
            <a
              href={`https://caffeine.ai/?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "likes-to-logic")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:underline gradient-text-pink-blue"
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-xs text-muted-foreground/40 mt-1">
            © {new Date().getFullYear()} Likes to Logic — For educational
            purposes only
          </p>
        </div>
      </footer>
    </div>
  );
}
