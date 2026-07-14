import type { Award, Certification, Stat } from '@/types/content';

export const stats: Stat[] = [
  { value: 8, suffix: '+', label: 'Projects shipped' },
  { value: 20, suffix: '+', label: 'Technologies in production' },
  { value: 95, suffix: '%', label: 'Best ML model accuracy' },
  { value: 3, suffix: '', label: 'Professional certifications' }
];

export const certifications: Certification[] = [
  {
    name: 'IBM Certified AI Developer',
    issuer: 'IBM',
    year: '2025',
    url: 'https://www.credly.com/badges/f516fa49-364e-45a2-bddf-ab8a05b0d8f4/public_url'
  },
  {
    name: 'Oracle Database SQL Certified Associate',
    issuer: 'HackerRank',
    year: '2025',
    url: 'https://www.hackerrank.com/certificates/43a2ac9ad83e'
  },
  {
    name: 'Programming in C Certification',
    issuer: 'SkillRack',
    year: '2024',
    url: 'https://www.skillrack.com/cert/490574/WTV'
  }
];

export const awards: Award[] = [
  { title: '1st Place', event: "Strategia'26", year: '2026' },
  { title: 'Participant', event: 'Smart India Hackathon', year: '2025' }
];
