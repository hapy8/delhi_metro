# Delhi Metro Navigator — Design System

> **Version:** 2.0.0 | **Stack:** React 19 + Vite + shadcn/ui (radix-nova) + Tailwind v4 + TypeScript

---

## Brand Identity

### Mission
Delhi Metro Navigator is a production-grade PWA that helps commuters find the fastest routes across all 10 DMRC metro lines — instantly, with full offline support.

### Brand Pillars
| Pillar | Expression |
|--------|------------|
| **Trust** | Clean, precise UI. No clutter. Reliable data. |
| **Speed** | Instant search, sub-5s pathfinding, staggered animations that feel snappy. |
| **Delhi** | Metro Blue + Saffron — the colours of the capital's infrastructure and warmth. |
| **Accessibility** | WCAG-AA contrast, keyboard nav, ARIA labels, focus rings everywhere. |

---

## Color System

All colors are defined as CSS custom properties in `src/index.css` using OKLCH for perceptual uniformity, and exported as TypeScript constants from `src/brand/tokens.ts`.

### Brand Palette

| Token | Hex | OKLCH | Usage |
|-------|-----|-------|-------|
| `--color-brand-500` | `#1B4FD8` | `oklch(0.55 0.25 258)` | Primary actions, buttons, focus rings |
| `--color-accent-500` | `#F97316` | `oklch(0.68 0.25 50)` | Highlights, boarding instructions, saffron accents |

### Semantic Tokens (Dark Theme)

| Token | Value | Role |
|-------|-------|------|
| `--color-background` | `oklch(0.07 0.005 258)` | App background |
| `--color-foreground` | `oklch(0.98 0.005 258)` | Primary text |
| `--color-card` | `oklch(0.10 0.008 258)` | Card surfaces |
| `--color-muted` | `oklch(0.14 0.010 258)` | Subtle backgrounds |
| `--color-muted-foreground` | `oklch(0.58 0.015 258)` | Secondary text |
| `--color-border` | `oklch(0.18 0.010 258)` | Borders, dividers |
| `--color-primary` | `oklch(0.55 0.25 258)` | Primary interactive |
| `--color-accent` | `oklch(0.68 0.25 50)` | Accent / saffron |
| `--color-destructive` | `oklch(0.60 0.22 25)` | Errors |

### DMRC Line Colors

Each metro line has an official color used in route visualization (dots, bars, pills):

| Line | Color | Hex |
|------|-------|-----|
| Red Line | ![#E63946](https://placehold.co/12x12/E63946/E63946.png) | `#E63946` |
| Yellow Line | ![#FACC15](https://placehold.co/12x12/FACC15/FACC15.png) | `#FACC15` |
| Blue Line | ![#3B82F6](https://placehold.co/12x12/3B82F6/3B82F6.png) | `#3B82F6` |
| Green Line | ![#10B981](https://placehold.co/12x12/10B981/10B981.png) | `#10B981` |
| Violet Line | ![#8B5CF6](https://placehold.co/12x12/8B5CF6/8B5CF6.png) | `#8B5CF6` |
| Orange Line | ![#F97316](https://placehold.co/12x12/F97316/F97316.png) | `#F97316` |
| Pink Line | ![#EC4899](https://placehold.co/12x12/EC4899/EC4899.png) | `#EC4899` |
| Magenta Line | ![#A855F7](https://placehold.co/12x12/A855F7/A855F7.png) | `#A855F7` |
| Grey Line | ![#6B7280](https://placehold.co/12x12/6B7280/6B7280.png) | `#6B7280` |
| Aqua Line | ![#06B6D4](https://placehold.co/12x12/06B6D4/06B6D4.png) | `#06B6D4` |

---

## Typography

**Font Family:** Geist Variable (primary) + Inter (fallback)
- Variable font — weight range 100–900 from a single file
- Loaded via `@fontsource-variable/geist` (self-hosted, no CDN dependency)

### Scale

| Class / Role | Size | Weight | Usage |
|---|---|---|---|
| App title | 14px | 700 | Header brand name |
| Section heading | 14px | 600 | Card titles |
| Body | 14px | 400 | Station names, descriptions |
| Small / muted | 12px | 500 | Labels, secondary text |
| Caption / micro | 10px | 600 | Uppercase badges, overlines |

### Rules
- `font-sans` for all body and UI text
- `font-mono` for platform numbers (future use)
- Never use raw `font-bold` on muted text
- Tracking: `tracking-wide` + `uppercase` for labels; default for body

---

## Spacing & Layout

Maximum content width: **540px** (single-column mobile-first)

### Scale (Tailwind)
```
gap-1  = 4px    gap-3  = 12px   gap-6  = 24px
gap-2  = 8px    gap-4  = 16px   gap-8  = 32px
```

### Layout Rules
- Use `flex flex-col gap-*` — never `space-y-*`
- Page padding: `px-4 pt-5 pb-12`
- Cards: `rounded-2xl` (16px radius)
- Inputs: `rounded-xl` (12px radius)
- Buttons: `rounded-xl` (12px radius)
- Badges/pills: `rounded-full`

---

## Component Inventory

### shadcn/ui Components Installed
| Component | Used In |
|---|---|
| `Button` | SearchCard CTA, Install button |
| `Card` | (structural reference) |
| `Input` | (base for StationSearch) |
| `Badge` | RouteTabs best-route badge, offline indicator |
| `Alert` | Error messages in SearchCard |
| `Separator` | (available) |
| `Skeleton` | (available for loading states) |
| `Tabs` | (available) |
| `Command` | (available for future command palette) |
| `ScrollArea` | Autocomplete dropdown |
| `Tooltip` | (available) |
| `Dialog` | (available) |

### Custom Components

```
src/components/
├── layout/
│   └── AppHeader.tsx         — Glassmorphism header, logo, offline badge
├── search/
│   ├── StationSearch.tsx     — Fuzzy autocomplete with line dots
│   ├── RoutePreference.tsx   — Fastest / Least Changes toggle
│   └── SearchCard.tsx        — Composes search form + swap + CTA
├── results/
│   ├── MetricCard.tsx        — Single stat (stations / time / interchanges)
│   ├── RouteMetrics.tsx      — 3-column metric grid
│   ├── RouteTabs.tsx         — Fastest vs Least option selector
│   ├── LinesUsed.tsx         — Colored line pills
│   ├── RouteTimeline.tsx     — Animated step-by-step route
│   ├── TravelTips.tsx        — Tip cards
│   └── ResultsPanel.tsx      — Orchestrator
├── empty/
│   └── EmptyState.tsx        — Pre-search animated state
└── pwa/
    └── InstallBanner.tsx     — PWA install prompt + iOS guide
```

---

## Motion & Animation

All animations defined in `src/index.css` as `@keyframes` and CSS classes.

| Class | Effect | Duration |
|---|---|---|
| `animate-fade-in` | opacity 0→1 | 200ms |
| `animate-slide-up` | slide up + fade | 350ms |
| `animate-scale-in` | scale 0.95→1 + fade | 200ms spring |
| `animate-count-up` | slide up + fade | 350ms spring |
| `animate-stagger-N` | delay: N×50ms | — |

### Rules
- Never add motion that lasts > 500ms
- Route timeline uses staggered `animate-stagger-N` (35ms per station, capped at 400ms)
- Swap button uses spring easing for the rotation animation
- Loading skeleton uses `shimmer` keyframe (gradient sweep)
- Pulsing ring on empty state uses `animate-ping` at `animationDuration: 3s`

---

## State Architecture

```
App
├── useOffline()          → isOffline: boolean
├── usePWA()              → { status, install, showIOSGuide, toggleIOSGuide }
└── useRouteSearch()      → { fromStation, toStation, routes, activeKey,
                              error, isSearched, setters, search, swap }
```

### State Rules
- Hooks own all state — components are pure renderers
- No prop-drilling beyond 2 levels (use composition)
- `useRouteSearch` validates before calling pathfinding (no try/catch needed — deterministic)
- `usePWA` handles all PWA lifecycle events (beforeinstallprompt, appinstalled)

---

## File Structure

```
src/
├── App.tsx                 # Root component — wires hooks → UI
├── main.tsx                # React entry + SW registration
├── index.css               # Design system: tokens, animations, base styles
│
├── brand/
│   ├── tokens.ts           # TypeScript token exports (single source of truth)
│   └── DESIGN_SYSTEM.md    # This file
│
├── components/
│   ├── ui/                 # shadcn/ui generated components (DO NOT hand-edit)
│   ├── layout/             # App-level structural components
│   ├── search/             # Search form components
│   ├── results/            # Route results components
│   ├── empty/              # Empty state
│   └── pwa/                # PWA install UI
│
├── hooks/
│   ├── useRouteSearch.ts   # Search state + validation + pathfinding
│   ├── useOffline.ts       # Online/offline detection
│   └── usePWA.ts           # PWA install prompt lifecycle
│
├── core/                   # Business logic — pure TS, no React
│   ├── data/
│   │   ├── stations.ts     # All station data + LS (line → stations map)
│   │   └── lines.ts        # DMRC line definitions (name + color)
│   ├── types.ts            # Shared TypeScript interfaces
│   ├── graph.ts            # Adjacency graph + terminus calculation
│   ├── pathfinding.ts      # Dijkstra: fastest & least-interchange
│   ├── scoring.ts          # Route metrics + segment extraction
│   └── platforms.ts        # Platform number estimation
│
├── lib/
│   └── utils.ts            # cn() — tailwind-merge + clsx
│
└── services/               # (Legacy — services are now in hooks)
```

---

## Contribution Guidelines

### Adding a Component
1. Check `npx shadcn@latest search` first — use existing components
2. Place custom components in the correct `src/components/<feature>/` directory
3. Export only named exports (no default exports)
4. Props interfaces at the top of the file
5. No inline styles for colors — use semantic tokens or Tailwind utilities

### Editing Colors
1. Update `src/index.css` `@theme inline` block for CSS variables
2. Update `src/brand/tokens.ts` TypeScript constants to match
3. Do NOT use raw hex values or Tailwind raw colors (`bg-blue-500`) — use semantic tokens

### Code Quality Standards
- **Clean**: No unused imports, no dead code
- **Organized**: One component per file, grouped by feature
- **Industry standard**: shadcn composition rules, semantic HTML, ARIA
- **Modular**: Hooks own logic, components own rendering
- **Reusable**: Props interfaces are narrow and composable
- **Maintainable**: All magic values are tokens, not hardcoded strings
- **Production-grade**: TypeScript strict mode, zero `any`, proper error boundaries
