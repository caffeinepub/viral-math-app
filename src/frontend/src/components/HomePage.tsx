import { ArrowRight } from "lucide-react";
import { type Variants, motion } from "motion/react";

interface HomePageProps {
  onStart: () => void;
}

const previewCards = [
  {
    emoji: "📊",
    title: "Calculator",
    description: "Engagement, Growth, Decay",
    ocid: "home.calculator_card",
    gradient: "from-neon-pink to-neon-purple",
    glow: "oklch(0.72 0.30 340 / 0.25)",
    border: "oklch(0.72 0.30 340 / 0.35)",
  },
  {
    emoji: "🎮",
    title: "Games",
    description: "Flashcards, Guess It, True/False",
    ocid: "home.games_card",
    gradient: "from-neon-blue to-neon-cyan",
    glow: "oklch(0.72 0.22 220 / 0.25)",
    border: "oklch(0.72 0.22 220 / 0.35)",
  },
  {
    emoji: "📚",
    title: "Learn",
    description: "Why reels go viral",
    ocid: "home.learn_card",
    gradient: "from-neon-purple to-neon-blue",
    glow: "oklch(0.68 0.26 295 / 0.25)",
    border: "oklch(0.68 0.26 295 / 0.35)",
  },
  {
    emoji: "🏆",
    title: "Challenge",
    description: "Daily challenge + Compare",
    ocid: "home.challenge_card",
    gradient: "from-neon-cyan to-neon-green",
    glow: "oklch(0.82 0.20 195 / 0.25)",
    border: "oklch(0.82 0.20 195 / 0.35)",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

export function HomePage({ onStart }: HomePageProps) {
  return (
    <motion.div
      className="flex flex-col items-center text-center px-4 pt-4 pb-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Logo */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className="relative inline-block">
          {/* Glow ring */}
          <div
            className="absolute inset-0 rounded-full blur-2xl scale-125 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, oklch(0.72 0.30 340 / 0.45), oklch(0.68 0.26 295 / 0.25) 60%, transparent 80%)",
            }}
          />
          <img
            src="/assets/image.png"
            alt="Viral Math App Logo"
            className="relative h-32 w-auto object-contain"
            style={{
              filter:
                "drop-shadow(0 0 24px oklch(0.72 0.30 340 / 0.80)) drop-shadow(0 0 48px oklch(0.68 0.26 295 / 0.50))",
            }}
          />
        </div>
      </motion.div>

      {/* App name */}
      <motion.h1
        variants={itemVariants}
        className="font-display text-5xl sm:text-6xl font-extrabold leading-tight mb-3"
      >
        <span
          style={{
            background:
              "linear-gradient(135deg, oklch(0.72 0.30 340), oklch(0.68 0.26 295), oklch(0.72 0.22 220))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Viral Math App
        </span>
      </motion.h1>

      {/* Tagline */}
      <motion.p
        variants={itemVariants}
        className="text-xl sm:text-2xl font-bold mb-2"
        style={{ color: "oklch(0.88 0.08 280)" }}
      >
        Learn Math in 60 Seconds!
      </motion.p>

      {/* Sub-tagline */}
      <motion.p
        variants={itemVariants}
        className="text-sm sm:text-base text-muted-foreground mb-8 max-w-xs"
      >
        Understand virality through mathematics.{" "}
        <span className="font-bold text-white">No cap.</span>
      </motion.p>

      {/* Preview stat cards */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 gap-3 w-full max-w-sm mb-8"
      >
        {previewCards.map((card) => (
          <div
            key={card.ocid}
            data-ocid={card.ocid}
            className="glass-card rounded-2xl p-4 flex flex-col items-center text-center relative overflow-hidden"
            style={{
              border: `1px solid ${card.border}`,
              boxShadow: `0 4px 20px ${card.glow}`,
            }}
          >
            {/* Subtle corner glow */}
            <div
              className="absolute top-0 right-0 w-16 h-16 rounded-full blur-xl opacity-30 pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${card.glow.replace("0.25", "0.6")}, transparent 70%)`,
              }}
            />
            <span className="text-2xl mb-2 relative">{card.emoji}</span>
            <span
              className="font-display text-sm font-extrabold mb-1 relative"
              style={{ color: "oklch(0.95 0.01 280)" }}
            >
              {card.title}
            </span>
            <span className="text-xs text-muted-foreground leading-tight relative">
              {card.description}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Start CTA */}
      <motion.button
        type="button"
        data-ocid="home.start_button"
        variants={itemVariants}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={onStart}
        className="w-full max-w-sm flex items-center justify-center gap-3 py-4 px-8 rounded-3xl font-display text-xl font-extrabold text-white transition-all duration-300"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.72 0.30 340), oklch(0.68 0.26 295) 50%, oklch(0.72 0.22 220))",
          boxShadow:
            "0 6px 32px oklch(0.72 0.30 340 / 0.55), 0 2px 8px oklch(0.68 0.26 295 / 0.35)",
        }}
      >
        <span>Start Playing</span>
        <ArrowRight className="w-5 h-5" />
      </motion.button>

      {/* Subtle footnote */}
      <motion.p
        variants={itemVariants}
        className="mt-4 text-xs text-muted-foreground"
      >
        Free forever · Educational · No sign-up needed
      </motion.p>
    </motion.div>
  );
}
