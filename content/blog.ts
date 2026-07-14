import type { BlogPost } from '@/types/content';

/**
 * CMS-ready blog entries. These three are sample drafts (`isSample: true`) —
 * swap them for real writing or wire this array to a CMS fetch in `lib/`.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: 'crypto-arbitrage-engine',
    title: 'Designing a Cross-Exchange Crypto Arbitrage Engine',
    excerpt:
      'Order books, latency budgets and why most arbitrage "opportunities" die in the fee model — notes from building a spread-detection system.',
    category: 'Quant Finance',
    date: '2026-06-18',
    readingTime: '9 min',
    featured: true,
    isSample: true
  },
  {
    slug: 'notebook-to-production-ml',
    title: 'From Notebook to Production: Shipping ML Forecasts',
    excerpt:
      'The gap between a 95%-accuracy notebook and a model users trust is engineering, not math. A practical pipeline walkthrough.',
    category: 'AI Engineering',
    date: '2026-04-02',
    readingTime: '7 min',
    isSample: true
  },
  {
    slug: 'design-systems-for-founders',
    title: 'Design Systems for Solo Founders',
    excerpt:
      'How a one-person team keeps ten products looking like one company — tokens, primitives and ruthless reuse.',
    category: 'Engineering',
    date: '2026-02-11',
    readingTime: '6 min',
    isSample: true
  }
];

export const blogCategories = ['All', ...Array.from(new Set(blogPosts.map(p => p.category)))];
