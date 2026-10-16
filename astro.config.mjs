import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { warmMonochrome } from './src/blog/code-theme.mjs';

// Only the blog and the general portfolio are meant for search engines;
// company pages are noindex and stay out of the sitemap.
const isIndexable = (page) => {
  const { pathname } = new URL(page);
  return pathname.startsWith('/blog/') || pathname === '/general/';
};

export default defineConfig({
  site: 'https://tryfasting.github.io',
  output: 'static',
  devToolbar: { enabled: false },
  integrations: [sitemap({ filter: isIndexable })],
  markdown: {
    shikiConfig: { theme: warmMonochrome },
  },
});
