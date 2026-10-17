import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Only the general portfolio is meant for search engines; company pages are noindex.
// The blog at /blog/ is a separate repository (tryfasting/blog) with its own sitemap.
const isIndexable = (page) => new URL(page).pathname === '/general/';

export default defineConfig({
  site: 'https://tryfasting.github.io',
  output: 'static',
  devToolbar: { enabled: false },
  integrations: [sitemap({ filter: isIndexable })],
});
