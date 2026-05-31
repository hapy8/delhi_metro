/**
 * Delhi Metro Navigator — Design Tokens
 *
 * Single source of truth for brand values used in both CSS (via index.css)
 * and TypeScript (for programmatic use e.g. line colors in charts/SVGs).
 *
 * Keep this in sync with the @theme block in src/index.css.
 */

// ─── Brand Colors ────────────────────────────────────────────────────────────

export const BRAND_COLORS = {
  /** Primary brand blue — DMRC royal blue */
  primary: "#1B4FD8",
  primaryLight: "#3B82F6",
  primaryDark: "#1E3A8A",

  /** Accent saffron — Delhi warmth */
  accent: "#F97316",
  accentLight: "#FDBA74",
  accentDark: "#C2410C",

  /** Backgrounds */
  background: "#09090B",
  surface: "#111113",
  surfaceElevated: "#18181B",

  /** Text */
  textPrimary: "#FAFAFA",
  textSecondary: "#A1A1AA",
  textMuted: "#52525B",

  /** Utility */
  success: "#10B981",
  warning: "#F59E0B",
  destructive: "#EF4444",
  border: "#27272A",
} as const;

// ─── DMRC Line Colors ─────────────────────────────────────────────────────────

/**
 * Official DMRC line identifiers with their colors and display names.
 * Used throughout route visualization, pills, and timeline dots.
 */
export const LINE_COLORS: Record<string, { name: string; color: string; shortName: string }> = {
  RED:     { name: "Red Line",                color: "#E63946", shortName: "Red" },
  YELLOW:  { name: "Yellow Line",             color: "#FACC15", shortName: "Yellow" },
  BLUE:    { name: "Blue Line",               color: "#3B82F6", shortName: "Blue" },
  BLUE_B:  { name: "Blue Line (Branch)",      color: "#3B82F6", shortName: "Blue B" },
  GREEN:   { name: "Green Line",              color: "#10B981", shortName: "Green" },
  GREEN_B: { name: "Green Line (Branch)",     color: "#10B981", shortName: "Green B" },
  VIOLET:  { name: "Violet Line",             color: "#8B5CF6", shortName: "Violet" },
  ORANGE:  { name: "Orange Line (Airport)",   color: "#F97316", shortName: "Orange" },
  PINK:    { name: "Pink Line",               color: "#EC4899", shortName: "Pink" },
  MAGENTA: { name: "Magenta Line",            color: "#A855F7", shortName: "Magenta" },
  GREY:    { name: "Grey Line",               color: "#6B7280", shortName: "Grey" },
  AQUA:    { name: "Aqua Line",               color: "#06B6D4", shortName: "Aqua" },
  WALK:    { name: "Walkway",                 color: "#9CA3AF", shortName: "Walk" },
} as const;

// ─── Typography Scale ─────────────────────────────────────────────────────────

export const TYPOGRAPHY = {
  fontFamily: {
    sans: '"Geist Variable", "Inter", system-ui, sans-serif',
    mono: '"Geist Mono Variable", "Fira Code", ui-monospace, monospace',
  },
  fontSize: {
    xs:   "0.75rem",    // 12px
    sm:   "0.8125rem",  // 13px
    base: "0.875rem",   // 14px
    md:   "1rem",       // 16px
    lg:   "1.125rem",   // 18px
    xl:   "1.25rem",    // 20px
    "2xl": "1.5rem",    // 24px
    "3xl": "1.875rem",  // 30px
  },
  fontWeight: {
    normal:   "400",
    medium:   "500",
    semibold: "600",
    bold:     "700",
    extrabold: "800",
  },
  lineHeight: {
    tight:  "1.25",
    snug:   "1.375",
    normal: "1.5",
    relaxed: "1.625",
  },
} as const;

// ─── Spacing Scale ────────────────────────────────────────────────────────────

export const SPACING = {
  1:  "4px",
  2:  "8px",
  3:  "12px",
  4:  "16px",
  5:  "20px",
  6:  "24px",
  8:  "32px",
  10: "40px",
  12: "48px",
  16: "64px",
} as const;

// ─── Animation Tokens ─────────────────────────────────────────────────────────

export const MOTION = {
  duration: {
    fast: "150ms",
    base: "200ms",
    slow: "350ms",
  },
  easing: {
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
  },
} as const;

// ─── Layout ───────────────────────────────────────────────────────────────────

export const LAYOUT = {
  maxContentWidth: "540px",
  headerHeight: "60px",
} as const;
