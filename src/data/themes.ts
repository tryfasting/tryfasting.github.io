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
  hanwhaOcean: {
    label: 'Hanwha Ocean Orange',
    // Observed in the official www.hanwhaocean.com logo_w.svg, 2026-09-30.
    accent: '#ED7100',
    accentInk: '#A34C00',
    accentSoft: '#FDF0E1',
    marker: 'linear-gradient(90deg, #ED7100 0 60%, #F4A051 60% 80%, #F7BB82 80% 100%)',
  },
  naver: {
    label: 'NAVER Cloud Green',
    // Dominant green in the official www.ncloud.com bundled CSS, observed 2026-09-30.
    accent: '#00C73C',
    accentInk: '#007A28',
    accentSoft: '#E6F8EC',
  },
} as const;

export type PortfolioTheme = keyof typeof portfolioThemes;
