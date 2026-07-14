import type { ArchiveProject, Project } from '@/types/content';

/**
 * Featured, cinematic projects — one full-screen panel each.
 * Copy for Catalyst Labs, SafeMerchant, Crypto Arbitrage and Chronous Forecast
 * is intentionally metric-free scaffolding: edit freely.
 */
export const featuredProjects: Project[] = [
  {
    slug: 'catalyst-labs',
    title: 'Catalyst Labs',
    kicker: 'Venture · AI Product Studio',
    description:
      'A product studio at the intersection of intelligence and finance — designing and shipping AI-native tools with the polish of consumer software.',
    highlights: [
      'Product strategy, engineering and design under one roof',
      'AI-first architecture across every product line',
      'Built for speed: idea to shipped product in weeks'
    ],
    stack: ['Next.js', 'TypeScript', 'Python', 'Azure'],
    accent: 'blue',
    year: '2025 —',
    role: 'Founder'
  },
  {
    slug: 'safemerchant',
    title: 'SafeMerchant',
    kicker: 'Fintech · Risk Platform',
    description:
      'Merchant risk and payment-safety platform: real-time scoring, anomaly detection and clear decisioning for teams that move money.',
    highlights: [
      'Real-time transaction risk scoring',
      'Anomaly detection tuned for payment flows',
      'Human-readable decisions, not black boxes'
    ],
    stack: ['React', 'FastAPI', 'PostgreSQL', 'Scikit-learn'],
    accent: 'teal',
    year: '2025',
    role: 'Product Engineer'
  },
  {
    slug: 'crypto-arbitrage',
    title: 'Crypto Arbitrage Platform',
    kicker: 'Quant · Trading Systems',
    description:
      'Cross-exchange spread detection and execution tooling — order-book ingestion, latency-aware routing and rigorous backtesting.',
    highlights: [
      'Multi-exchange order-book ingestion over WebSockets',
      'Spread detection with fee- and slippage-aware models',
      'Backtesting engine for strategy validation'
    ],
    stack: ['Python', 'WebSockets', 'Redis', 'Pandas'],
    accent: 'purple',
    year: '2025',
    role: 'Quant Developer'
  },
  {
    slug: 'chronous-forecast',
    title: 'Chronous Forecast',
    kicker: 'AI · Time-Series Engine',
    description:
      'A forecasting engine that takes time-series data from raw to decision — feature pipelines, model selection and confidence-aware predictions.',
    highlights: [
      'Automated feature pipelines for temporal data',
      'Model selection across statistical and deep approaches',
      'Forecasts shipped with uncertainty, not false certainty'
    ],
    stack: ['Python', 'TensorFlow', 'FastAPI', 'React'],
    accent: 'blue',
    year: '2025',
    role: 'ML Engineer'
  },
  {
    slug: 'attendance-system',
    title: 'Attendance System',
    kicker: 'Full-Stack · MERN',
    description:
      'Timetable and attendance platform for educational institutions — role-based access, real-time marking and instant analytics for 500+ students.',
    highlights: [
      'Cut manual attendance processing time by 70%',
      'Deployed for 500+ students with 99% accuracy',
      'JWT auth with Admin / Instructor / Student roles'
    ],
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    accent: 'teal',
    year: '2025',
    role: 'Full-Stack Developer'
  }
];

/** Earlier shipped work — compact archive strip below the featured reel. */
export const archiveProjects: ArchiveProject[] = [
  {
    title: 'DataSense AI',
    description: 'Data analytics platform with ML integration and real-time visualization.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Python'],
    image: '/assets/images/projects/DataSense1.png',
    github: 'https://github.com/Mithun-VK/datasense_AI'
  },
  {
    title: 'ASRE Stock Analyzer',
    description: 'AI-powered stock analysis with real-time data and 95%-accuracy predictions.',
    stack: ['FastAPI', 'React', 'TensorFlow'],
    image: '/assets/images/projects/asre.png',
    github: 'https://github.com/Mithun-VK/ASRE',
    live: 'https://icy-field-083dde500.3.azurestaticapps.net/'
  },
  {
    title: 'Trading Chatbot',
    description: 'Conversational AI for trading insights with NLP intent recognition.',
    stack: ['Node.js', 'Socket.io', 'NLP'],
    github: 'https://github.com/Mithun-VK/trading-chatbot'
  }
];
