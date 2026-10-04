import type { CollectionEntry } from 'astro:content';

type Project = CollectionEntry<'projects'>;

/** 首页网格和详情页的"上一篇/下一篇"必须用同一个排序，否则两边顺序对不上 */
export function byYearDesc(a: Project, b: Project): number {
  return b.data.year - a.data.year || a.data.title.localeCompare(b.data.title, 'zh');
}

/**
 * 首页网格、详情页的"上一篇/下一篇"和推荐必须用同一份列表，否则两边顺序对不上。
 * includeDrafts 只在 dev 传 true，方便草稿看排版；构建产物始终不含草稿。
 */
export function visibleProjects(projects: Project[], includeDrafts = false): Project[] {
  return projects.filter((p) => includeDrafts || !p.data.draft).sort(byYearDesc);
}

/** 共享技术栈越多排越前，一个都不重合就不推荐 */
export function relatedProjects(project: Project, all: Project[], limit = 3): Project[] {
  const own = new Set(project.data.tech);
  return all
    .filter((other) => other.id !== project.id)
    .map((other) => ({ other, shared: other.data.tech.filter((t) => own.has(t)).length }))
    .filter((pair) => pair.shared > 0)
    .sort((a, b) => b.shared - a.shared || byYearDesc(a.other, b.other))
    .slice(0, limit)
    .map((pair) => pair.other);
}
