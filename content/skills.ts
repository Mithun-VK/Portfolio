import type { SkillGroup } from '@/types/content';

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    accent: 'blue',
    skills: [
      { name: 'React', level: 90 },
      { name: 'Next.js', level: 86 },
      { name: 'TypeScript', level: 85 },
      { name: 'JavaScript', level: 88 }
    ]
  },
  {
    id: 'backend',
    label: 'Backend',
    accent: 'teal',
    skills: [
      { name: 'Node.js', level: 88 },
      { name: 'Express', level: 87 },
      { name: 'FastAPI', level: 84 },
      { name: 'Python', level: 85 }
    ]
  },
  {
    id: 'ai-ml',
    label: 'AI · ML',
    accent: 'purple',
    skills: [
      { name: 'Machine Learning', level: 85 },
      { name: 'Deep Learning', level: 83 },
      { name: 'NLP', level: 82 },
      { name: 'TensorFlow', level: 80 }
    ]
  },
  {
    id: 'finance',
    label: 'Finance',
    accent: 'blue',
    skills: [
      { name: 'Quantitative Analytics', level: 82 },
      { name: 'Financial Markets', level: 72 },
      { name: 'Statistics', level: 83 },
      { name: 'Pandas', level: 85 }
    ]
  },
  {
    id: 'cloud',
    label: 'Cloud',
    accent: 'teal',
    skills: [
      { name: 'Azure', level: 80 },
      { name: 'AWS', level: 72 },
      { name: 'Docker', level: 78 },
      { name: 'Nginx', level: 70 }
    ]
  },
  {
    id: 'devops',
    label: 'DevOps',
    accent: 'purple',
    skills: [
      { name: 'GitHub Actions', level: 80 },
      { name: 'CI/CD', level: 78 },
      { name: 'PostgreSQL', level: 86 },
      { name: 'Redis', level: 76 }
    ]
  }
];

/** Flat ring of technologies for the orbit visual. */
export const orbitTech: string[][] = [
  ['React', 'Next.js', 'TypeScript', 'Tailwind'],
  ['Python', 'FastAPI', 'Node.js', 'PostgreSQL', 'Redis'],
  ['TensorFlow', 'Pandas', 'Scikit-learn', 'Azure', 'Docker', 'AWS']
];
