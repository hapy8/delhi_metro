# Delhi Metro Navigator — Design System

> **Version:** 2.1.0 | **Stack:** React 19 + Vite + shadcn/ui (radix-nova) + Tailwind v4 + TypeScript

---

## Brand Identity

### Mission
Delhi Metro Navigator is a production-grade PWA that helps commuters find the fastest routes across all 10 DMRC metro lines — instantly, with full offline support.

### Brand Pillars
| Pillar | Expression |
|--------|------------|
| **Trust** | Clean, precise UI. No clutter. Reliable data. |
| **Speed** | Instant search, sub-5s pathfinding, snappy native interactions. |
| **Delhi** | Metro Blue + Saffron — the colours of the capital's infrastructure and warmth. |
| **Accessibility** | Pure shadcn/ui components: WCAG-AA contrast, keyboard nav, ARIA labels, focus rings everywhere. |

---

## Color System

All colors use standard shadcn HSL CSS variables, defined in `src/index.css`.

### Brand Palette (Tailwind Variables)
| Token | Hex | HSL equivalent | Usage |
|-------|-----|----------------|-------|
| `--primary` | `#1B4FD8` | `223 78% 47%` | Primary actions, buttons, focus rings |
| `--accent` | `#F97316` | `25 95% 53%` | Highlights, accents, saffron details |

### DMRC Line Colors

Each metro line has an official color used in route visualization (dots, badges):

| Line | Hex |
|------|-----|
| Red Line | `#E63946` |
| Yellow Line | `#FACC15` |
| Blue Line | `#3B82F6` |
| Green Line | `#10B981` |
| Violet Line | `#8B5CF6` |
| Orange Line | `#F97316` |
| Pink Line | `#EC4899` |
| Magenta Line | `#A855F7` |
| Grey Line | `#6B7280` |
| Aqua Line | `#06B6D4` |

---

## Typography

**Font Family:** Geist Variable (primary) + Inter (fallback)
- Variable font — weight range 100–900 from a single file
- Loaded via `@fontsource-variable/geist`

---

## Component Inventory

### shadcn/ui Components Installed & Used
We use strict `shadcn/ui` composition for all layouts. No custom CSS wrappers or pseudo-elements.

| Component | Usage |
|---|---|
| `Card` | Structural containers for Search, Metrics, Timeline, Empty State |
| `Button` | Primary CTAs, Swap Button, Install Button |
| `Badge` | Status indicators, Line markers, Small stats |
| `Alert` | Error states, Travel Tips, Install Guide |
| `Popover` | Search Combobox dropdown container |
| `Command` | Fuzzy search input, list, and items |
| `Tabs` | Route preference selector (Fastest vs Least Changes) |
| `RadioGroup` | Alternative form selectors |
| `Accordion` | Step-by-step expandable route timeline |
| `Label` | Accessible form labels |

### Application Components

```text
src/components/
├── ui/                     — Pure shadcn/ui generated primitives
├── layout/AppHeader.tsx    — Standard border-b header with Badge and Icon
├── search/
│   ├── StationSearch.tsx   — Popover + Command Combobox
│   ├── RoutePreference.tsx — RadioGroup selector
│   └── SearchCard.tsx      — Card-based search form
├── results/
│   ├── MetricCard.tsx      — Card for single metrics
│   ├── RouteMetrics.tsx    — 3-col grid of MetricCards
│   ├── RouteTabs.tsx       — Tabs selector for route options
│   ├── LinesUsed.tsx       — Card with outline Badges
│   ├── RouteTimeline.tsx   — Accordion-based step timeline
│   ├── TravelTips.tsx      — Alert component
│   └── ResultsPanel.tsx    — Orchestrator layout
├── empty/EmptyState.tsx    — Card-based dashboard empty state
└── pwa/InstallBanner.tsx   — Card + Alert for installation
```

---

## State Architecture

```text
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

## Contribution Guidelines

### Adding a Component
1. Check `npx shadcn@latest search` first — use existing components.
2. If custom structure is needed, compose it entirely out of shadcn primitives. Do not use raw Tailwind borders, shadows, or background opacities unless strictly necessary.
3. Place application components in the correct `src/components/<feature>/` directory.

### Code Quality Standards
- **Clean**: No unused imports, no dead code.
- **Organized**: One component per file, grouped by feature.
- **Industry standard**: shadcn composition rules, semantic HTML, ARIA.
- **Modular**: Hooks own logic, components own rendering.
- **Production-grade**: TypeScript strict mode, zero `any`, proper error boundaries.
