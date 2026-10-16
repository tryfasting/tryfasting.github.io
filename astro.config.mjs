import { defineConfig } from 'astro/config';
import { warmMonochrome } from './src/blog/code-theme.mjs';

export default defineConfig({
  site: 'https://tryfasting.github.io',
  output: 'static',
  devToolbar: { enabled: false },
  markdown: {
    shikiConfig: { theme: warmMonochrome },
  },
});
