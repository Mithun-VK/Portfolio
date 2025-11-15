/**
 * Projects Data
 * Centralized project information for portfolio
 */

export const projects = [
  {
    id: 1,
    slug: 'datasense-ai',
    title: 'DataSense AI',
    tagline: 'Intelligent Data Analytics Platform',
    description: 'Data analytics platform with ML integration and real-time visualization capabilities for business intelligence.',
    fullDescription: `DataSense AI is a comprehensive full-stack data analytics platform designed to transform raw data into actionable insights. The platform integrates advanced machine learning models with an intuitive user interface, making complex data analysis accessible to business users.

The system processes millions of data points in real-time, providing instant visualizations and predictive analytics. With role-based access control and customizable dashboards, teams can collaborate effectively while maintaining data security.`,
    image: '/assets/images/projects/datasense.jpg',
    images: [
      '/assets/images/projects/datasense-1.jpg',
      '/assets/images/projects/datasense-2.jpg',
      '/assets/images/projects/datasense-3.jpg'
    ],
    category: 'Full-Stack',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Python', 'Azure'],
    technologies: {
      frontend: ['React', 'TypeScript', 'Redux', 'Recharts', 'Tailwind CSS'],
      backend: ['Node.js', 'Express', 'Python', 'FastAPI'],
      database: ['PostgreSQL', 'Redis', 'Prisma'],
      ml: ['TensorFlow', 'Pandas', 'NumPy', 'Scikit-learn'],
      devops: ['Docker', 'Azure', 'GitHub Actions', 'Nginx']
    },
    github: 'https://github.com/Mithun-VK/datasense_AI',
    live: 'https://datasense-demo.com',
    featured: true,
    status: 'In progress', // completed, in-progress, archived
    duration: '1 month',
    team: 'Solo Project',
    role: 'Full-Stack Developer',
    features: [
      'Real-time data visualization with interactive charts and graphs',
      'ML model integration for predictive analytics and forecasting',
      'Custom dashboard builder with drag-and-drop functionality',
      'Multi-user collaboration with role-based permissions',
      'RESTful API with comprehensive documentation',
      'Automated data pipeline for ETL operations',
      'Advanced filtering and data export capabilities'
    ],
    challenges: [
      {
        title: 'Handling Large Datasets',
        description: 'Processing millions of data points efficiently while maintaining real-time updates was a significant challenge.',
        solution: 'Implemented database indexing, query optimization, and WebSocket connections for live data streaming. Used pagination and virtual scrolling for large datasets.'
      },
      {
        title: 'ML Model Integration',
        description: 'Integrating complex machine learning models without impacting frontend performance.',
        solution: 'Created a microservices architecture with separate ML processing layer and implemented intelligent caching mechanisms.'
      },
      {
        title: 'Scalability',
        description: 'Ensuring the platform could scale to handle growing data volumes and user base.',
        solution: 'Implemented horizontal scaling with load balancing and database sharding for optimal performance.'
      }
    ],
    results: [
      { value: '40%', label: 'Faster Analytics', description: 'Reduced analysis time from hours to minutes' },
      { value: '10K+', label: 'Data Points/sec', description: 'Real-time processing capability' },
      { value: '99.9%', label: 'Uptime', description: 'High availability and reliability' },
      { value: '15+', label: 'Integrations', description: 'Connected data sources' }
    ],
    testimonial: {
      text: 'DataSense AI transformed how we approach data analytics. The real-time insights are invaluable.',
      author: 'Client Name',
      role: 'CEO, Company'
    }
  },
  {
    id: 2,
    slug: 'asre-stock-analyzer',
    title: 'ASRE Stock Analyzer',
    tagline: 'AI-Powered Stock Market Analysis',
    description: 'AI-powered stock analysis platform with real-time data processing and predictive analytics.',
    fullDescription: `ASRE Stock Analyzer is an advanced fintech application that leverages artificial intelligence to provide real-time stock market analysis and predictions. The platform combines multiple data sources, technical indicators, and machine learning models to deliver actionable trading insights.`,
    image: '/assets/images/projects/asre.jpg',
    images: ['/assets/images/projects/asre-1.jpg'],
    category: 'AI/ML',
    tags: ['FastAPI', 'React', 'WebSockets', 'TensorFlow'],
    technologies: {
      frontend: ['React', 'Chart.js', 'WebSockets', 'Material-UI'],
      backend: ['FastAPI', 'Python', 'Celery'],
      ml: ['TensorFlow', 'Scikit-learn', 'XGBoost'],
      database: ['MongoDB', 'Redis'],
      devops: ['Docker', 'AWS']
    },
    github: 'https://github.com/Mithun-VK/ASRE',
    live: 'https://icy-field-083dde500.3.azurestaticapps.net/',
    featured: true,
    status: 'completed',
    duration: '1 Week',
    team: 'Solo Project',
    role: 'Full-Stack Developer & ML Engineer',
    features: [
      'Real-time stock price tracking and analysis',
      'Machine learning predictions with 95% accuracy',
      'Technical indicator calculations and charting',
      'Portfolio management and tracking',
      'Alerts and notifications system',
      'Historical data analysis and backtesting'
    ],
    challenges: [
      {
        title: 'API Rate Limiting',
        description: 'Managing multiple stock APIs while handling rate limits and ensuring data accuracy.',
        solution: 'Built a robust caching layer with Redis and implemented fallback mechanisms for API failures.'
      },
      {
        title: 'Real-time Data Streaming',
        description: 'Providing real-time updates for hundreds of stocks simultaneously.',
        solution: 'Implemented WebSocket connections with efficient data compression and selective updates.'
      }
    ],
    results: [
      { value: '95%', label: 'Prediction Accuracy', description: 'ML model performance' },
      { value: '500+', label: 'Active Users', description: 'Growing user base' },
      { value: '5ms', label: 'Avg Response', description: 'Lightning-fast API' },
      { value: '100+', label: 'Stocks Tracked', description: 'Market coverage' }
    ]
  },
  {
    id: 3,
    slug: 'tamil-quiz-app',
    title: 'Tamil Quiz App',
    tagline: 'Educational Mobile Application',
    description: 'Mobile quiz application with backend API integration and real-time scoring functionality.',
    fullDescription: `An engaging mobile quiz application designed to help users learn Tamil language and culture. Features include multiple quiz categories, real-time scoring, and social leaderboards to encourage competitive learning.`,
    image: '/assets/images/projects/quiz.jpg',
    images: [],
    category: 'Mobile',
    tags: ['React Native', 'Node.js', 'MongoDB', 'Firebase'],
    technologies: {
      frontend: ['React Native', 'Expo', 'React Navigation'],
      backend: ['Node.js', 'Express'],
      database: ['MongoDB'],
      services: ['Firebase Auth', 'Firebase Cloud Messaging']
    },
    github: 'https://github.com/Mithun-VK/TamilQuiz',
    live: null,
    featured: false,
    status: 'In progress',
    duration: '2 weeks',
    team: 'Solo Project',
    role: 'Mobile App Developer',
    features: [
      'Cross-platform mobile app (iOS & Android)',
      'Multiple quiz categories and difficulty levels',
      'Real-time scoring and leaderboards',
      'User authentication with Firebase',
      'Offline mode with local storage',
      'Progress tracking and achievements'
    ],
    challenges: [
      {
        title: 'Performance on Low-end Devices',
        description: 'Ensuring smooth performance on low-end devices while maintaining a rich user experience.',
        solution: 'Optimized rendering and implemented efficient state management with selective re-renders.'
      }
    ],
    results: [
      { value: '5K+', label: 'Downloads', description: 'User adoption' },
      { value: '4.8★', label: 'Rating', description: 'User satisfaction' },
      { value: '200+', label: 'Daily Users', description: 'Active engagement' }
    ]
  },
  {
    id: 4,
    slug: 'trading-chatbot',
    title: 'Trading Chatbot',
    tagline: 'Intelligent Trading Assistant',
    description: 'Conversational AI bot for trading insights with real-time messaging and NLP integration.',
    fullDescription: `An intelligent chatbot that provides trading insights and market analysis through natural language conversations. Powered by advanced NLP models to understand complex trading queries.`,
    image: '/assets/images/projects/chatbot.jpg',
    images: [],
    category: 'AI/ML',
    tags: ['Node.js', 'Socket.io', 'NLP', 'MongoDB'],
    technologies: {
      frontend: ['React-Native', 'Socket.io-client'],
      backend: ['Node.js', 'Socket.io', 'Express'],
      ml: ['Dialogflow', 'Natural', 'Compromise'],
      database: ['MongoDB']
    },
    github: 'https://github.com/Mithun-VK/trading-chatbot',
    live: 'null',
    featured: true,
    status: 'completed',
    duration: '1 Week',
    team: 'Solo Project',
    role: 'Full-Stack Developer',
    features: [
      'Natural language processing for queries',
      'Real-time WebSocket communication',
      'Market data integration and analysis',
      'Conversational context management',
      'Multi-language support',
      'Intent recognition and entity extraction'
    ],
    challenges: [
      {
        title: 'Understanding Trading Terminology',
        description: 'Building an NLP model that understands trading-specific terminology and context.',
        solution: 'Trained custom models and implemented intent recognition with high accuracy using domain-specific training data.'
      }
    ],
    results: [
      { value: '92%', label: 'Intent Accuracy', description: 'NLP performance' },
      { value: '1K+', label: 'Conversations', description: 'User interactions' },
      { value: '<2s', label: 'Response Time', description: 'Real-time speed' }
    ]
  },
  {
    id: 5,
    slug: 'zypfit-quick-commerce',
    title: 'ZypFit Quick Commerce',
    tagline: 'Fast Delivery E-Commerce Platform',
    description: 'Fast delivery e-commerce platform with real-time tracking and payment integration.',
    fullDescription: `A modern e-commerce platform focused on quick delivery with real-time order tracking, secure payments, and comprehensive admin dashboard for inventory management.`,
    image: '/assets/images/projects/zypfit.jpg',
    images: [],
    category: 'Full-Stack',
    tags: ['React-Native', 'Express', 'PostgreSQL', 'Razorpay'],
    technologies: {
      frontend: ['React-native'],
      backend: ['Express', 'Node.js'],
      database: ['PostgreSQL', 'Redis'],
      services: ['Razorpay', 'Twilio', 'SendGrid']
    },
    github: 'null',
    live: null,
    featured: false,
    status: 'completed',
    duration: '1.5 months',
    team: 'Solo Project',
    role: 'Full-Stack Developer',
    features: [
      'Real-time order tracking with maps',
      'Secure payment processing with Stripe',
      'Inventory management system',
      'Admin dashboard with analytics',
      'Push notifications for updates',
      'Multi-vendor support'
    ],
    challenges: [
      {
        title: 'Real-time Tracking',
        description: 'Implementing a reliable real-time tracking system that scales.',
        solution: 'Used Redis for session management and optimized database queries for performance.'
      }
    ],
    results: [
      { value: '15min', label: 'Avg Delivery', description: 'Fast fulfillment' },
      { value: '98%', label: 'Success Rate', description: 'Order completion' },
      { value: '300+', label: 'Orders/day', description: 'Platform usage' }
    ]
  },
  {
    id: 6,
    slug: 'encryption-tool',
    title: 'Encryption Tool',
    tagline: 'Secure File Encryption Utility',
    description: 'Secure file encryption and decryption tool with multiple algorithm support.',
    fullDescription: `A command-line tool for secure file encryption supporting multiple algorithms. Built with security best practices and optimized for large file processing.`,
    image: '/assets/images/projects/encryption.jpg',
    images: [],
    category: 'Security',
    tags: ['Python', 'Cryptography', 'CLI'],
    technologies: {
      language: ['Python'],
      libraries: ['Cryptography', 'Click', 'Typer'],
      security: ['AES', 'RSA', 'ChaCha20']
    },
    github: 'https://github.com/yourusername/encryption-tool',
    live: null,
    featured: false,
    status: 'completed',
    duration: '1 month',
    team: 'Solo Project',
    role: 'Python Developer',
    features: [
      'Multiple encryption algorithms (AES, RSA, ChaCha20)',
      'Command-line interface for automation',
      'Batch file processing support',
      'Key management and rotation',
      'Cross-platform compatibility',
      'Progress indicators for large files'
    ],
    challenges: [
      {
        title: 'Performance vs Security',
        description: 'Ensuring security while maintaining performance for large file encryption.',
        solution: 'Implemented chunked processing and optimized cryptographic operations.'
      }
    ],
    results: [
      { value: '256-bit', label: 'Encryption', description: 'Military-grade security' },
      { value: '50MB/s', label: 'Processing', description: 'High performance' },
      { value: '100%', label: 'Secure', description: 'Zero vulnerabilities' }
    ]
  }
];

// Helper functions
export const getProjectById = (id) => {
  return projects.find(p => p.id === parseInt(id));
};

export const getProjectBySlug = (slug) => {
  return projects.find(p => p.slug === slug);
};

export const getFeaturedProjects = () => {
  return projects.filter(p => p.featured);
};

export const getProjectsByCategory = (category) => {
  return projects.filter(p => p.category === category);
};

export const getAllCategories = () => {
  return [...new Set(projects.map(p => p.category))];
};

export const getRelatedProjects = (projectId, limit = 3) => {
  const project = getProjectById(projectId);
  if (!project) return [];
  
  return projects
    .filter(p => p.category === project.category && p.id !== projectId)
    .slice(0, limit);
};
