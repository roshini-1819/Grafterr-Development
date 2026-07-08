# Grafterr — Landing Page

A pixel-perfect, fully responsive landing page for **Grafterr** (restaurant technology platform), built as a front-end technical assessment. All content is dynamic — loaded from a local JSON file through a simulated API layer with loading skeletons and an error/retry state.

**Live URL:** https://grafterr-one.vercel.app/

---

## Chosen Stack: React

| | |
|---|---|
| Framework | **React 18** (functional components + hooks only) |
| Build tool | **Vite 5** |
| Styling | **CSS Modules** + design tokens via CSS custom properties |
| Type checking | **PropTypes** on every component |
| CSS frameworks | None (per the brief — no Tailwind/Bootstrap) |

---

## Setup Instructions

Requires **Node.js 18+** (built with Node 22).

```bash
# 1. Clone
git clone https://github.com/roshini-1819/Grafterr.git
cd Grafterr

# 2. Install dependencies
npm install

# 3. Run the dev server (opens on http://localhost:5173)
npm run dev

# 4. Production build + local preview
npm run build
npm run preview
```

No environment variables or backend needed — the "API" is simulated locally.

---

## Approach

### Architecture

```
src/
├── components/ui/       # Small, reusable presentational components
│   ├── GradientText     # Brand-gradient clipped text
│   ├── GradientButton   # CTA pill (318×60, gradient fill)
│   ├── ProductCard      # Title + device image card (592/709 aspect)
│   ├── Carousel         # Progress divider, track, arrows (view only)
│   ├── FloatingShape    # Decorative teal circle / coral rectangle
│   ├── Skeleton         # Shimmering placeholder primitive
│   └── ErrorState       # Error message + Retry button
├── sections/            # HeroSection, FeaturesSection (+ skeletons)
├── hooks/
│   ├── useContent.js    # Data fetching: loading / error / retry lifecycle
│   └── useCarousel.js   # Carousel state: index, per-view, touch swipe
├── services/api.js      # Simulated API (1000–1500 ms delay, Promise-based)
├── data/content.json    # Single source of truth for all page content
└── styles/              # variables.css (design tokens), global.css (reset)
```

### Key decisions

- **Dynamic content only** — no text is hardcoded in JSX. Components receive
  content via props sourced from `content.json` through `services/api.js`,
  which mimics a real network client (Promise + artificial latency + optional
  failure rate to exercise the retry UI).
- **Design tokens** — every colour, font, radius, shadow, spacing step and
  duration lives in `src/styles/variables.css`, extracted from the Figma file
  (gradient `#5895F0 → #F1B662`, ink `#1A1A1A`, muted `#777777`, Raleway for
  body/headings, Urbanist for card titles).
- **Pixel fidelity with responsiveness** — exact Figma values (75/94 hero,
  54/68 features title, 318×60 CTA, 319×4 divider, 592×709 cards, 35px gap,
  60px arrows) are hit at desktop width via `clamp()` scales, so the same
  layout degrades gracefully down to 375px instead of overflowing.
- **Carousel** — all state lives in `useCarousel` (index, items-per-view by
  breakpoint, boundary detection, touch swipe with 1:1 drag feel); the
  component is a pure view. 300 ms slide transition; arrows disable at the
  boundaries; the divider doubles as a live progress indicator.
- **Loading skeletons** mirror the final layout's exact silhouette (same
  card aspect ratio, pill, divider and arrow geometry), so content fades in
  with zero layout shift. Implemented with CSS only (shimmer keyframes).
- **Accessibility** — semantic landmarks, `aria-roledescription="carousel"`,
  progressbar semantics on the divider, labelled arrow buttons,
  `prefers-reduced-motion` support.

### Responsive behaviour

| Breakpoint | Cards shown | Notes |
|---|---|---|
| Desktop (>1024px) | 3 | arrows navigate one card at a time |
| Tablet (641–1024px) | 2 | |
| Mobile (≤640px) | 1 | touch swipe enabled |

## Assumptions

- The Figma prototype shows **no site header/navbar or footer** for this
  page, so none are rendered (the navigation data model is still present in
  `content.json` for completeness).
- Product device images intentionally **bleed off the card bottom** (clipped
  by the card), matching the prototype; aspect ratios are preserved (no
  distortion).
- Fonts are loaded from Google Fonts (**Raleway** 400–800, **Urbanist**
  500–700) as interpreted from the Figma inspector.
- The carousel contains six products (the three Figma products plus three
  more) so the navigation/progress behaviour is actually exercisable.


"# Grafterr" 
"# Grafterr-Development" 
