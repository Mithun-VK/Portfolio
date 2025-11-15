import React, { useState, useEffect } from 'react';
import Button from '../../common/Button/Button';
import useScrollAnimation from '../../../hooks/useScrollAnimation';
import { SOCIAL_LINKS } from '../../../utils/constants';
import './Hero.css';

const Hero = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollToElement } = useScrollAnimation();

  const roles = [
    'Full-Stack Developer',
    'AI/ML Enthusiast',
    'Business Analyst',
    'Data Analytics Expert',
    'Problem Solver',
    'Cloud Architect'
  ];

  const personalInfo = {
    name: 'Mithun V K',
    tagline: 'Building Intelligent Solutions with Modern Technologies',
    description: 'Computer Science Engineering student at Anna University Chennai, specializing in full-stack development and AI/ML integration. Building scalable applications with React, Node.js, and cloud technologies.',
    location: 'Chennai, India',
    email: 'mithunvk216@gmail.com',
    resumePath: '/assets/documents/Mithun_VK_Resume.pdf'
  };

  const techStack = [
    { name: 'React', color: '#61DAFB' },
    { name: 'Node.js', color: '#339933' },
    { name: 'Python', color: '#3776AB' },
    { name: 'MongoDB', color: '#47A248' },
    { name: 'PostgreSQL', color: '#4169E1' },
    { name: 'Azure', color: '#0078D4' }
  ];

  const stats = [
    { value: '6+', label: 'Projects', icon: '💼' },
    { value: '20+', label: 'Technologies', icon: '⚡' },
    { value: '3+', label: 'Certifications', icon: '🏆' }
  ];

  const socialLinks = [
    { 
      name: 'LinkedIn', 
      url: SOCIAL_LINKS.linkedin, 
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    { 
      name: 'GitHub', 
      url: SOCIAL_LINKS.github, 
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    { 
      name: 'Email', 
      url: `mailto:${personalInfo.email}`, 
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      )
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );

  const ArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  );
  const handleDownloadResume = () => {
    if (window.gtag) {
      window.gtag('event', 'download', {
        event_category: 'Resume',
        event_label: 'Hero Section'
      });
    }
    window.open(personalInfo.resumePath, '_blank');
  };

  return (
    <section className="hero" id="home">
      {/* Animated Background Elements */}
      <div className="hero__bg-shapes" aria-hidden="true">
        <div className="hero__shape hero__shape--1" />
        <div className="hero__shape hero__shape--2" />
        <div className="hero__shape hero__shape--3" />
      </div>

      <div className="hero__container">
        {/* Content Side */}
        <div className={`hero__content ${isVisible ? 'hero__content--visible' : ''}`}>
          {/* Greeting */}
          <div className="hero__greeting">
            <span className="hero__wave" role="img" aria-label="Waving hand">👋</span>
            <span className="hero__greeting-text">Hello, I'm</span>
          </div>

          {/* Name with Gradient */}
          <h1 className="hero__title">
            <span className="hero__name">{personalInfo.name}</span>
            <span className="hero__name-accent">.</span>
          </h1>

          {/* Animated Role */}
          <div className="hero__role-container">
            <h2 className="hero__role">
              <span className="hero__role-label">I'm a </span>
              <span className="hero__role-text" key={currentRoleIndex}>
                {roles[currentRoleIndex]}
              </span>
            </h2>
          </div>

          {/* Description */}
          <p className="hero__description">
            {personalInfo.description}
          </p>

          {/* Tech Stack Pills */}
          <div className="hero__tech-stack">
            {techStack.map((tech, index) => (
              <span 
                key={tech.name}
                className="hero__tech-pill"
                style={{ 
                  '--tech-color': tech.color,
                  animationDelay: `${index * 100}ms` 
                }}
                title={tech.name}
              >
                {tech.name}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hero__cta">
            <Button 
              variant="primary" 
              size="large"
              onClick={() => scrollToElement('projects', 80)}
              iconRight={<ArrowIcon />}
              ariaLabel="View my projects"
            >
              View My Work
            </Button>
            <Button 
              variant="outline" 
              size="large"
              onClick={handleDownloadResume}
              iconLeft={<DownloadIcon />}
              ariaLabel="Download resume PDF"
            >
              Download Resume
            </Button>
          </div>

          {/* Stats */}
          <div className="hero__stats">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="hero__stat"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <span className="hero__stat-icon" role="img" aria-hidden="true">
                  {stat.icon}
                </span>
                <div className="hero__stat-content">
                  <span className="hero__stat-value">{stat.value}</span>
                  <span className="hero__stat-label">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="hero__social">
            {socialLinks.map((social, index) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hero__social-link"
                aria-label={`Visit my ${social.name} profile`}
                title={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Visual Side */}
        <div className={`hero__visual ${isVisible ? 'hero__visual--visible' : ''}`}>
          <div className="hero__image-wrapper">
            {/* Profile Image - Updated for portrait aspect ratio */}
            <img 
              src="/assets/images/profile.jpg"
              alt="Mithun VK - Full Stack Developer"
              className="hero__image"
              loading="eager"
              width="500"
              height="667"
            />

            {/* Floating Badges */}
            <div className="hero__floating hero__floating--1" aria-hidden="true">
              <span className="hero__floating-icon" role="img">⚡</span>
              <span className="hero__floating-text">Fast</span>
            </div>
            <div className="hero__floating hero__floating--2" aria-hidden="true">
              <span className="hero__floating-icon" role="img">💻</span>
              <span className="hero__floating-text">Clean Code</span>
            </div>
            <div className="hero__floating hero__floating--3" aria-hidden="true">
              <span className="hero__floating-icon" role="img">🚀</span>
              <span className="hero__floating-text">Innovation</span>
            </div>

            {/* Availability Badge */}
            <div className="hero__availability">
              <span className="hero__availability-dot" aria-hidden="true" />
              <span className="hero__availability-text">Available for opportunities</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button 
          className="hero__scroll-indicator"
          onClick={() => scrollToElement('about', 80)}
          aria-label="Scroll to about section"
          title="Scroll down to learn more"
        >
        </button>
      </div>
    </section>
  );
};

export default Hero;
