import React, { useState, useMemo, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { projects as projectsData, getAllCategories } from '../../../data/projects';
import './Projects.css';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  // Use imported projects data
  const projects = projectsData;

  // Get categories dynamically
  const categories = ['All', ...getAllCategories()];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesCategory = activeFilter === 'All' || project.category === activeFilter;
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery, projects]);

  // Category icons
  const categoryIcons = {
    'All': '📚',
    'Full-Stack': '🌐',
    'AI/ML': '🤖',
    'Mobile': '📱',
    'Security': '🔒'
  };

  const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
    </svg>
  );

  const ClearIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );

  return (
    <section className="projects" id="projects">
      <div className="projects__container">
        {/* Header */}
        <div className={`projects__header ${isVisible ? 'projects__header--visible' : ''}`}>
          <span className="projects__subtitle">My Work</span>
          <h2 className="projects__title">Featured Projects</h2>
          <div className="projects__title-underline"></div>
          <p className="projects__description">
            A collection of {projects.length} projects showcasing expertise in full-stack development, 
            AI/ML integration, and cloud solutions. Each project demonstrates real-world 
            problem-solving and modern development practices.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="projects__controls">
          {/* Search Bar */}
          <div className="projects__search-wrapper">
            <div className="projects__search">
              <SearchIcon />
              <input
                type="text"
                className="projects__search-input"
                placeholder="Search projects by name, tech stack..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search projects"
              />
              {searchQuery && (
                <button 
                  className="projects__search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  title="Clear search"
                >
                  <ClearIcon />
                </button>
              )}
            </div>
          </div>

          {/* Category Filters */}
          <div className="projects__filters">
            {categories.map(category => {
              const count = category === 'All' 
                ? projects.length 
                : projects.filter(p => p.category === category).length;
              
              return (
                <button
                  key={category}
                  className={`projects__filter ${activeFilter === category ? 'projects__filter--active' : ''}`}
                  onClick={() => setActiveFilter(category)}
                  aria-pressed={activeFilter === category}
                >
                  <span className="projects__filter-icon">{categoryIcons[category] || '📁'}</span>
                  <span className="projects__filter-label">{category}</span>
                  <span className="projects__filter-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className="projects__results">
          {searchQuery ? (
            <span>
              Found <strong>{filteredProjects.length}</strong> {filteredProjects.length === 1 ? 'project' : 'projects'} 
              matching "<strong>{searchQuery}</strong>"
            </span>
          ) : (
            <span>
              Showing <strong>{filteredProjects.length}</strong> {filteredProjects.length === 1 ? 'project' : 'projects'}
              {activeFilter !== 'All' && ` in ${activeFilter}`}
            </span>
          )}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="projects__grid">
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="projects__empty">
            <div className="projects__empty-icon">
              {searchQuery ? '🔍' : '📂'}
            </div>
            <h3 className="projects__empty-title">
              {searchQuery ? 'No projects found' : 'No projects in this category'}
            </h3>
            <p className="projects__empty-text">
              {searchQuery 
                ? `No projects match "${searchQuery}". Try adjusting your search terms.`
                : `There are no projects in the ${activeFilter} category yet.`
              }
            </p>
            <button 
              className="projects__empty-button"
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('All');
              }}
            >
              <span>Clear All Filters</span>
            </button>
          </div>
        )}

        {/* Call to Action */}
        {filteredProjects.length > 0 && (
          <div className="projects__cta">
            <div className="projects__cta-content">
              <h3 className="projects__cta-title">Interested in working together?</h3>
              <p className="projects__cta-text">
                I'm always open to discussing new projects and opportunities.
              </p>
              <button 
                className="projects__cta-button"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get In Touch
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
