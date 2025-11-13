import React, { useState, useEffect } from 'react';
import { workExperience, education as educationData, academicProjects } from '../../../data/experience';
import Card from '../../common/Card/Card';
import './Experience.css';

const Experience = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Use imported data
  const experiences = workExperience;
  const education = educationData[0];
  const project = academicProjects[0];

  // Filter options
  const filters = [
    { id: 'all', label: 'All', icon: '📚', count: experiences.length + 2 },
    { id: 'education', label: 'Education', icon: '🎓', count: 1 },
    { id: 'work', label: 'Work', icon: '💼', count: experiences.length },
    { id: 'projects', label: 'Projects', icon: '🚀', count: 1 }
  ];

  // Combined timeline items
  const timelineItems = [
    {
      type: 'education',
      data: education,
      sortDate: new Date(education.startDate || '2021-01-01')
    },
    ...experiences.map(exp => ({
      type: 'work',
      data: exp,
      sortDate: new Date(exp.startDate || '2023-01-01')
    })),
    {
      type: 'project',
      data: project,
      sortDate: new Date(project.startDate || '2024-01-01')
    }
  ].sort((a, b) => b.sortDate - a.sortDate);

  // Filter timeline items
  const filteredItems = activeFilter === 'all' 
    ? timelineItems 
    : timelineItems.filter(item => {
        if (activeFilter === 'education') return item.type === 'education';
        if (activeFilter === 'work') return item.type === 'work';
        if (activeFilter === 'projects') return item.type === 'project';
        return true;
      });

  return (
    <section className="experience" id="experience">
      <div className="experience__container">
        {/* Header */}
        <div className={`experience__header ${isVisible ? 'experience__header--visible' : ''}`}>
          <span className="experience__subtitle">My Journey</span>
          <h2 className="experience__title">Experience & Education</h2>
          <div className="experience__title-underline"></div>
          <p className="experience__description">
            My professional journey combining hands-on experience, academic excellence, 
            and real-world project implementations in software development and data analytics.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="experience__filters">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`experience__filter ${activeFilter === filter.id ? 'experience__filter--active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
              aria-pressed={activeFilter === filter.id}
              aria-label={`Filter by ${filter.label}`}
            >
              <span className="experience__filter-icon">{filter.icon}</span>
              <span className="experience__filter-label">{filter.label}</span>
              <span className="experience__filter-count">{filter.count}</span>
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="experience__timeline">
          {filteredItems.map((item, index) => (
            <TimelineItem 
              key={`${item.type}-${index}`}
              item={item} 
              index={index}
            />
          ))}
        </div>

        {/* Summary Stats */}
        <div className="experience__summary">
          <div className="experience__summary-card">
            <div className="experience__summary-icon">🎓</div>
            <div className="experience__summary-content">
              <strong>Education</strong>
              <span>BE CSE, Anna University</span>
            </div>
          </div>
          <div className="experience__summary-card">
            <div className="experience__summary-icon">💼</div>
            <div className="experience__summary-content">
              <strong>Experience</strong>
              <span>Business Analyst Intern</span>
            </div>
          </div>
          <div className="experience__summary-card">
            <div className="experience__summary-icon">🚀</div>
            <div className="experience__summary-content">
              <strong>Projects</strong>
              <span>6+ Completed</span>
            </div>
          </div>
          <div className="experience__summary-card">
            <div className="experience__summary-icon">🏆</div>
            <div className="experience__summary-content">
              <strong>Certifications</strong>
              <span>3+ Earned</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Timeline Item Component
const TimelineItem = ({ item, index }) => {
  const { type, data } = item;

  if (type === 'education') {
    return <EducationItem data={data} index={index} />;
  } else if (type === 'work') {
    return <WorkItem data={data} index={index} />;
  } else if (type === 'project') {
    return <ProjectItem data={data} index={index} />;
  }
  return null;
};

// Education Item Component
const EducationItem = ({ data, index }) => (
  <div 
    className="experience__item experience__item--education"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="experience__timeline-dot" style={{ background: `linear-gradient(135deg, ${data.color || '#3b82f6'}, ${data.color || '#8b5cf6'})` }}></div>
    
    <div className="experience__content">
      <div className="experience__header-card">
        <div className="experience__logo" style={{ background: `linear-gradient(135deg, ${data.color || '#3b82f6'}, ${data.color || '#8b5cf6'})` }}>
          {data.logo || '🎓'}
        </div>
        <div className="experience__header-info">
          <h3 className="experience__position">{data.degree}</h3>
          <div className="experience__company">{data.institution}</div>
          <div className="experience__meta">
            <span className="experience__duration">
              {data.startDate} - {data.current ? 'Present' : data.endDate}
            </span>
            {data.current && (
              <>
                <span className="experience__separator">•</span>
                <span className="experience__status">Currently Pursuing</span>
              </>
            )}
          </div>
        </div>
        {data.current && (
          <span className="experience__badge experience__badge--active">Current</span>
        )}
      </div>

      <div className="experience__details">
        {data.highlights && data.highlights.length > 0 && (
          <div className="experience__section">
            <h4 className="experience__section-title">Academic Focus</h4>
            <ul className="experience__list">
              {data.highlights.map((highlight, i) => (
                <li key={i} className="experience__list-item">
                  <span className="experience__bullet">▹</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.relevantCourses && data.relevantCourses.length > 0 && (
          <div className="experience__section">
            <h4 className="experience__section-title">Relevant Coursework</h4>
            <div className="experience__tags">
              {data.relevantCourses.map((course, i) => (
                <span key={i} className="experience__tag">
                  {course}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.activities && data.activities.length > 0 && (
          <div className="experience__section">
            <h4 className="experience__section-title">Activities</h4>
            <ul className="experience__list">
              {data.activities.map((activity, i) => (
                <li key={i} className="experience__list-item">
                  <span className="experience__bullet">▹</span>
                  <span>{activity}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  </div>
);

// Work Experience Item Component
const WorkItem = ({ data, index }) => (
  <div 
    className="experience__item experience__item--work"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="experience__timeline-dot" style={{ background: `linear-gradient(135deg, ${data.color || '#3b82f6'}, ${data.color || '#2563eb'})` }}></div>
    
    <div className="experience__content">
      <div className="experience__header-card">
        <div className="experience__logo" style={{ background: `linear-gradient(135deg, ${data.color || '#3b82f6'}, ${data.color || '#2563eb'})` }}>
          {data.logo || '💼'}
        </div>
        <div className="experience__header-info">
          <h3 className="experience__position">{data.position}</h3>
          <div className="experience__company">{data.company} · {data.type}</div>
          <div className="experience__meta">
            <span className="experience__duration">{data.duration}</span>
            <span className="experience__separator">•</span>
            <span className="experience__location">{data.location}</span>
          </div>
        </div>
        <span className="experience__badge experience__badge--completed">Completed</span>
      </div>

      <div className="experience__details">
        {data.responsibilities && data.responsibilities.length > 0 && (
          <div className="experience__section">
            <h4 className="experience__section-title">Key Responsibilities</h4>
            <ul className="experience__list">
              {data.responsibilities.map((resp, i) => (
                <li key={i} className="experience__list-item">
                  <span className="experience__bullet">▹</span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.achievements && data.achievements.length > 0 && (
          <div className="experience__section">
            <h4 className="experience__section-title">Key Achievements</h4>
            <div className="experience__achievements">
              {data.achievements.map((achievement, i) => (
                <div key={i} className="experience__achievement">
                  <span className="experience__achievement-icon">✓</span>
                  <span>{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.skills && data.skills.length > 0 && (
          <div className="experience__section">
            <h4 className="experience__section-title">Skills Applied</h4>
            <div className="experience__tags">
              {data.skills.map((skill, i) => (
                <span key={i} className="experience__tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

// Project Item Component
const ProjectItem = ({ data, index }) => (
  <div 
    className="experience__item experience__item--project"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="experience__timeline-dot" style={{ background: `linear-gradient(135deg, ${data.color || '#8b5cf6'}, ${data.color || '#7c3aed'})` }}></div>
    
    <div className="experience__content">
      <div className="experience__header-card">
        <div className="experience__logo" style={{ background: `linear-gradient(135deg, ${data.color || '#8b5cf6'}, ${data.color || '#7c3aed'})` }}>
          {data.logo || '🚀'}
        </div>
        <div className="experience__header-info">
          <h3 className="experience__position">{data.title}</h3>
          <div className="experience__company">Academic Project · {data.association}</div>
          <div className="experience__meta">
            <span className="experience__duration">{data.duration}</span>
          </div>
        </div>
        <span className="experience__badge experience__badge--project">Project</span>
      </div>

      <div className="experience__details">
        {data.description && (
          <div className="experience__section">
            <h4 className="experience__section-title">Project Overview</h4>
            <p className="experience__description-text">{data.description}</p>
          </div>
        )}

        {data.features && data.features.length > 0 && (
          <div className="experience__section">
            <h4 className="experience__section-title">Key Features</h4>
            <ul className="experience__list">
              {data.features.map((feature, i) => (
                <li key={i} className="experience__list-item">
                  <span className="experience__bullet">▹</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.techStack && data.techStack.length > 0 && (
          <div className="experience__section">
            <h4 className="experience__section-title">Technology Stack</h4>
            <div className="experience__tags">
              {data.techStack.map((tech, i) => (
                <span key={i} className="experience__tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.impact && (
          <div className="experience__section">
            <h4 className="experience__section-title">Impact & Results</h4>
            <div className="experience__impact">
              <span className="experience__impact-icon">🎯</span>
              <p>{data.impact}</p>
            </div>
          </div>
        )}

        {data.achievements && data.achievements.length > 0 && (
          <div className="experience__section">
            <h4 className="experience__section-title">Achievements</h4>
            <div className="experience__achievements">
              {data.achievements.map((achievement, i) => (
                <div key={i} className="experience__achievement">
                  <span className="experience__achievement-icon">✓</span>
                  <span>{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.github && (
          <div className="experience__section">
            <a 
              href={data.github}
              target="_blank"
              rel="noopener noreferrer"
              className="experience__project-link"
              aria-label={`View ${data.title} on GitHub`}
            >
              View on GitHub →
            </a>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default Experience;
