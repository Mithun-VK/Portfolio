/**
 * Skills Data
 * Centralized skills information based on LinkedIn profile
 */

export const skillsData = [
  {
    id: 1,
    category: 'Frontend Development',
    icon: '🎨',
    color: '#3b82f6',
    description: 'Modern frontend technologies and frameworks',
    skills: [
      { name: 'React.js', level: 90, years: '2+', endorsed: 15 },
      { name: 'HTML5', level: 92, years: '3+', endorsed: 20 },
      { name: 'CSS3', level: 90, years: '3+', endorsed: 18 },
      { name: 'JavaScript', level: 88, years: '3+', endorsed: 22 },
      { name: 'HTML', level: 92, years: '3+', endorsed: 20 }
    ]
  },
  {
    id: 2,
    category: 'Backend Development',
    icon: '⚙️',
    color: '#10b981',
    description: 'Server-side technologies and APIs',
    skills: [
      { name: 'Node.js', level: 88, years: '2+', endorsed: 14 },
      { name: 'Express.js', level: 87, years: '2+', endorsed: 12 },
      { name: 'Python', level: 85, years: '2+', endorsed: 16 },
      { name: 'MongoDB', level: 86, years: '2+', endorsed: 10 }
    ]
  },
  {
    id: 3,
    category: 'Database & Query',
    icon: '💾',
    color: '#8b5cf6',
    description: 'Database management and optimization',
    skills: [
      { name: 'SQL', level: 90, years: '2+', endorsed: 18 },
      { name: 'PL/SQL', level: 88, years: '2+', endorsed: 8 },
      { name: 'MongoDB', level: 86, years: '2+', endorsed: 10 },
      { name: 'Databases', level: 87, years: '2+', endorsed: 12 }
    ]
  },
  {
    id: 4,
    category: 'AI & Machine Learning',
    icon: '🤖',
    color: '#ef4444',
    description: 'Machine learning and artificial intelligence',
    skills: [
      { name: 'Machine Learning', level: 85, years: '2+', endorsed: 15 },
      { name: 'Deep Learning', level: 83, years: '1+', endorsed: 12 },
      { name: 'Natural Language Processing', level: 82, years: '1+', endorsed: 10 },
      { name: 'Artificial Intelligence', level: 84, years: '2+', endorsed: 14 }
    ]
  },
  {
    id: 5,
    category: 'Data & Analytics',
    icon: '📊',
    color: '#f59e0b',
    description: 'Data analysis and business intelligence',
    skills: [
      { name: 'Business Analytics', level: 88, years: '1+', endorsed: 8 },
      { name: 'Data Analysis', level: 87, years: '2+', endorsed: 12 },
      { name: 'Pandas', level: 85, years: '2+', endorsed: 10 },
      { name: 'Statistics', level: 83, years: '2+', endorsed: 9 },
      { name: 'Quantitative Analytics', level: 82, years: '1+', endorsed: 6 }
    ]
  },
  {
    id: 6,
    category: 'Programming Languages',
    icon: '💻',
    color: '#06b6d4',
    description: 'Core programming languages',
    skills: [
      { name: 'C++', level: 85, years: '3+', endorsed: 15 },
      { name: 'Java', level: 84, years: '2+', endorsed: 12 },
      { name: 'C', level: 86, years: '3+', endorsed: 16 },
      { name: 'Python', level: 85, years: '2+', endorsed: 18 },
      { name: 'JavaScript', level: 88, years: '3+', endorsed: 20 }
    ]
  },
  {
    id: 7,
    category: 'Tools & Design',
    icon: '🛠️',
    color: '#ec4899',
    description: 'Design and productivity tools',
    skills: [
      { name: 'Canva', level: 82, years: '2+', endorsed: 8 },
      { name: 'DaVinci Resolve', level: 80, years: '1+', endorsed: 5 },
      { name: 'Video Editing', level: 81, years: '2+', endorsed: 7 }
    ]
  },
  {
    id: 8,
    category: 'Soft Skills',
    icon: '🤝',
    color: '#14b8a6',
    description: 'Professional and interpersonal skills',
    skills: [
      { name: 'Problem Solving', level: 90, years: '3+', endorsed: 20 },
      { name: 'Creative Problem Solving', level: 88, years: '3+', endorsed: 15 },
      { name: 'Analytical Skills', level: 89, years: '2+', endorsed: 18 },
      { name: 'Entrepreneurship', level: 75, years: '1+', endorsed: 6 }
    ]
  },
  {
    id: 9,
    category: 'Domain Knowledge',
    icon: '📚',
    color: '#a855f7',
    description: 'Specialized knowledge areas',
    skills: [
      { name: 'Computer Science', level: 87, years: '3+', endorsed: 16 },
      { name: 'Algorithms', level: 86, years: '3+', endorsed: 14 },
      { name: 'Data Structures', level: 85, years: '3+', endorsed: 15 },
      { name: 'SDLC', level: 83, years: '2+', endorsed: 10 },
      { name: 'Finance', level: 70, years: '1+', endorsed: 5 },
      { name: 'Financial Markets', level: 68, years: '1+', endorsed: 4 },
      { name: 'Differential Equations', level: 90, years: '2+', endorsed: 8 }
    ]
  },
  {
    id: 10,
    category: 'Emerging Technologies',
    icon: '🚀',
    color: '#f97316',
    description: 'Latest technologies and trends',
    skills: [
      { name: 'Prompt Engineering', level: 80, years: '1+', endorsed: 6 }
    ]
  }
];

export const certifications = [
  {
    id: 1,
    name: 'IBM Certified AI Developer',
    issuer: 'IBM',
    date: '2025-07',
    credentialId: 'f516fa49-364e-45a2-bddf-ab8a05b0d8f4',
    url: 'https://www.credly.com/badges/f516fa49-364e-45a2-bddf-ab8a05b0d8f4/public_url',
    skills: ['Machine Learning', 'Deep Learning', 'Natural Language Processing'],
    logo: '/assets/images/certifications/ibm.png'
  },
  {
    id: 2,
    name: 'Oracle Database SQL Certified Associate',
    issuer: 'HackerRank',
    date: '2025-02',
    credentialId: '43A2AC9AD83E',
    url: 'https://www.hackerrank.com/certificates/43a2ac9ad83e',
    skills: ['PL/SQL', 'SQL', 'Problem Solving', 'JavaScript'],
    logo: '/assets/images/certifications/oracle.png'
  },
  {
    id: 3,
    name: 'Programming in C Certification',
    issuer: 'SkillRack',
    date: '2024-01',
    credentialId: '490574/WTV',
    url: 'https://www.skillrack.com/cert/490574/WTV',
    skills: ['C Programming'],
    logo: '/assets/images/certifications/skillrack.png'
  }
];

// Helper functions
export const getSkillsByCategory = (category) => {
  return skillsData.find(s => s.category === category);
};

export const getAllSkillCategories = () => {
  return skillsData.map(s => s.category);
};

export const getTotalSkillsCount = () => {
  return skillsData.reduce((total, category) => total + category.skills.length, 0);
};

export const getTopSkills = (limit = 10) => {
  const allSkills = skillsData.flatMap(category => 
    category.skills.map(skill => ({
      ...skill,
      category: category.category,
      color: category.color
    }))
  );
  return allSkills.sort((a, b) => b.level - a.level).slice(0, limit);
};
