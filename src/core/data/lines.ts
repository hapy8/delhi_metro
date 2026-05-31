import type { LineData } from '../types';

export const LINES: Record<string, LineData> = {
  RED: { name: "Red Line", color: "#E63946" },
  YELLOW: { name: "Yellow Line", color: "#D4A017" },
  BLUE: { name: "Blue Line", color: "#457B9D" },
  BLUE_B: { name: "Blue Line (Branch)", color: "#457B9D" },
  GREEN: { name: "Green Line", color: "#2A9D8F" },
  GREEN_B: { name: "Green Line (Branch)", color: "#2A9D8F" },
  VIOLET: { name: "Violet Line", color: "#7B2D8B" },
  ORANGE: { name: "Orange Line (Airport)", color: "#E76F51" },
  PINK: { name: "Pink Line", color: "#E91E8C" },
  MAGENTA: { name: "Magenta Line", color: "#9B59B6" },
  GREY: { name: "Grey Line", color: "#6C757D" },
  AQUA: { name: "Aqua Line", color: "#00B4D8" },
  WALK: { name: "Walkway", color: "#9CA3AF" },
};
