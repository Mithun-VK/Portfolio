import type { NavItem, SiteIdentity } from '@/types/content';

export const site: SiteIdentity = {
  name: 'Mithun V K',
  firstName: 'Mithun',
  roles: ['Software Engineer', 'AI Engineer', 'Entrepreneur', 'Quant Finance Enthusiast'],
  founderLine: 'Founder of Catalyst Labs',
  tagline:
    'I design and engineer premium software products — from AI systems to quantitative finance tools.',
  email: 'mithunvk216@gmail.com',
  location: 'Chennai, India',
  availability: 'Available for select projects',
  resumeUrl: '/assets/resume.pdf',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mithunvk.vercel.app',
  socials: [
    { label: 'GitHub', href: 'https://github.com/Mithun-VK' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mithun-v-k-76625927b/' },
    { label: 'Email', href: 'mailto:mithunvk216@gmail.com' }
  ]
};

export const navItems: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' }
];

export const principles = [
  {
    title: 'Mission',
    body: 'Build products that compress hours of manual work into seconds of insight — software that earns trust through precision.'
  },
  {
    title: 'Vision',
    body: 'A studio where AI, finance and engineering meet: small teams shipping products with the polish of companies a hundred times their size.'
  },
  {
    title: 'Principles',
    body: 'Problem first. Measure everything. Ship fast, refine relentlessly. Design is not decoration — it is how the product thinks.'
  }
] as const;
