# Viral Math App

## Current State
The app has a dark neon Gen Z aesthetic with a sticky header (logo + tagline), a hero section, and three tab groups (Calculators, Learn, Play). It navigates entirely within a single page using tab state. The homepage jumps straight into tab navigation with no dedicated landing/home section. Tab buttons are compact pill-style rows. The design is dark with neon pink/blue/purple accents.

## Requested Changes (Diff)

### Add
- A dedicated **Home Screen** that appears before the tab navigation. It should show:
  - The app logo (already in `/assets/image.png`) prominently
  - App title: "Viral Math App" in large bold font
  - Tagline: "Learn Math in 60 Seconds!" or similar catchy subtitle
  - A bright **Start / Play button** that transitions the user into the main content
  - Mini preview stat cards (e.g., Practice, Leaderboard, Challenge Mode icons) below the CTA
- A **"home"** state in the app: when `activeTab === "home"`, render the new Home Screen; clicking Start/Play sets the tab to "engagement" (or last visited tab)
- Large card-style navigation buttons replacing the current compact pill rows — each section card should show the emoji icon, label, and a subtle description, in a grid layout
- Section grouping labels (🔢 Calculators, 📚 Learn, 🎮 Play) elevated visually with color-coded card rows

### Modify
- Home page hero: replace current simple text hero with full-screen-feel home card that fills the viewport with logo, title, tagline, and CTA
- Navigation tabs: upgrade from small pill buttons to larger card-style buttons (min height ~80px on desktop, full-width on mobile) with icon + label + short description, arranged in a 2-col grid per group
- Font sizes: increase heading sizes across cards (use `text-2xl`/`text-3xl` for card headings, `text-lg` for labels)
- The header should stay minimal (logo + tagline side by side), no changes needed there

### Remove
- The current inline "hero" blurb in the main content area (the "✨ instagram reel analytics" badge + "Understand Viral Math" heading + tagline) — this content moves into the new Home Screen
- The compact flat pill tab rows replaced by the new card-style navigation grid

## Implementation Plan
1. Add a `"home"` value to the tabs or manage it as a separate state (`showHome: boolean`)
2. Create a `HomePage` component that renders the full landing view with logo, title, tagline, stat preview cards, and a Start button
3. Replace compact pill tab navigation with a `NavCardGrid` pattern: render 3 sections (Calculators, Learn, Play), each with a 2-column grid of large cards
4. Each nav card: rounded-3xl glass-card, ~80px min-height, emoji icon (2xl), label (font-bold text-lg), short description (text-xs text-muted-foreground), colored gradient border on hover/active
5. Wire Start button → sets `showHome = false`, preserving last selected tab
6. Apply larger font sizes (text-2xl+ for section headings, text-lg for card labels)
7. Keep all existing calculator/game/learn page components unchanged — only the navigation shell and home page change
8. Add `data-ocid` markers on: home CTA button, each nav card, section group labels
