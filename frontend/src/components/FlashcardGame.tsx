import { useState } from 'react';
import { RotateCcw, ChevronRight, ChevronLeft, Shuffle } from 'lucide-react';

interface Flashcard {
  id: number;
  topic: 'Engagement Rate' | 'Viral Growth' | 'View Decay';
  topicEmoji: string;
  question: string;
  answer: string;
  explanation: string;
  gradient: string;
  glowColor: string;
}

const flashcards: Flashcard[] = [
  // Engagement Rate
  {
    id: 1,
    topic: 'Engagement Rate',
    topicEmoji: '📊',
    question: 'A reel gets 10,000 views, 800 likes, 120 comments, and 80 shares. What is the engagement rate?',
    answer: '10%',
    explanation: 'ER = (800 + 120 + 80) / 10,000 × 100 = 1,000 / 10,000 × 100 = 10%. That\'s absolutely slay! 🔥',
    gradient: 'linear-gradient(135deg, oklch(0.72 0.28 340), oklch(0.68 0.26 295))',
    glowColor: 'oklch(0.72 0.28 340 / 0.40)',
  },
  {
    id: 2,
    topic: 'Engagement Rate',
    topicEmoji: '📊',
    question: 'What is the formula for Engagement Rate on Instagram Reels?',
    answer: 'ER = (Likes + Comments + Shares) / Views × 100',
    explanation: 'This formula measures the percentage of viewers who actually interacted with your content. Higher = more viral potential! 💅',
    gradient: 'linear-gradient(135deg, oklch(0.68 0.26 295), oklch(0.72 0.28 340))',
    glowColor: 'oklch(0.68 0.26 295 / 0.40)',
  },
  {
    id: 3,
    topic: 'Engagement Rate',
    topicEmoji: '📊',
    question: 'A reel has 5% engagement rate. Is this mid, it\'s giving, or absolutely slay?',
    answer: 'It\'s giving! 🌟',
    explanation: 'Below 3% = mid. 3–7% = it\'s giving. Above 7% = absolutely slay. 5% is solid — the algorithm will notice you! 👀',
    gradient: 'linear-gradient(135deg, oklch(0.72 0.28 340), oklch(0.68 0.26 295))',
    glowColor: 'oklch(0.72 0.28 340 / 0.40)',
  },
  {
    id: 4,
    topic: 'Engagement Rate',
    topicEmoji: '📊',
    question: 'Your reel has 50,000 views but only 200 likes, 30 comments, and 20 shares. What\'s the ER and vibe?',
    answer: 'ER = 0.5% — mid 😬',
    explanation: '(200 + 30 + 20) / 50,000 × 100 = 0.5%. Low engagement despite high views means the algorithm won\'t push it further. Time to rethink your hook! 🎣',
    gradient: 'linear-gradient(135deg, oklch(0.68 0.26 295), oklch(0.72 0.28 340))',
    glowColor: 'oklch(0.68 0.26 295 / 0.40)',
  },
  {
    id: 5,
    topic: 'Engagement Rate',
    topicEmoji: '📊',
    question: 'Why does engagement rate matter more than raw view count for going viral?',
    answer: 'The algorithm uses ER to decide who else to show your content to.',
    explanation: 'Instagram\'s algorithm prioritizes content with high engagement signals. A reel with 1K views and 10% ER can outperform one with 100K views and 0.5% ER in terms of future reach! 🚀',
    gradient: 'linear-gradient(135deg, oklch(0.72 0.28 340), oklch(0.68 0.26 295))',
    glowColor: 'oklch(0.72 0.28 340 / 0.40)',
  },
  // Viral Growth
  {
    id: 6,
    topic: 'Viral Growth',
    topicEmoji: '🚀',
    question: 'A reel starts with 100 initial viewers. Each person shares it to 3 others. After 4 rounds, what\'s the total reach?',
    answer: '8,100 people',
    explanation: 'Reach = 100 × (3^4) = 100 × 81 = 8,100. Exponential growth is no joke — that\'s the power of sharing chains! 🔗',
    gradient: 'linear-gradient(135deg, oklch(0.82 0.20 195), oklch(0.78 0.22 145))',
    glowColor: 'oklch(0.82 0.20 195 / 0.40)',
  },
  {
    id: 7,
    topic: 'Viral Growth',
    topicEmoji: '🚀',
    question: 'What is the Viral Growth formula for Instagram Reels?',
    answer: 'Reach = Initial Viewers × (Shares per Person ^ Rounds)',
    explanation: 'This exponential model shows how content spreads through sharing chains. Even a small increase in shares per person dramatically multiplies total reach! 📈',
    gradient: 'linear-gradient(135deg, oklch(0.78 0.22 145), oklch(0.82 0.20 195))',
    glowColor: 'oklch(0.78 0.22 145 / 0.40)',
  },
  {
    id: 8,
    topic: 'Viral Growth',
    topicEmoji: '🚀',
    question: 'Content A: 500 initial viewers, 2 shares/person, 5 rounds. Content B: 100 initial viewers, 4 shares/person, 5 rounds. Which reaches more people?',
    answer: 'Content B reaches 102,400 vs Content A\'s 16,000!',
    explanation: 'A: 500 × 2^5 = 16,000. B: 100 × 4^5 = 102,400. The shares-per-person multiplier is way more powerful than initial audience size. Quality > quantity! 💎',
    gradient: 'linear-gradient(135deg, oklch(0.82 0.20 195), oklch(0.78 0.22 145))',
    glowColor: 'oklch(0.82 0.20 195 / 0.40)',
  },
  {
    id: 9,
    topic: 'Viral Growth',
    topicEmoji: '🚀',
    question: 'If shares per person drops from 3 to 2, how does that affect reach after 6 rounds with 1,000 initial viewers?',
    answer: 'Drops from 729,000 to 64,000 — a 91% decrease!',
    explanation: '1,000 × 3^6 = 729,000 vs 1,000 × 2^6 = 64,000. One less share per person = massive difference. This is why shareable content is everything! 🎯',
    gradient: 'linear-gradient(135deg, oklch(0.78 0.22 145), oklch(0.82 0.20 195))',
    glowColor: 'oklch(0.78 0.22 145 / 0.40)',
  },
  // View Decay
  {
    id: 10,
    topic: 'View Decay',
    topicEmoji: '📉',
    question: 'A reel peaks at 50,000 views. With a decay rate of 0.7 per day, how many views on day 3?',
    answer: '17,150 views',
    explanation: 'Views = 50,000 × (0.7^3) = 50,000 × 0.343 = 17,150. Content loses momentum fast — that\'s why posting consistently is the move! 📅',
    gradient: 'linear-gradient(135deg, oklch(0.68 0.26 295), oklch(0.72 0.28 340))',
    glowColor: 'oklch(0.68 0.26 295 / 0.40)',
  },
  {
    id: 11,
    topic: 'View Decay',
    topicEmoji: '📉',
    question: 'What is the View Decay formula?',
    answer: 'Views(t) = Peak Views × (Decay Rate ^ Days)',
    explanation: 'Decay Rate is between 0 and 1. A rate of 0.8 means you retain 80% of views each day. Lower decay rate = faster drop-off. Evergreen content fights decay! 🌿',
    gradient: 'linear-gradient(135deg, oklch(0.72 0.28 340), oklch(0.68 0.26 295))',
    glowColor: 'oklch(0.72 0.28 340 / 0.40)',
  },
  {
    id: 12,
    topic: 'View Decay',
    topicEmoji: '📉',
    question: 'Reel A has decay rate 0.9, Reel B has 0.5. Both peak at 100K views. After 5 days, which has more views?',
    answer: 'Reel A: ~59,049 views vs Reel B: 3,125 views',
    explanation: 'A: 100K × 0.9^5 ≈ 59,049. B: 100K × 0.5^5 = 3,125. Higher decay rate = slower drop. Trending audio and hooks keep decay rate high! 🎵',
    gradient: 'linear-gradient(135deg, oklch(0.68 0.26 295), oklch(0.72 0.28 340))',
    glowColor: 'oklch(0.68 0.26 295 / 0.40)',
  },
  {
    id: 13,
    topic: 'View Decay',
    topicEmoji: '📉',
    question: 'What strategies help slow down view decay on Instagram Reels?',
    answer: 'Trending audio, strong hooks, evergreen topics, and re-sharing to Stories.',
    explanation: 'Content tied to trends decays faster. Evergreen content (tutorials, tips) maintains views longer. Re-sharing to Stories resets the decay clock! ⏰',
    gradient: 'linear-gradient(135deg, oklch(0.72 0.28 340), oklch(0.68 0.26 295))',
    glowColor: 'oklch(0.72 0.28 340 / 0.40)',
  },
  {
    id: 14,
    topic: 'Engagement Rate',
    topicEmoji: '📊',
    question: 'Two creators: Creator A has 10K followers with 8% ER. Creator B has 1M followers with 0.8% ER. Who\'s more valuable to brands?',
    answer: 'Creator A — micro-influencers often win! 💪',
    explanation: 'Creator A: 800 engaged people per post. Creator B: 8,000 engaged people. But ER signals authenticity. Brands increasingly prefer high-ER micro-influencers for better ROI! 💰',
    gradient: 'linear-gradient(135deg, oklch(0.68 0.26 295), oklch(0.72 0.28 340))',
    glowColor: 'oklch(0.68 0.26 295 / 0.40)',
  },
  {
    id: 15,
    topic: 'Viral Growth',
    topicEmoji: '🚀',
    question: 'What does it mean when shares per person = 1 in the viral growth model?',
    answer: 'Linear growth — no viral effect! 😴',
    explanation: 'When shares = 1, Reach = Initial × 1^n = Initial. No growth at all! You need shares > 1 for exponential viral spread. Aim for at least 2+ shares per viewer! 🎯',
    gradient: 'linear-gradient(135deg, oklch(0.82 0.20 195), oklch(0.78 0.22 145))',
    glowColor: 'oklch(0.82 0.20 195 / 0.40)',
  },
];

const topicColors: Record<string, { badge: string; border: string }> = {
  'Engagement Rate': {
    badge: 'oklch(0.72 0.28 340 / 0.20)',
    border: 'oklch(0.72 0.28 340 / 0.50)',
  },
  'Viral Growth': {
    badge: 'oklch(0.82 0.20 195 / 0.20)',
    border: 'oklch(0.82 0.20 195 / 0.50)',
  },
  'View Decay': {
    badge: 'oklch(0.68 0.26 295 / 0.20)',
    border: 'oklch(0.68 0.26 295 / 0.50)',
  },
};

const topicTextColors: Record<string, string> = {
  'Engagement Rate': 'oklch(0.88 0.18 340)',
  'Viral Growth': 'oklch(0.88 0.16 195)',
  'View Decay': 'oklch(0.82 0.20 295)',
};

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function FlashcardGame() {
  const [deck, setDeck] = useState<Flashcard[]>(flashcards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completedCards, setCompletedCards] = useState<Set<number>>(new Set());

  const currentCard = deck[currentIndex];
  const total = deck.length;
  const progress = ((currentIndex) / total) * 100;

  function handleFlip() {
    setIsFlipped(prev => !prev);
  }

  function handleNext() {
    if (currentIndex < total - 1) {
      setCompletedCards(prev => new Set(prev).add(currentCard.id));
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  }

  function handlePrev() {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  }

  function handleRestart() {
    setCurrentIndex(0);
    setIsFlipped(false);
    setCompletedCards(new Set());
  }

  function handleShuffle() {
    setDeck(shuffleArray(flashcards));
    setCurrentIndex(0);
    setIsFlipped(false);
    setCompletedCards(new Set());
  }

  const isLastCard = currentIndex === total - 1;
  const topicColor = topicColors[currentCard.topic];
  const topicTextColor = topicTextColors[currentCard.topic];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="glass-card rounded-3xl p-5 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
          style={{ background: 'linear-gradient(90deg, oklch(0.72 0.28 340), oklch(0.68 0.26 295), oklch(0.82 0.20 195))' }}
        />
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-display text-xl font-extrabold gradient-text-purple-pink">
              Viral Math Quiz 🎮
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Tap the card to reveal the answer
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleShuffle}
              className="flex items-center gap-1.5 rounded-2xl px-3 py-2 text-xs font-bold transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: 'oklch(0.82 0.20 195 / 0.15)',
                border: '1px solid oklch(0.82 0.20 195 / 0.35)',
                color: 'oklch(0.88 0.16 195)',
              }}
              title="Shuffle deck"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Shuffle</span>
            </button>
            <button
              onClick={handleRestart}
              className="flex items-center gap-1.5 rounded-2xl px-3 py-2 text-xs font-bold transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: 'oklch(0.72 0.28 340 / 0.15)',
                border: '1px solid oklch(0.72 0.28 340 / 0.35)',
                color: 'oklch(0.88 0.18 340)',
              }}
              title="Restart deck"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart</span>
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'oklch(0.20 0.025 280)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, oklch(0.72 0.28 340), oklch(0.68 0.26 295), oklch(0.82 0.20 195))',
              }}
            />
          </div>
          <span className="text-xs font-bold font-display whitespace-nowrap" style={{ color: 'oklch(0.68 0.26 295)' }}>
            {currentIndex + 1} / {total}
          </span>
        </div>
      </div>

      {/* Topic filter pills */}
      <div className="flex gap-2 flex-wrap">
        {(['Engagement Rate', 'Viral Growth', 'View Decay'] as const).map(topic => {
          const count = flashcards.filter(c => c.topic === topic).length;
          const tc = topicColors[topic];
          return (
            <div
              key={topic}
              className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
              style={{ background: tc.badge, border: `1px solid ${tc.border}`, color: topicTextColors[topic] }}
            >
              <span>{topic === 'Engagement Rate' ? '📊' : topic === 'Viral Growth' ? '🚀' : '📉'}</span>
              <span>{topic}</span>
              <span className="opacity-60">({count})</span>
            </div>
          );
        })}
      </div>

      {/* Flashcard */}
      <div
        className="relative cursor-pointer select-none"
        style={{ perspective: '1200px', minHeight: '320px' }}
        onClick={handleFlip}
        role="button"
        aria-label={isFlipped ? 'Card showing answer, tap to flip back' : 'Card showing question, tap to flip'}
        tabIndex={0}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleFlip(); }}
      >
        <div
          className="relative w-full transition-transform duration-500"
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            minHeight: '320px',
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 rounded-3xl p-6 flex flex-col justify-between overflow-hidden"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              background: 'oklch(0.14 0.020 280 / 0.90)',
              border: '1px solid oklch(0.68 0.26 295 / 0.25)',
              boxShadow: `0 0 40px ${currentCard.glowColor}, 0 8px 32px oklch(0 0 0 / 0.40)`,
            }}
          >
            {/* Top accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
              style={{ background: currentCard.gradient }}
            />

            {/* Ambient glow blob */}
            <div
              className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-15 blur-3xl pointer-events-none"
              style={{ background: currentCard.gradient }}
            />

            <div className="flex flex-col gap-4 relative z-10">
              {/* Topic badge */}
              <div className="flex items-center justify-between">
                <div
                  className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
                  style={{
                    background: topicColor.badge,
                    border: `1px solid ${topicColor.border}`,
                    color: topicTextColor,
                  }}
                >
                  <span>{currentCard.topicEmoji}</span>
                  <span>{currentCard.topic}</span>
                </div>
                <span className="text-xs text-muted-foreground font-medium">Tap to flip ✨</span>
              </div>

              {/* Question */}
              <div className="flex-1 flex items-center">
                <p className="font-display text-lg font-bold text-foreground leading-snug">
                  {currentCard.question}
                </p>
              </div>
            </div>

            {/* Bottom hint */}
            <div className="relative z-10 flex items-center justify-center gap-2 mt-4">
              <div
                className="rounded-2xl px-4 py-2 text-xs font-bold uppercase tracking-widest"
                style={{
                  background: 'oklch(0.10 0.015 280 / 0.80)',
                  border: '1px solid oklch(0.40 0.04 280 / 0.40)',
                  color: 'oklch(0.58 0.018 280)',
                }}
              >
                🤔 What's the answer?
              </div>
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 rounded-3xl p-6 flex flex-col justify-between overflow-hidden"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: 'oklch(0.14 0.020 280 / 0.90)',
              border: '1px solid oklch(0.68 0.26 295 / 0.25)',
              boxShadow: `0 0 40px ${currentCard.glowColor}, 0 8px 32px oklch(0 0 0 / 0.40)`,
            }}
          >
            {/* Top accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
              style={{ background: currentCard.gradient }}
            />

            {/* Ambient glow blob */}
            <div
              className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full opacity-15 blur-3xl pointer-events-none"
              style={{ background: currentCard.gradient }}
            />

            <div className="flex flex-col gap-4 relative z-10">
              {/* Topic badge */}
              <div className="flex items-center justify-between">
                <div
                  className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
                  style={{
                    background: topicColor.badge,
                    border: `1px solid ${topicColor.border}`,
                    color: topicTextColor,
                  }}
                >
                  <span>{currentCard.topicEmoji}</span>
                  <span>{currentCard.topic}</span>
                </div>
                <span className="text-xs font-bold" style={{ color: 'oklch(0.78 0.22 145)' }}>✅ Answer</span>
              </div>

              {/* Answer */}
              <div
                className="rounded-2xl px-4 py-3"
                style={{
                  background: currentCard.gradient.replace('linear-gradient(135deg,', 'linear-gradient(135deg,').replace(')', ' / 0.15)').replace('oklch(', 'oklch(').replace(/oklch\(([^)]+)\)/g, (m, p) => `oklch(${p} / 0.15)`),
                  border: `1px solid ${topicColor.border}`,
                }}
              >
                <p className="font-display text-xl font-extrabold" style={{ color: topicTextColor }}>
                  {currentCard.answer}
                </p>
              </div>

              {/* Explanation */}
              <p className="text-sm text-foreground/80 leading-relaxed font-medium">
                {currentCard.explanation}
              </p>
            </div>

            {/* Bottom hint */}
            <div className="relative z-10 flex items-center justify-center gap-2 mt-2">
              <div
                className="rounded-2xl px-4 py-2 text-xs font-bold uppercase tracking-widest"
                style={{
                  background: 'oklch(0.10 0.015 280 / 0.80)',
                  border: '1px solid oklch(0.40 0.04 280 / 0.40)',
                  color: 'oklch(0.58 0.018 280)',
                }}
              >
                💡 Tap to flip back
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-3">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 rounded-2xl px-4 py-3 font-display text-sm font-bold transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
          style={{
            background: 'oklch(0.20 0.025 280)',
            border: '1px solid oklch(0.40 0.04 280 / 0.40)',
            color: 'oklch(0.97 0.008 280)',
          }}
        >
          <ChevronLeft className="w-4 h-4" />
          Prev
        </button>

        <div className="flex-1 flex justify-center">
          {isLastCard && isFlipped ? (
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 rounded-2xl px-6 py-3 font-display text-sm font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, oklch(0.72 0.28 340), oklch(0.68 0.26 295))',
                boxShadow: '0 4px 20px oklch(0.72 0.28 340 / 0.40)',
              }}
            >
              <RotateCcw className="w-4 h-4" />
              Play Again 🎉
            </button>
          ) : (
            <div className="flex gap-1.5 items-center">
              {deck.slice(Math.max(0, currentIndex - 2), Math.min(total, currentIndex + 3)).map((_, i) => {
                const realIndex = Math.max(0, currentIndex - 2) + i;
                return (
                  <div
                    key={realIndex}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: realIndex === currentIndex ? '20px' : '6px',
                      height: '6px',
                      background: realIndex === currentIndex
                        ? 'linear-gradient(90deg, oklch(0.72 0.28 340), oklch(0.68 0.26 295))'
                        : completedCards.has(deck[realIndex]?.id)
                        ? 'oklch(0.78 0.22 145)'
                        : 'oklch(0.30 0.025 280)',
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>

        <button
          onClick={handleNext}
          disabled={isLastCard}
          className="flex items-center gap-2 rounded-2xl px-4 py-3 font-display text-sm font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
          style={{
            background: isLastCard
              ? 'oklch(0.20 0.025 280)'
              : 'linear-gradient(135deg, oklch(0.82 0.20 195), oklch(0.78 0.22 145))',
            border: isLastCard ? '1px solid oklch(0.40 0.04 280 / 0.40)' : 'none',
            boxShadow: isLastCard ? 'none' : '0 4px 20px oklch(0.82 0.20 195 / 0.40)',
          }}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Completion screen */}
      {isLastCard && isFlipped && (
        <div
          className="glass-card rounded-3xl p-6 text-center relative overflow-hidden"
          style={{ border: '1px solid oklch(0.78 0.22 145 / 0.40)' }}
        >
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{ background: 'linear-gradient(135deg, oklch(0.72 0.28 340), oklch(0.82 0.20 195))' }}
          />
          <div className="relative z-10">
            <p className="text-4xl mb-2">🎉</p>
            <h3 className="font-display text-xl font-extrabold gradient-text-cyan-green mb-1">
              Absolutely Slay!
            </h3>
            <p className="text-sm text-muted-foreground">
              You crushed all {total} cards! You're basically a viral math genius now. 🧠✨
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
