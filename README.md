# 作品集网站

Astro 静态站，构建产物是纯 HTML/CSS，不需要服务器。部署看 [DEPLOY.md](./DEPLOY.md)。

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # 产物在 dist/
npm run check      # 类型检查 + 构建 + 扫一遍产物里的断链
npm run preview    # 本地预览 dist
```

## 目录

```text
src/
├── site.config.ts              姓名 / 介绍 / 邮箱 / 社交链接 / 技术栈 / 履历
├── content.config.ts           作品字段的校验规则
├── content/projects/*.md       ← 每个作品一个文件
├── assets/images/              作品封面放这里（构建时压缩）
├── lib/projects.ts             作品列表开关（dev 含草稿）、排序与相关推荐
├── layouts/Base.astro          页头、页脚、head 里的 meta、主题初始化脚本
├── components/
│   ├── ProjectCard.astro       作品卡片
│   ├── ProjectNav.astro        详情页的上下篇 + 同技术栈推荐
│   ├── ProjectFilter.astro     首页标签筛选 / 关键词搜索
│   ├── ThemeToggle.astro       深浅色切换按钮
│   └── EmailLink.astro         页脚邮箱（源码里不出现连续地址）
├── styles/global.css           设计变量（配色、圆角、宽度）与打印样式都在这
└── pages/
    ├── index.astro             首页 = 作品网格 + 筛选条
    ├── projects/[id].astro     作品详情页，按文件名自动生成路由
    ├── about.astro
    ├── resume.astro            简历页，把 site.config + 作品列表拼成可打印的一页
    ├── 404.astro
    └── robots.txt.ts
public/images/                  正文里直接引用的图，原样输出不压缩
scripts/check-links.mjs         产物断链自检，npm run check 会调用
.github/workflows/check.yml     推送到 GitHub 时自动跑 npm run check
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
cover: ../../assets/images/project.webp # 可选，相对本 md 文件；卡片和详情页顶部都用它
draft: false                    # true 则不构建上线；本地 dev 仍能预览，带「草稿」标记
---

正文用 Markdown 写：背景、你做了什么、结果。
```

字段名写错或漏填必填项，`npm run build` 会直接报错并指出是哪个文件——这是 `content.config.ts` 里的 schema 在工作。

## 图片

分两条路，别混：

- **卡片封面**（frontmatter 的 `cover`）放 `src/assets/images/`，路径相对当前 `.md` 文件写，例如 `../../assets/images/dashboard.png`。列表卡片按 720px 宽出图，详情页顶部用同一张图按 1000px 出图，构建时缩放并转 WebP（`Image` 组件默认就转 WebP，`astro.config.mjs` 里不需要配）。原图直接丢进去就行，不用手动压。SVG 是例外：能引用但不转码。
- **正文里的图**（Markdown 中的 `![](/images/x.png)`）仍从 `public/images/` 按根路径引用，原样输出、不做压缩，这种还得自己控制在 200 KB 内。

## 筛选与分享

标签和搜索词会同步到地址栏（`/?tag=Vue+3&q=关键词`），复制这条地址发给别人，对方打开就是筛好的列表，刷新也不会丢。地址里的 tag 认不出来时自动退回「全部」，只按关键词筛。没开 JavaScript 的话筛选条整块隐藏，作品照常全部显示。

## 详情页的小东西

- 封面图显示在标题下方，和卡片用的是同一张 frontmatter `cover`，各自按自己的尺寸出压缩图
- 代码块右上角有「复制」：鼠标移进代码块才出现，触屏一直显示
- 正文里的图片可以点开看大图，点任意位置或按 Esc 关闭；Tab 聚焦到图片后回车也能打开
- `draft: true` 的作品只在 `npm run dev` 里出现，卡片和详情页会标「草稿」，`npm run build` 不生成这一页

## 简历

`/resume` 把 `src/site.config.ts` 里的联系方式、技术栈、履历和作品列表拼成一页，右上角有「打印 / 存成 PDF」按钮。打印样式会把页头页脚、主题按钮、筛选条、复制按钮和大图遮罩都去掉，只留正文和链接地址，所以不用另外维护一份 PDF。

## 分享缩略图

`public/images/og.png`（1200×630）是链接发到微信、X、Telegram 时显示的那张图，现在是一张占位图，换成你自己的。作品详情页会把自己的 `cover` 当分享图，但社交平台不认 SVG——封面写成 `.svg` 时自动退回这张默认图，所以想让用户看到截图就当 `cover` 放 png/jpg。

## 想再往前走一步

- 需要被搜索到再上 sitemap：`npx astro add sitemap`（会自动装 `@astrojs/sitemap` 并改配置），构建后生成 `sitemap-index.xml`，随后在 `src/pages/robots.txt.ts` 的响应文本里补一行 `Sitemap: ...`
- 把作品从 Markdown 换成 `.mdx`，可在正文里嵌交互组件
- 主题切换只有亮/暗两态，选择记在 `localStorage`；点过一次之后就不再跟随系统翻转，想要「跟随系统」第三态的话得自己在 `ThemeToggle.astro` 里加一档
- 首页筛选是纯前端过滤，作品几十个以内够用；再多就该拆 `/projects` 独立页分页
