/**
 * Experience Data
 * Work experience, education, and projects
 */

export const workExperience = [
  {
    id: 1,
    company: 'Cognifyz Technologies',
    position: 'Business Analyst Intern',
    type: 'Internship',
    location: 'India · Remote',
    startDate: '2025-07',
    endDate: '2025-08',
    duration: '2 months',
    current: false,
    logo: '/assets/images/companies/cognifyz.png',
    companyUrl: 'https://cognifyz.com',
    color: '#3b82f6',
    description: 'Worked on data analysis and business intelligence projects for multiple clients.',
    responsibilities: [
      'Conducted comprehensive business analysis for multiple client projects',
      'Analyzed large datasets using Python and Pandas for actionable insights',
      'Created data visualizations and reports to support business decisions',
      'Collaborated with cross-functional teams to identify process improvements',
      'Developed analytical models to optimize business operations'
    ],
    skills: ['Analytical Skills', 'Business Analytics', 'Python', 'Pandas', 'Machine Learning'],
    achievements: [
      'Successfully completed 3+ major analytical projects',
      'Improved data processing efficiency by 30%',
      'Presented findings to stakeholders with clear visualizations'
    ],
    technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Jupyter']
  }
];

export const education = [
  {
    id: 1,
    institution: 'Anna University Chennai',
    degree: 'BE CSE, Computer Science',
    field: 'Computer Science and Engineering',
    startDate: '2024-09',
    endDate: '2027-10',
    current: true,
    location: 'Chennai, India',
    logo: '/assets/images/education/anna-university.png',
    institutionUrl: 'https://www.annauniv.edu',
    color: '#10b981',
    grade: 'Pursuing Excellence',
    description: 'Pursuing Bachelor of Engineering in Computer Science with focus on software development and AI/ML.',
    highlights: [
      'Focus on full-stack development and software engineering',
      'Active participation in coding competitions and hackathons',
      'Member of technical clubs and communities'
    ],
    relevantCourses: [
      'Algorithms',
      'Machine Learning',
      'Data Structures',
      'Software Development Life Cycle (SDLC)',
      'Natural Language Processing (NLP)',
      'Deep Learning',
      'Database Management',
      'Computer Networks',
      'Operating Systems',
      'Web Technologies'
    ],
    activities: [
      'Member of Coding Club',
      'Participated in Smart India Hackathon',
      'Technical Blog Writer'
    ]
  },
  {
    id: 2,
    institution: 'GRT Mahalakshmi Vidyalaya',
    degree: 'High School',
    field: 'Biology Maths',
    startDate: '2021-06',
    endDate: '2023-09',
    current: false,
    location: 'India',
    logo: '/assets/images/education/grt.png',
    color: '#8b5cf6',
    grade: '90%',
    description: 'Completed higher secondary education with focus on Science and Mathematics.',
    highlights: [
      'Scored 90% in board examinations',
      'Strong foundation in mathematics and sciences',
      'Developed problem-solving skills through Differential Equations'
    ],
    relevantCourses: [
      'Differential Equations',
      'Physics',
      'Chemistry',
      'Mathematics',
      'Computer Science'
    ]
  }
];

export const academicProjects = [
  {
    id: 1,
    title: 'Student Timetable Management',
    type: 'Academic Project',
    association: 'Anna University Chennai',
    startDate: '2025-02',
    endDate: '2025-04',
    duration: '3 months',
    logo: '📱',
    color: '#8b5cf6',
    description: 'A full-stack MERN web application that enables educational institutions to manage class schedules and automate student attendance tracking.',
    fullDescription: `A comprehensive timetable and attendance management system built for educational institutions. Faculty can log in securely, access personalized timetables, mark attendance by subject and session, and generate real-time reports.`,
    techStack: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js', 'Express.js', 'MongoDB'],
    features: [
      'Dynamic timetable creation by course, section, and staff',
      'Real-time attendance marking and instant backend updates',
      'Student-wise and subject-wise attendance analytics',
      'Role-based access for Admin, Instructor, and Student',
      'JWT-based authentication and RESTful API architecture'
    ],
    impact: 'Eliminates manual tracking, boosts administrative efficiency, and delivers accurate, actionable attendance data through an intuitive, scalable digital interface.',
    github: 'https://github.com/yourusername/timetable-management',
    demo: null,
    achievements: [
      'Reduced manual attendance processing time by 70%',
      'Implemented for 500+ students',
      'Achieved 99% attendance accuracy'
    ]
  }
];

// Helper functions
export const getCurrentPosition = () => {
  return workExperience.find(exp => exp.current);
};

export const getCurrentEducation = () => {
  return education.find(edu => edu.current);
};

export const getAllExperience = () => {
  return [...workExperience, ...academicProjects].sort((a, b) => 
    new Date(b.startDate) - new Date(a.startDate)
  );
};

export const getExperienceYears = () => {
  const earliestDate = new Date(Math.min(
    ...workExperience.map(exp => new Date(exp.startDate)),
    ...academicProjects.map(proj => new Date(proj.startDate))
  ));
  const years = (new Date() - earliestDate) / (1000 * 60 * 60 * 24 * 365);
  return Math.max(1, Math.floor(years));
};

export const getTotalProjects = () => {
  return academicProjects.length;
};
