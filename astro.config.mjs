// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
const site = process.env.PUBLIC_SITE_URL || 'https://example.com';
const base = process.env.PUBLIC_BASE_PATH || '/';

export default defineConfig({
  site,
  base,
});
