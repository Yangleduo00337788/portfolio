/** 全站身份：姓名 / 一句话介绍 / 邮箱 / 社交链接 / 技术栈 / 履历，都在这一个文件里改 */
export const site = {
  author: '你的名字',
  role: '前端 / 全栈开发者',
  tagline: '把想法做成能用的东西。',
  email: 'you@example.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/your-name' },
    { label: '博客', href: 'https://example.com' },
  ],
  stack: ['TypeScript', 'React', 'Node.js', 'Python'],
  experience: [
    { period: '20XX — 现在', entry: '公司 / 岗位' },
    { period: '20XX — 20XX', entry: '学校 / 专业' },
  ],
} as const;
