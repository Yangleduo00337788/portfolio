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
  image: {
    // 作品封面走 astro:assets，构建时转 WebP；SVG 例外，不参与转码
    default: { format: 'webp' },
  },
});
