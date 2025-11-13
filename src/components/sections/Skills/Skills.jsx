import React, { useState, useEffect, useMemo } from 'react';
import SkillCategory from './SkillCategory';
import { skillsData, certifications as certsData, getTotalSkillsCount } from '../../../data/skills';
import './Skills.css';

const Skills = () => {
  const [activeView, setActiveView] = useState('category');
  const [isVisible, setIsVisible] = useState(false);

  // Use imported data
  const skills = skillsData;
  const certifications = certsData;

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Calculate stats
  const stats = useMemo(() => {
    const totalSkills = getTotalSkillsCount();
    const totalCategories = skills.length;
    
    return {
      totalSkills,
      totalCategories,
      certifications: certifications.length,
      topSkills: skills.flatMap(cat => cat.skills).sort((a, b) => b.level - a.level).slice(0, 5)
    };
  }, [skills, certifications]);

  // View toggle icons
  const GridIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
    </svg>
  );

  const ListIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="8" y1="6" x2="21" y2="6"/>
      <line x1="8" y1="12" x2="21" y2="12"/>
      <line x1="8" y1="18" x2="21" y2="18"/>
      <line x1="3" y1="6" x2="3.01" y2="6"/>
      <line x1="3" y1="12" x2="3.01" y2="12"/>
      <line x1="3" y1="18" x2="3.01" y2="18"/>
    </svg>
  );

  const AwardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="7"/>
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
    </svg>
  );

  return (
    <section className="skills" id="skills">
      <div className="skills__container">
        {/* Header */}
        <div className={`skills__header ${isVisible ? 'skills__header--visible' : ''}`}>
          <span className="skills__subtitle">What I Know</span>
          <h2 className="skills__title">Technical Skills & Expertise</h2>
          <div className="skills__title-underline"></div>
          <p className="skills__description">
            A comprehensive overview of my technical expertise across {stats.totalCategories} domains 
            with {stats.totalSkills}+ skills. From full-stack development to AI/ML and data analytics, 
            these proficiency levels reflect hands-on experience through academic projects, internships, 
            and {certifications.length} professional certifications.
          </p>
        </div>

        {/* Quick Stats Banner */}
        <div className="skills__quick-stats">
          <div className="skills__quick-stat">
            <span className="skills__quick-stat-value">{stats.totalSkills}+</span>
            <span className="skills__quick-stat-label">Skills</span>
          </div>
          <div className="skills__quick-stat">
            <span className="skills__quick-stat-value">{stats.totalCategories}</span>
            <span className="skills__quick-stat-label">Categories</span>
          </div>
          <div className="skills__quick-stat">
            <span className="skills__quick-stat-value">{certifications.length}</span>
            <span className="skills__quick-stat-label">Certificates</span>
          </div>
        </div>

        {/* View Toggle */}
        <div className="skills__view-toggle">
          <button
            className={`skills__toggle-btn ${activeView === 'category' ? 'skills__toggle-btn--active' : ''}`}
            onClick={() => setActiveView('category')}
            aria-pressed={activeView === 'category'}
          >
            <GridIcon />
            <span>Category View</span>
          </button>
          <button
            className={`skills__toggle-btn ${activeView === 'list' ? 'skills__toggle-btn--active' : ''}`}
            onClick={() => setActiveView('list')}
            aria-pressed={activeView === 'list'}
          >
            <ListIcon />
            <span>List View</span>
          </button>
        </div>

        {/* Skills Grid */}
        <div className={`skills__grid ${activeView === 'list' ? 'skills__grid--list' : ''}`}>
          {skills.map((category, index) => (
            <SkillCategory
              key={index}
              category={category}
              view={activeView}
              index={index}
            />
          ))}
        </div>

        {/* Stats Cards */}
        <div className="skills__stats">
          <div className="skills__stat-card" style={{ animationDelay: '0ms' }}>
            <div className="skills__stat-icon">📚</div>
            <div className="skills__stat-content">
              <div className="skills__stat-value">{stats.totalSkills}+</div>
              <div className="skills__stat-label">Technical Skills</div>
            </div>
          </div>
          <div className="skills__stat-card" style={{ animationDelay: '100ms' }}>
            <div className="skills__stat-icon">💼</div>
            <div className="skills__stat-content">
              <div className="skills__stat-value">2+ months</div>
              <div className="skills__stat-label">Internship Experience</div>
            </div>
          </div>
          <div className="skills__stat-card" style={{ animationDelay: '200ms' }}>
            <div className="skills__stat-icon">🎓</div>
            <div className="skills__stat-content">
              <div className="skills__stat-value">BE CSE</div>
              <div className="skills__stat-label">Anna University</div>
            </div>
          </div>
          <div className="skills__stat-card" style={{ animationDelay: '300ms' }}>
            <div className="skills__stat-icon">🏆</div>
            <div className="skills__stat-content">
              <div className="skills__stat-value">{certifications.length}</div>
              <div className="skills__stat-label">Certifications</div>
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="skills__certifications">
          <h3 className="skills__cert-title">
            <span className="skills__cert-title-icon">🏆</span>
            Certifications & Credentials
          </h3>
          <p className="skills__cert-description">
            Professional certifications validating my expertise in various technical domains
          </p>
          
          <div className="skills__cert-grid">
            {certifications.map((cert, index) => (
              <div 
                key={index} 
                className="skills__cert-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="skills__cert-badge">
                  <AwardIcon />
                </div>
                <div className="skills__cert-info">
                  <div className="skills__cert-name">{cert.name}</div>
                  <div className="skills__cert-meta">
                    <span className="skills__cert-issuer">{cert.issuer}</span>
                    <span className="skills__cert-dot">•</span>
                    <span className="skills__cert-date">{cert.date}</span>
                  </div>
                  {cert.credentialId && (
                    <div className="skills__cert-id">
                      ID: {cert.credentialId}
                    </div>
                  )}
                  {cert.url && (
                    <a 
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="skills__cert-link"
                    >
                      View Certificate →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Skills Highlight */}
<div className="skills__top-skills">
  <h3 className="skills__top-skills-title">Top 5 Skills</h3>
  <div className="skills__top-skills-grid">
    {stats.topSkills.map((skill, idx) => (
      <div className="skills__top-skill" key={skill.name} style={{ animationDelay: `${idx * 100}ms` }}>
        <div className="skills__top-skill-header">
          <span className="skills__top-skill-rank">#{idx + 1}</span>
          <span className="skills__top-skill-name">{skill.name}</span>
        </div>
        <div className="skills__top-skill-bar">
          <div 
            className="skills__top-skill-progress"
            style={{ width: `${skill.level}%` }}
          ></div>
        </div>
        <span className="skills__top-skill-level">{skill.level}% proficiency</span>
      </div>
    ))}
  </div>
</div>

        {/* Call to Action */}
        <div className="skills__cta">
          <p className="skills__cta-text">
            Want to see these skills in action? Check out my projects or get in touch!
          </p>
          <div className="skills__cta-buttons">
            <button 
              className="skills__cta-button skills__cta-button--primary"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects
            </button>
            <button 
              className="skills__cta-button skills__cta-button--outline"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
