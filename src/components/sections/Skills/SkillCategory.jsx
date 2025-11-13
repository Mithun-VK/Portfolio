import React, { useMemo } from 'react';
import './Skills.css';

const SkillCategory = ({ category, view, index }) => {
  // Memoize calculations
  const stats = useMemo(() => {
    const total = category.skills.length;
    const avgLevel = Math.round(
      category.skills.reduce((acc, s) => acc + s.level, 0) / total
    );
    const maxLevel = Math.max(...category.skills.map(s => s.level));
    const endorsed = category.skills.reduce((acc, s) => acc + (s.endorsed || 0), 0);

    return { total, avgLevel, maxLevel, endorsed };
  }, [category.skills]);

  const getProficiencyLabel = (level) => {
    if (level >= 90) return 'Expert';
    if (level >= 80) return 'Advanced';
    if (level >= 70) return 'Proficient';
    if (level >= 60) return 'Intermediate';
    return 'Beginner';
  };

  const getProficiencyColor = (level) => {
    if (level >= 90) return '#10b981'; // Green
    if (level >= 80) return '#3b82f6'; // Blue
    if (level >= 70) return '#8b5cf6'; // Purple
    if (level >= 60) return '#f59e0b'; // Orange
    return '#6b7280'; // Gray
  };

  return (
    <div 
      className={`skill-category skill-category--${view}`}
      style={{ 
        animationDelay: `${index * 100}ms`,
        '--category-color': category.color 
      }}
    >
      {/* Category Header */}
      <div className="skill-category__header">
        <div className="skill-category__icon-wrapper" style={{ background: `${category.color}15` }}>
          <span className="skill-category__icon" role="img" aria-label={category.category}>
            {category.icon}
          </span>
        </div>
        <div className="skill-category__header-content">
          <h3 className="skill-category__title">{category.category}</h3>
          <div className="skill-category__meta">
            <span className="skill-category__count">
              {stats.total} {stats.total === 1 ? 'skill' : 'skills'}
            </span>
            {stats.endorsed > 0 && (
              <>
                <span className="skill-category__separator">•</span>
                <span className="skill-category__endorsed" title="Total endorsements">
                  {stats.endorsed} endorsements
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Category Description (if available) */}
      {category.description && (
        <p className="skill-category__description">{category.description}</p>
      )}

      {/* Skills List */}
      <div className="skill-category__skills">
        {category.skills.map((skill, idx) => (
          <div 
            key={idx} 
            className="skill-item"
            style={{ animationDelay: `${(index * 100) + (idx * 50)}ms` }}
          >
            <div className="skill-item__header">
              <div className="skill-item__info">
                <span className="skill-item__name">{skill.name}</span>
                <span 
                  className="skill-item__badge"
                  style={{ 
                    background: `${getProficiencyColor(skill.level)}15`,
                    color: getProficiencyColor(skill.level)
                  }}
                >
                  {getProficiencyLabel(skill.level)}
                </span>
              </div>
              <div className="skill-item__meta">
                {skill.years && (
                  <span className="skill-item__years" title="Years of experience">
                    📅 {skill.years}
                  </span>
                )}
                <span className="skill-item__level">{skill.level}%</span>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="skill-item__progress-container">
              <div 
                className="skill-item__progress-bar"
                style={{ 
                  width: `${skill.level}%`,
                  background: category.color
                }}
                role="progressbar"
                aria-valuenow={skill.level}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label={`${skill.name} proficiency: ${skill.level}%`}
              >
                <div className="skill-item__progress-shimmer"></div>
              </div>
            </div>

            {/* Endorsements (if available) */}
            {skill.endorsed && skill.endorsed > 0 && (
              <div className="skill-item__endorsements">
                <span className="skill-item__endorsement-icon">👍</span>
                <span className="skill-item__endorsement-count">
                  {skill.endorsed} {skill.endorsed === 1 ? 'endorsement' : 'endorsements'}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Category Footer with Stats */}
      <div className="skill-category__footer">
        <div className="skill-category__stats">
          <div className="skill-category__stat" title="Average proficiency">
            <span className="skill-category__stat-label">Avg:</span>
            <span className="skill-category__stat-value">{stats.avgLevel}%</span>
          </div>
          <div className="skill-category__stat" title="Highest proficiency">
            <span className="skill-category__stat-label">Max:</span>
            <span className="skill-category__stat-value">{stats.maxLevel}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillCategory;
