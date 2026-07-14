export type Accent = 'blue' | 'purple' | 'teal';

export interface SocialLink {
  label: string;
  href: string;
}

export interface SiteIdentity {
  name: string;
  firstName: string;
  roles: string[];
  founderLine: string;
  tagline: string;
  email: string;
  location: string;
  availability: string;
  resumeUrl: string;
  siteUrl: string;
  socials: SocialLink[];
}

export interface NavItem {
  id: string;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  kicker: string;
  description: string;
  highlights: string[];
  stack: string[];
  accent: Accent;
  year: string;
  role: string;
  image?: string;
  github?: string;
  live?: string;
}

export interface ArchiveProject {
  title: string;
  description: string;
  stack: string[];
  image?: string;
  github?: string;
  live?: string;
}

export interface SkillGroup {
  id: string;
  label: string;
  accent: Accent;
  skills: { name: string; level: number }[];
}

export interface TimelineItem {
  title: string;
  org: string;
  period: string;
  kind: 'work' | 'education' | 'venture';
  points: string[];
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  url: string;
}

export interface Award {
  title: string;
  event: string;
  year: string;
}

export interface TechNode {
  id: string;
  label: string;
  group: 'frontend' | 'backend' | 'ai' | 'data' | 'infra';
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  featured?: boolean;
  /** Sample entry shipped with the redesign — replace with real writing or CMS data. */
  isSample?: boolean;
}
