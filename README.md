# 作品集网站

Astro 静态站，构建产物是纯 HTML/CSS，不需要服务器。部署看 [DEPLOY.md](./DEPLOY.md)。

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # 产物在 dist/
npm run check      # 构建 + 扫一遍产物里的断链
npm run preview    # 本地预览 dist
```

## 目录

```text
src/
├── site.config.ts              姓名 / 一句话介绍 / 邮箱 / 社交链接
├── content.config.ts           作品字段的校验规则
├── content/projects/*.md       ← 每个作品一个文件
├── layouts/Base.astro          页头、页脚、head 里的 meta
├── components/ProjectCard.astro
├── styles/global.css           设计变量（配色、圆角、宽度）都在这
└── pages/
    ├── index.astro             首页 = 作品网格
    ├── projects/[id].astro     作品详情页，按文件名自动生成路由
    ├── about.astro
    ├── 404.astro
    └── robots.txt.ts
public/images/                  截图放这里
scripts/check-links.mjs         产物断链自检，npm run check 会调用
```

## 加一个作品

在 `src/content/projects/` 新建 `04-你的项目.md`，文件名（去掉 `.md`）就是网址：

```markdown
---
title: 项目名称
year: 2026
role: 独立开发
summary: 一句话说明，显示在卡片和详情页顶部。
tech:
  - TypeScript
  - Astro
links:
  demo: https://example.com     # 可选
  repo: https://github.com/... # 可选
cover: /images/project.webp     # 可选，不填则卡片显示标题首字
draft: false                    # true 则整页不构建
---

正文用 Markdown 写：背景、你做了什么、结果。
```

字段名写错或漏填必填项，`npm run build` 会直接报错并指出是哪个文件——这是 `content.config.ts` 里的 schema 在工作。

## 图片

`public/` 下的文件按原样输出，不做压缩。截图先转 WebP/AVIF 再放进来（单张控制在 200 KB 内），详情页和卡片引用同一张即可。

## 想再往前走一步

- 需要被搜索到再上 sitemap：`npx astro add sitemap`（会自动装 `@astrojs/sitemap` 并改配置），构建后生成 `sitemap-index.xml`，随后在 `src/pages/robots.txt.ts` 的响应文本里补一行 `Sitemap: ...`
- 把作品从 Markdown 换成 `.mdx`，可在正文里嵌交互组件
- 深色模式已跟随系统（`prefers-color-scheme`），要手动切换按钮的话改 `global.css` 的变量作用域
