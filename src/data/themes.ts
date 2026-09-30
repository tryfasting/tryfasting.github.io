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
  cj: {
    label: 'CJ OliveNetworks Blue',
    // Observed in the official website logo.svg and common.css, 2026-09-30.
    accent: '#006ECD',
    accentInk: '#0057A3',
    accentSoft: '#E8F2FC',
    marker: 'linear-gradient(90deg, #006ECD 0 60%, #EF141D 60% 80%, #FF9700 80% 100%)',
  },
} as const;

export type PortfolioTheme = keyof typeof portfolioThemes;
