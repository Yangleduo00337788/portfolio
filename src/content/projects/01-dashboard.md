---
title: 示例项目 · 数据看板
year: 2025
role: 独立开发
summary: 演示作品详情页的结构：背景、我做了什么、结果。替换成你自己的项目即可。
tech:
  - Vue 3
  - ECharts
  - FastAPI
links:
  demo: https://example.com
  repo: https://github.com/your-name/repo
cover: ../../assets/images/sample-cover.png
---

## 项目背景

用一两段说明它解决什么问题、给谁用。这里写的是占位内容。

## 我做了什么

- 搭建了前端图表层，支持 **30+ 指标** 的组合筛选
- 后端用 FastAPI 聚合数据，接口缓存 60 秒
- 处理了大数据量下的渲染卡顿问题

```js
const chart = echarts.init(el);
chart.setOption({ series });
```

## 结果

放链接、放数据、放反馈。正文里的图仍从 `public/images/` 按根路径引用（原样输出，不压缩）；
卡片封面写在 frontmatter 的 `cover` 里，走构建期压缩：

![占位图，替换成你的截图](/images/placeholder.svg)
