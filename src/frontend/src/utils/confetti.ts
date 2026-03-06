// Lightweight confetti burst using DOM manipulation
// Uses neon colors matching the app palette

const neonColors = [
  "oklch(0.72 0.30 340)", // neon pink
  "oklch(0.68 0.26 295)", // neon purple
  "oklch(0.82 0.20 195)", // neon cyan
  "oklch(0.78 0.22 145)", // neon green
  "oklch(0.72 0.22 220)", // electric blue
  "oklch(0.88 0.20 100)", // neon yellow
  "oklch(0.80 0.28 15)", // warm orange
];

const shapes = ["circle", "square", "diamond"] as const;

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function randomFrom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function triggerConfetti(container?: HTMLElement): void {
  try {
    const target = container ?? document.body;
    const count = Math.floor(randomBetween(30, 50));
    const particles: HTMLElement[] = [];

    // Inject keyframes once
    const styleId = "confetti-keyframes";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        @keyframes confetti-fall {
          0% {
            opacity: 1;
            transform: translateY(-20px) rotate(0deg) scale(1);
          }
          80% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
            transform: translateY(300px) rotate(720deg) scale(0.3);
          }
        }
        @keyframes confetti-fall-left {
          0% {
            opacity: 1;
            transform: translateY(-20px) translateX(0) rotate(0deg) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(280px) translateX(-80px) rotate(-540deg) scale(0.2);
          }
        }
        @keyframes confetti-fall-right {
          0% {
            opacity: 1;
            transform: translateY(-20px) translateX(0) rotate(0deg) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(280px) translateX(80px) rotate(540deg) scale(0.2);
          }
        }
      `;
      document.head.appendChild(style);
    }

    // Create a fixed overlay for confetti
    const overlay = document.createElement("div");
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      overflow: hidden;
    `;
    target.appendChild(overlay);

    const animations = [
      "confetti-fall",
      "confetti-fall-left",
      "confetti-fall-right",
    ];

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      const color = randomFrom(neonColors);
      const shape = randomFrom(shapes);
      const size = randomBetween(6, 14);
      const duration = randomBetween(0.8, 1.5);
      const delay = randomBetween(0, 0.3);
      const left = randomBetween(10, 90);
      const top = randomBetween(10, 40);
      const animation = randomFrom(animations);

      particle.style.cssText = `
        position: absolute;
        left: ${left}%;
        top: ${top}%;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: ${shape === "circle" ? "50%" : shape === "diamond" ? "2px" : "2px"};
        transform: ${shape === "diamond" ? "rotate(45deg)" : "none"};
        box-shadow: 0 0 ${size * 0.8}px ${color};
        animation: ${animation} ${duration}s ease-out ${delay}s forwards;
        opacity: 1;
      `;

      overlay.appendChild(particle);
      particles.push(particle);
    }

    // Remove overlay after animation completes
    const maxDuration = 1.5 + 0.3 + 100; // max duration + max delay + buffer
    setTimeout(() => {
      try {
        overlay.remove();
      } catch {
        // ignore
      }
    }, maxDuration);

    // Clean up particles array reference
    particles.length = 0;
  } catch {
    // Never throw
  }
}
