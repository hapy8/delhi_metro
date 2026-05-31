import { LS } from './data/stations';

const INTERCHANGE_OFFSETS: Record<string, Record<string, number>> = {
  "Kashmere Gate": { RED: 0, YELLOW: 2, VIOLET: 4 },
  "Rajiv Chowk": { YELLOW: 0, BLUE: 2 },
  "Central Secretariat": { YELLOW: 0, VIOLET: 2 },
  "Mandi House": { BLUE: 0, VIOLET: 2 },
  "Inderlok": { RED: 0, GREEN: 2 },
  "Netaji Subhash Place": { RED: 0, PINK: 2 },
  "Welcome": { RED: 0, PINK: 2 },
  "New Delhi": { YELLOW: 0, ORANGE: 2 },
  "Hauz Khas": { YELLOW: 0, MAGENTA: 2 },
  "Kalkaji Mandir": { VIOLET: 0, MAGENTA: 2 },
  "Botanical Garden": { BLUE: 0, MAGENTA: 2 },
  "Janakpuri West": { BLUE: 0, MAGENTA: 2 },
  "Yamuna Bank": { BLUE: 0, BLUE_B: 2 },
  "Kirti Nagar": { BLUE: 0, GREEN_B: 2 },
  "Dwarka Sector 21": { BLUE: 0, ORANGE: 2 },
  "Azadpur": { YELLOW: 0, PINK: 2 },
  "Dilli Haat - INA": { YELLOW: 0, PINK: 2 },
  "Lajpat Nagar": { VIOLET: 0, PINK: 2 },
  "Mayur Vihar-I": { BLUE: 0, PINK: 2 },
  "Anand Vihar ISBT": { BLUE_B: 0, PINK: 2 },
  "Karkardooma": { BLUE_B: 0, PINK: 2 },
  "Rajouri Garden": { BLUE: 0, PINK: 2 },
};

export function getPlatform(lineId: string, currentStn: string, nextStn: string): number | null {
  if (lineId === 'WALK') return null;

  const stns = LS[lineId];
  if (!stns) return null;

  const idx1 = stns.indexOf(currentStn);
  const idx2 = stns.indexOf(nextStn);

  if (idx1 === -1 || idx2 === -1) return null;

  // Base platform: 1 for forward, 2 for backward
  let basePlatform = idx2 > idx1 ? 1 : 2;

  // Adjust for interchange offset
  const offsets = INTERCHANGE_OFFSETS[currentStn];
  if (offsets && offsets[lineId] !== undefined) {
    basePlatform += offsets[lineId];
  }

  return basePlatform;
}
