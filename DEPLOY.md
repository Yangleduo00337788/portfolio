# 部署到 Cloudflare Pages（免费）

免费额度：静态流量不计费、每月 500 次构建、赠送 `*.pages.dev` 二级域名、支持自有域名和 HTTPS。个人作品集用不完。

## 上线前先改这 4 处

1. `astro.config.mjs` → `site` 换成你的正式地址（先不填也能部署，只影响 canonical/OG 绝对链接）
2. `src/site.config.ts` → 姓名、一句话介绍、邮箱、社交链接
3. `src/content/projects/` → 删掉 `01/02/03` 三个示例，换成你自己的 `.md`
4. `public/images/` → 放截图，frontmatter 里写 `cover: /images/xxx.webp`

## 方式 A：Git 自动部署（推荐）

1. 把代码推到 GitHub 私有或公开仓库均可
2. Cloudflare 控制台 → **Workers & Pages → Create → Pages → Connect to Git**
3. 选仓库后填这三项：

   | 设置项 | 值 |
   | --- | --- |
   | Framework preset | `Astro` |
   | Build command | `npm run build` |
   | Build output directory | `dist` |

4. **环境变量加一条 `NODE_VERSION = 22`**。本项目要求 Node ≥ 22.12，Pages 构建机默认版本可能更低，不设置会在构建时报错。
5. Deploy。之后每次 `git push` 自动重新构建；改 `src/content/` 下的 md 就是发新版。

## 方式 B：命令行直接上传（不建仓库）

```bash
npm run build
npx wrangler login            # 首次，浏览器授权
npx wrangler pages deploy dist --project-name portfolio
```

得到 `https://portfolio.pages.dev`。重复上传会开新的预览版本，正式版本跟随最后一次部署。

## 方式 C：控制台拖拽上传

Workers & Pages → Create → Pages → **Upload assets**，把本地 `dist` 文件夹整个拖进去。零配置，适合先看看效果。

## 绑自有域名

项目页 → **Custom domains → Set up a custom domain**。域名已备案与否都不影响 `*.pages.dev`；绑自己的域名时，Cloudflare 的节点对国内直连不稳定，属正常现象，若主要给国内访客看，考虑换用带国内节点的托管或自备 CDN。

## 验证是否生效

推之前先本地跑一次 `npm run check`，它会构建并扫一遍 `dist/`，报告 href/src 里指向不存在文件的链接（图片忘了放、路径打错都会被抓出来）。

```bash
curl -sI https://你的项目.pages.dev/
curl -s  https://你的项目.pages.dev/robots.txt
```

第一条能拿到响应头（`/` 可能是 200，也可能是跳转到带斜杠的地址，都算正常），第二条应输出 `User-agent: *`。
