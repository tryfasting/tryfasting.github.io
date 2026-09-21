/** Explicit route allowlist. No URL value is interpolated into CSS. */
export const portfolioThemes = {
  hanwha: {
    label: 'Hanwha Orange',
    accent: '#F37321',
    accentInk: '#9C3A00',
    accentSoft: '#FBE9DC',
  },
  cobalt: {
    label: 'Cobalt',
    accent: '#1F4FD1',
    accentInk: '#1A3FA6',
    accentSoft: '#E8EDFA',
  },
} as const;

export type PortfolioTheme = keyof typeof portfolioThemes;
