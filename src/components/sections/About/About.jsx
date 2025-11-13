import React, { useState, useEffect } from 'react';
import Button from '../../common/Button/Button';
import './About.css';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Personal info based on your profile
  const personalInfo = {
    name: 'Mithun V K',
    title: 'Full-Stack Developer & AI/ML Enthusiast',
    location: 'India',
    email: 'mithunvk216@gmail.com',
    availability: 'Available for opportunities',
    education: 'BE CSE, Anna University Chennai'
  };

  // Quick stats based on your actual projects
  const stats = [
    { icon: '💼', value: '6+', label: 'Projects Completed' },
    { icon: '🛠️', value: '20+', label: 'Technologies' },
    { icon: '🎓', value: '3+', label: 'Certifications' },
    { icon: '⭐', value: '95%', label: 'Client Satisfaction' }
  ];

  // Core competencies
  const highlights = [
    {
      icon: '🚀',
      title: 'Full-Stack Development',
      description: 'Expert in building scalable web and mobile applications with React, Node.js, and modern frameworks'
    },
    {
      icon: '🤖',
      title: 'AI/ML Integration',
      description: 'Skilled in integrating machine learning models and building intelligent data-driven solutions'
    },
    {
      icon: '📊',
      title: 'Data Analytics',
      description: 'Experience in building analytics platforms with real-time visualization and business intelligence'
    },
    {
      icon: '☁️',
      title: 'Cloud & DevOps',
      description: 'Proficient in deploying and managing applications on cloud platforms with CI/CD pipelines'
    }
  ];

  // Top skills from your profile
  const topSkills = [
    { category: 'Frontend', items: ['React.js', 'HTML5', 'CSS3', 'JavaScript'], color: '#3b82f6' },
    { category: 'Backend', items: ['Node.js', 'Express.js', 'Python', 'MongoDB'], color: '#10b981' },
    { category: 'Database', items: ['SQL', 'PL/SQL', 'MongoDB', 'PostgreSQL'], color: '#8b5cf6' },
    { category: 'AI/ML', items: ['Machine Learning', 'Deep Learning', 'NLP', 'TensorFlow'], color: '#ef4444' },
    { category: 'Analytics', items: ['Business Analytics', 'Data Analysis', 'Pandas', 'Statistics'], color: '#f59e0b' }
  ];

  // Journey timeline based on your experience
  const journey = [
    {
      year: '2023',
      period: 'Present',
      title: 'Pursuing BE CSE',
      organization: 'Anna University Chennai',
      type: 'education',
      description: 'Focusing on Computer Science fundamentals, algorithms, and modern software development',
      highlights: ['CGPA: Pursuing Excellence', 'Focus on AI/ML & Full-Stack Development']
    },
    {
      year: '2025',
      period: 'Jul - Aug',
      title: 'Business Analyst Intern',
      organization: 'Cognifyz Technologies',
      type: 'experience',
      description: 'Conducted comprehensive business analysis and data analytics for multiple client projects',
      highlights: ['3+ Major Projects Completed', '30% Efficiency Improvement', 'Data Visualization']
    },
    {
      year: '2025',
      period: 'Feb - Apr',
      title: 'Student Timetable Management',
      organization: 'Academic Project',
      type: 'project',
      description: 'Full-stack MERN application for educational institutions to manage schedules and attendance',
      highlights: ['500+ Students', '70% Time Saved', '99% Accuracy']
    }
  ];

  const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );

  const ArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  );

  return (
    <section className="about" id="about">
      <div className="about__container">
        {/* Section Header */}
        <div className={`about__header ${isVisible ? 'about__header--visible' : ''}`}>
          <span className="about__subtitle">Get To Know</span>
          <h2 className="about__title">About Me</h2>
          <div className="about__title-underline"></div>
          <p className="about__description">
            Passionate about creating innovative solutions with modern technologies
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="about__content">
          {/* Left: Image + Stats */}
          <div className="about__visual">
            <div className="about__image-wrapper">
              <div className="about__image-placeholder">
                <div className="about__image-icon">👨‍💻</div>
              </div>
              <div className="about__image-overlay">
                <div className="about__badge">
                  <span className="about__badge-icon">🎓</span>
                  <div className="about__badge-text">
                    <strong>BE CSE</strong> Student
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Cards */}
            <div className="about__stats-grid">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="about__stat-card"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="about__stat-icon">{stat.icon}</div>
                  <div className="about__stat-info">
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Bio + Details */}
          <div className="about__details">
            <div className="about__intro">
              <h3 className="about__name">{personalInfo.name}</h3>
              <p className="about__role">{personalInfo.title}</p>
              <div className="about__meta">
                <span className="about__meta-item">📍 {personalInfo.location}</span>
                <span className="about__meta-item">🎓 {personalInfo.education}</span>
                <span className="about__meta-item about__meta-item--available">
                  ✅ {personalInfo.availability}
                </span>
              </div>
            </div>

            <div className="about__bio">
              <p className="about__text">
                I'm a <strong>Computer Science Engineering student</strong> at Anna University Chennai, 
                passionate about building scalable web and mobile applications that solve real-world problems. 
                With hands-on experience in full-stack development and AI/ML integration.
              </p>
              <p className="about__text">
                I specialize in the <strong>MERN stack</strong> and have successfully delivered projects 
                ranging from <strong>data analytics platforms</strong> to <strong>fintech applications</strong>. 
                My recent internship at Cognifyz Technologies allowed me to work on comprehensive business 
                analysis and data-driven solutions.
              </p>
              <p className="about__text">
                Currently seeking opportunities to contribute to innovative projects while continuing 
                to expand my expertise in modern web technologies, cloud computing, and artificial intelligence.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="about__actions">
              <Button
                variant="primary"
                size="large"
                iconLeft={<DownloadIcon />}
                onClick={() => window.open('/assets/documents/resume.pdf', '_blank')}
              >
                Download Resume
              </Button>
              <Button
                variant="outline"
                size="large"
                iconRight={<ArrowIcon />}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get In Touch
              </Button>
            </div>
          </div>
        </div>

        {/* Core Competencies */}
        <div className="about__competencies">
          <h3 className="about__section-title">Core Competencies</h3>
          <div className="about__highlights">
            {highlights.map((highlight, index) => (
              <div 
                key={index} 
                className="about__highlight"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="about__highlight-icon">{highlight.icon}</div>
                <div className="about__highlight-content">
                  <h4>{highlight.title}</h4>
                  <p>{highlight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Skills */}
        <div className="about__skills">
          <h3 className="about__section-title">Top Technical Skills</h3>
          <div className="about__skills-grid">
            {topSkills.map((skillGroup, index) => (
              <div 
                key={index} 
                className="about__skill-category"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div 
                  className="about__skill-category-header"
                  style={{ borderLeftColor: skillGroup.color }}
                >
                  <h4 className="about__skill-category-title">{skillGroup.category}</h4>
                  <span className="about__skill-count">{skillGroup.items.length} skills</span>
                </div>
                <div className="about__skill-tags">
                  {skillGroup.items.map((skill, idx) => (
                    <span 
                      key={idx} 
                      className="about__skill-tag"
                      style={{ borderColor: skillGroup.color }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="about__journey">
          <h3 className="about__section-title">My Journey</h3>
          <div className="about__timeline">
            {journey.map((item, index) => (
              <div 
                key={index} 
                className={`about__timeline-item about__timeline-item--${item.type}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="about__timeline-marker">
                  <span className="about__timeline-dot"></span>
                  <div className="about__timeline-year">
                    <strong>{item.year}</strong>
                    <span>{item.period}</span>
                  </div>
                </div>
                <div className="about__timeline-content">
                  <div className="about__timeline-header">
                    <h4 className="about__timeline-title">{item.title}</h4>
                    <span className={`about__timeline-badge about__timeline-badge--${item.type}`}>
                      {item.type}
                    </span>
                  </div>
                  <span className="about__timeline-org">{item.organization}</span>
                  <p className="about__timeline-description">{item.description}</p>
                  {item.highlights && (
                    <ul className="about__timeline-highlights">
                      {item.highlights.map((highlight, idx) => (
                        <li key={idx}>
                          <span className="about__highlight-bullet">▸</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Highlight */}
        <div className="about__certifications">
          <h3 className="about__section-title">Recent Certifications</h3>
          <div className="about__cert-grid">
            <div className="about__cert-card">
              <div className="about__cert-icon">🏆</div>
              <h4>IBM Certified AI Developer</h4>
              <p>IBM · Jul 2025</p>
            </div>
            <div className="about__cert-card">
              <div className="about__cert-icon">💾</div>
              <h4>Oracle Database SQL Certified</h4>
              <p>HackerRank · Feb 2025</p>
            </div>
            <div className="about__cert-card">
              <div className="about__cert-icon">💻</div>
              <h4>Programming in C</h4>
              <p>SkillRack · Jan 2024</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
