# Stoltzfus Custom Tile

A modern, high-performance website for **Stoltzfus Custom Tile** — professional tile installation services in Lancaster County, PA.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12-ff4080?logo=framer)

## Features

- **Isometric 3D Tile Grid** — Interactive perspective-transformed tile background with hover/click sound effects and per-row color fading
- **Scroll-Driven Animations** — Radius-on-scroll sections with scale, margin, and shadow transitions via Framer Motion
- **Accordion Gallery** — Responsive image gallery: snap carousel (mobile), vertical accordion (tablet), horizontal accordion (desktop) with full keyboard support
- **Mosaic Reveal Service Cards** — 6x6 tile-grid hover/focus reveal with 3D perspective tilt (ReflexCard)
- **Tile Piano Player** — Record, playback, and clear tile-tap melodies (desktop only)
- **Dark Theme Continuity** — Hero dark gradient flows into page wrapper with isometric tiles visible between white content sections
- **Mobile-First Design** — Responsive at every breakpoint with dark teal slide-in menu
- **Scroll Progress Tiles** — Decorative tile column on the right edge (desktop) that animates with scroll position
- **Accessibility** — ARIA roles, keyboard navigation, focus-visible outlines, skip-link, semantic HTML
- **SEO Ready** — Full metadata, Open Graph, JSON-LD structured data, canonical URLs

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
git clone https://github.com/your-username/stoltzfus-tiles-website.git
cd stoltzfus-tiles-website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
app/
├── components/
│   ├── AccordGallery.tsx       # Responsive accordion gallery (mobile/tablet/desktop)
│   ├── Contact.tsx             # Contact form + info section
│   ├── Footer.tsx              # Compact footer with social links
│   ├── Header.tsx              # Fixed nav with scroll detection + dark mobile menu
│   ├── Hero.tsx                # Hero section with isometric grid + tile piano
│   ├── IsometricGridBg.tsx     # Interactive isometric 3D tile grid background
│   ├── MosaicRevealCard.tsx    # Tile-mosaic hover/focus reveal card
│   ├── OriginButton.tsx        # Mouse-origin hover effect button
│   ├── RadiusScrollSection.tsx # Scroll-animated section wrapper
│   ├── ReflexCard.tsx          # 3D perspective tilt + glare card
│   ├── ScrollProgressTiles.tsx # Scroll-position tile indicator (desktop)
│   ├── Services.tsx            # Services grid with mosaic cards
│   └── Testimonials.tsx        # Client testimonials grid
├── faq/page.tsx                # FAQ page
├── privacy/page.tsx            # Privacy policy
├── terms/page.tsx              # Terms of service
├── lib/tileAudio.ts            # Web Audio API tile sound synthesis
├── globals.css                 # Design tokens, scrollbar, nav hover styles
├── layout.tsx                  # Root layout with Outfit font + metadata
└── page.tsx                    # Homepage
public/                         # Static assets (images, logo, favicon)
```

## Design System

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `teal-600` | `#0d9488` | Primary accent, CTAs, borders |
| `#0b1e2d` | Dark navy | Hero gradient, page wrapper bg |
| `#0f4c46` | Dark teal | Hero gradient, mobile menu |
| `white` | `#ffffff` | Content section cards |

### Typography

- **Font**: [Outfit](https://fonts.google.com/specimen/Outfit) (Google Fonts, via `next/font`)
- **Weights**: 300-800
- **Headings**: Bold/extrabold, tight tracking, responsive sizing
- **Body**: Relaxed line height for readability

### Scrollbar

- Thin (6px), transparent track, rounded pill thumb
- Teal highlight on hover
- Firefox `scrollbar-width: thin` support

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| [Next.js](https://nextjs.org/) | 16 | App Router, SSR, image optimization |
| TypeScript | 5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Utility-first styling |
| [Framer Motion](https://motion.dev/) | 12 | Scroll-driven and enter/exit animations |
| [Outfit](https://fonts.google.com/specimen/Outfit) | - | Primary typeface via next/font |

## Accessibility

- Skip-to-content link
- ARIA roles on interactive elements (gallery tabs, mosaic cards, scroll indicator)
- Keyboard navigation for accordion gallery (Arrow keys, Enter, Space)
- Focus-visible outlines on all interactive elements
- `aria-hidden` on decorative elements
- Semantic HTML with proper heading hierarchy
- `role="img"` with labels for star ratings

## Scripts

```bash
npm run dev      # Start development server (Turbopack)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Deployment

Deploy on [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_medium=default-template&filter=next.js)

## License

(c) 2026 Stoltzfus Custom Tile. All rights reserved.
