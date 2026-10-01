// @ts-check
// 部署到 Cloudflare Pages 后，把这里换成你的正式域名（用于 canonical / sitemap / OG 绝对链接）
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://your-name.pages.dev',
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
});
