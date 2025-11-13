import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar/Navbar';
import Footer from '../components/common/Footer/Footer';
import Button from '../components/common/Button/Button';
import Card from '../components/common/Card/Card';
import './ProjectDetails.css';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Import the same projects data from Projects.jsx
  const projects = [
    {
      id: 1,
      slug: 'datasense-ai',
      title: 'DataSense AI',
      description: 'Data analytics platform with ML integration and real-time visualization capabilities for business intelligence.',
      image: '/assets/images/projects/datasense.jpg',
      category: 'Full-Stack',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Python', 'Azure'],
      github: 'https://github.com/yourusername/datasense',
      live: 'https://datasense-demo.com',
      featured: true,
      features: [
        'Real-time data visualization with interactive charts',
        'ML model integration for predictive analytics',
        'Custom dashboard builder with drag-and-drop',
        'Multi-user collaboration and role management',
        'RESTful API with comprehensive documentation'
      ],
      challenges: 'The main challenge was handling large datasets efficiently while maintaining real-time updates. Implemented database indexing, query optimization, and WebSocket connections for live data streaming.',
      results: [
        { value: '40%', label: 'Faster Analytics' },
        { value: '10K+', label: 'Data Points/sec' },
        { value: '99.9%', label: 'Uptime' }
      ]
    },
    {
      id: 2,
      slug: 'asre-stock-analyzer',
      title: 'ASRE Stock Analyzer',
      description: 'AI-powered stock analysis platform with real-time data processing and predictive analytics.',
      image: '/assets/images/projects/asre.jpg',
      category: 'AI/ML',
      tags: ['FastAPI', 'React', 'WebSockets', 'TensorFlow'],
      github: 'https://github.com/yourusername/asre',
      live: 'https://asre-demo.com',
      featured: true,
      features: [
        'Real-time stock price tracking and analysis',
        'Machine learning predictions with TensorFlow',
        'Technical indicator calculations and charting',
        'Portfolio management and tracking',
        'Alerts and notifications system'
      ],
      challenges: 'Integrating multiple stock APIs while ensuring data accuracy and handling rate limits. Built a robust caching layer and implemented fallback mechanisms for API failures.',
      results: [
        { value: '95%', label: 'Prediction Accuracy' },
        { value: '500+', label: 'Active Users' },
        { value: '5ms', label: 'Avg Response' }
      ]
    },
    {
      id: 3,
      slug: 'tamil-quiz-app',
      title: 'Tamil Quiz App',
      description: 'Mobile quiz application with backend API integration and real-time scoring functionality.',
      image: '/assets/images/projects/quiz.jpg',
      category: 'Mobile',
      tags: ['React Native', 'Node.js', 'MongoDB', 'Firebase'],
      github: 'https://github.com/yourusername/tamil-quiz',
      live: null,
      featured: false,
      features: [
        'Cross-platform mobile app (iOS & Android)',
        'Multiple quiz categories and difficulty levels',
        'Real-time scoring and leaderboards',
        'User authentication with Firebase',
        'Offline mode with local storage'
      ],
      challenges: 'Ensuring smooth performance on low-end devices while maintaining a rich user experience. Optimized rendering and implemented efficient state management.',
      results: [
        { value: '5K+', label: 'Downloads' },
        { value: '4.8★', label: 'Rating' },
        { value: '200+', label: 'Daily Users' }
      ]
    },
    {
      id: 4,
      slug: 'trading-chatbot',
      title: 'Trading Chatbot',
      description: 'Conversational AI bot for trading insights with real-time messaging and NLP integration.',
      image: '/assets/images/projects/chatbot.jpg',
      category: 'AI/ML',
      tags: ['Node.js', 'Socket.io', 'NLP', 'MongoDB'],
      github: 'https://github.com/yourusername/trading-chatbot',
      live: 'https://chatbot-demo.com',
      featured: true,
      features: [
        'Natural language processing for queries',
        'Real-time WebSocket communication',
        'Market data integration and analysis',
        'Conversational context management',
        'Multi-language support'
      ],
      challenges: 'Building an NLP model that understands trading-specific terminology and context. Trained custom models and implemented intent recognition with high accuracy.',
      results: [
        { value: '92%', label: 'Intent Accuracy' },
        { value: '1K+', label: 'Conversations' },
        { value: '<2s', label: 'Response Time' }
      ]
    },
    {
      id: 5,
      slug: 'zypfit-quick-commerce',
      title: 'ZypFit Quick Commerce',
      description: 'Fast delivery e-commerce platform with real-time tracking and payment integration.',
      image: '/assets/images/projects/zypfit.jpg',
      category: 'Full-Stack',
      tags: ['React', 'Express', 'PostgreSQL', 'Stripe'],
      github: 'https://github.com/yourusername/zypfit',
      live: null,
      featured: false,
      features: [
        'Real-time order tracking with maps',
        'Secure payment processing with Stripe',
        'Inventory management system',
        'Admin dashboard with analytics',
        'Push notifications for updates'
      ],
      challenges: 'Implementing a reliable real-time tracking system that scales. Used Redis for session management and optimized database queries for performance.',
      results: [
        { value: '15min', label: 'Avg Delivery' },
        { value: '98%', label: 'Success Rate' },
        { value: '300+', label: 'Orders/day' }
      ]
    },
    {
      id: 6,
      slug: 'encryption-tool',
      title: 'Encryption Tool',
      description: 'Secure file encryption and decryption tool with multiple algorithm support.',
      image: '/assets/images/projects/encryption.jpg',
      category: 'Security',
      tags: ['Python', 'Cryptography', 'CLI'],
      github: 'https://github.com/yourusername/encryption-tool',
      live: null,
      featured: false,
      features: [
        'Multiple encryption algorithms (AES, RSA, ChaCha20)',
        'Command-line interface for automation',
        'Batch file processing support',
        'Key management and rotation',
        'Cross-platform compatibility'
      ],
      challenges: 'Ensuring security while maintaining performance for large file encryption. Implemented chunked processing and optimized cryptographic operations.',
      results: [
        { value: '256-bit', label: 'Encryption' },
        { value: '50MB/s', label: 'Processing' },
        { value: '100%', label: 'Secure' }
      ]
    }
  ];

  useEffect(() => {
    // Find project by slug or id
    const foundProject = projects.find(p => 
      p.slug === id || p.id === parseInt(id)
    );
    
    setTimeout(() => {
      if (foundProject) {
        setProject(foundProject);
        document.title = `${foundProject.title} - Your Name Portfolio`;
      }
      setLoading(false);
    }, 300);
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="project-details">
        <Navbar />
        <div className="project-details__loading">
          <div className="spinner"></div>
          <p>Loading project details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    navigate('/404');
    return null;
  }

  const BackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="19" y1="12" x2="5" y2="12"/>
      <polyline points="12 19 5 12 12 5"/>
    </svg>
  );

  const GithubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );

  const ExternalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );

  // Get related projects (same category, exclude current)
  const relatedProjects = projects
    .filter(p => p.category === project.category && p.id !== project.id)
    .slice(0, 3);

  return (
    <div className="project-details">
      <Navbar />
      
      <main className="project-details__main">
        {/* Breadcrumb Navigation */}
        <section className="project-details__breadcrumb">
          <div className="project-details__container">
            <Button
              variant="ghost"
              size="small"
              iconLeft={<BackIcon />}
              onClick={() => navigate('/#projects')}
            >
              Back to Projects
            </Button>
          </div>
        </section>

        {/* Hero Section with Card */}
        <section className="project-details__hero">
          <div className="project-details__container">
            <Card variant="elevated" className="project-details__hero-card">
              {project.featured && (
                <Card.Badge variant="success">Featured Project</Card.Badge>
              )}
              
              <Card.Image src={project.image} alt={project.title} />
              
              <Card.Body>
                <div className="project-details__category-badge">{project.category}</div>
                <Card.Title>{project.title}</Card.Title>
                <Card.Description>{project.description}</Card.Description>
                <Card.Tags tags={project.tags} />
              </Card.Body>

              <Card.Footer>
                <div className="project-details__hero-actions">
                  {project.github && (
                    <Button
                      variant="outline"
                      iconLeft={<GithubIcon />}
                      onClick={() => window.open(project.github, '_blank')}
                    >
                      View Code
                    </Button>
                  )}
                  {project.live && (
                    <Button
                      variant="primary"
                      iconRight={<ExternalIcon />}
                      onClick={() => window.open(project.live, '_blank')}
                    >
                      Live Demo
                    </Button>
                  )}
                </div>
              </Card.Footer>
            </Card>
          </div>
        </section>

        {/* Detailed Content Section */}
        <section className="project-details__content">
          <div className="project-details__container">
            <div className="project-details__grid">
              {/* Main Content */}
              <div className="project-details__main-content">
                {/* Features Card */}
                {project.features && (
                  <Card variant="outlined" className="project-details__section-card">
                    <Card.Header>
                      <h2 className="project-details__section-title">Key Features</h2>
                    </Card.Header>
                    <Card.Body>
                      <ul className="project-details__features-list">
                        {project.features.map((feature, index) => (
                          <li key={index} className="project-details__feature-item">
                            <span className="project-details__feature-icon">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </Card.Body>
                  </Card>
                )}

                {/* Challenges & Solutions Card */}
                {project.challenges && (
                  <Card variant="outlined" className="project-details__section-card">
                    <Card.Header>
                      <h2 className="project-details__section-title">Challenges & Solutions</h2>
                    </Card.Header>
                    <Card.Body>
                      <p className="project-details__challenges-text">{project.challenges}</p>
                    </Card.Body>
                  </Card>
                )}

                {/* Results Card */}
                {project.results && project.results.length > 0 && (
                  <Card variant="outlined" className="project-details__section-card">
                    <Card.Header>
                      <h2 className="project-details__section-title">Results & Impact</h2>
                    </Card.Header>
                    <Card.Body>
                      <div className="project-details__results-grid">
                        {project.results.map((result, index) => (
                          <div key={index} className="project-details__result-item">
                            <div className="project-details__result-value">{result.value}</div>
                            <div className="project-details__result-label">{result.label}</div>
                          </div>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <aside className="project-details__sidebar">
                {/* Project Info Card */}
                <Card variant="filled" className="project-details__sidebar-card">
                  <Card.Header>
                    <h3 className="project-details__sidebar-title">Project Info</h3>
                  </Card.Header>
                  <Card.Body>
                    <div className="project-details__info-list">
                      <div className="project-details__info-item">
                        <strong>Category:</strong>
                        <span>{project.category}</span>
                      </div>
                      <div className="project-details__info-item">
                        <strong>Technologies:</strong>
                        <div className="project-details__sidebar-tags">
                          {project.tags.slice(0, 5).map((tag, index) => (
                            <span key={index} className="project-details__sidebar-tag">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>

                {/* Quick Links Card */}
                <Card variant="filled" className="project-details__sidebar-card">
                  <Card.Header>
                    <h3 className="project-details__sidebar-title">Quick Links</h3>
                  </Card.Header>
                  <Card.Body>
                    <div className="project-details__quick-links">
                      {project.github && (
                        <a 
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-details__quick-link"
                        >
                          <GithubIcon />
                          <span>Source Code</span>
                        </a>
                      )}
                      {project.live && (
                        <a 
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-details__quick-link"
                        >
                          <ExternalIcon />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </aside>
            </div>
          </div>
        </section>

        {/* Related Projects Section */}
        {relatedProjects.length > 0 && (
          <section className="project-details__related">
            <div className="project-details__container">
              <h2 className="project-details__related-title">Related Projects</h2>
              <div className="project-details__related-grid">
                {relatedProjects.map((relatedProject) => (
                  <Card 
                    key={relatedProject.id}
                    variant="elevated"
                    hoverable
                    clickable
                    onClick={() => navigate(`/project/${relatedProject.slug || relatedProject.id}`)}
                  >
                    {relatedProject.featured && (
                      <Card.Badge variant="success">Featured</Card.Badge>
                    )}
                    <Card.Image src={relatedProject.image} alt={relatedProject.title} />
                    <Card.Body>
                      <div className="project-card__category">{relatedProject.category}</div>
                      <Card.Title>{relatedProject.title}</Card.Title>
                      <Card.Description>
                        {relatedProject.description.length > 100
                          ? `${relatedProject.description.substring(0, 100)}...`
                          : relatedProject.description}
                      </Card.Description>
                      <Card.Tags tags={relatedProject.tags.slice(0, 3)} />
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetails;
