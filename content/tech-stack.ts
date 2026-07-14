import type { TechNode } from '@/types/content';

export const techNodes: TechNode[] = [
  { id: 'react', label: 'React', group: 'frontend' },
  { id: 'nextjs', label: 'Next.js', group: 'frontend' },
  { id: 'typescript', label: 'TypeScript', group: 'frontend' },
  { id: 'tailwind', label: 'Tailwind', group: 'frontend' },
  { id: 'threejs', label: 'Three.js', group: 'frontend' },
  { id: 'nodejs', label: 'Node.js', group: 'backend' },
  { id: 'express', label: 'Express', group: 'backend' },
  { id: 'fastapi', label: 'FastAPI', group: 'backend' },
  { id: 'python', label: 'Python', group: 'backend' },
  { id: 'tensorflow', label: 'TensorFlow', group: 'ai' },
  { id: 'sklearn', label: 'Scikit-learn', group: 'ai' },
  { id: 'nlp', label: 'NLP', group: 'ai' },
  { id: 'pandas', label: 'Pandas', group: 'data' },
  { id: 'postgres', label: 'PostgreSQL', group: 'data' },
  { id: 'mongodb', label: 'MongoDB', group: 'data' },
  { id: 'redis', label: 'Redis', group: 'data' },
  { id: 'docker', label: 'Docker', group: 'infra' },
  { id: 'azure', label: 'Azure', group: 'infra' },
  { id: 'aws', label: 'AWS', group: 'infra' },
  { id: 'gha', label: 'GitHub Actions', group: 'infra' }
];

export const groupColors: Record<TechNode['group'], string> = {
  frontend: '#3b82f6',
  backend: '#2dd4bf',
  ai: '#8b5cf6',
  data: '#60a5fa',
  infra: '#9ca3af'
};
