import React, { useState, useMemo } from 'react';
import Section from '../../layout/Section';
import SectionHeader from '../../layout/SectionHeader';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { projects as projectsData, getAllCategories } from '../../../data/projects';
import './Projects.css';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', ...getAllCategories()];

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchesCategory = activeFilter === 'All' || project.category === activeFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <Section id="projects" labelledBy="projects-heading">
      <SectionHeader
        id="projects-heading"
        eyebrow="Work"
        title="Selected projects"
        description="Case studies highlighting problem-solving, technical decisions, and measurable outcomes."
      />

      <div className="projects__controls">
        <input
          type="search"
          className="projects__search"
          placeholder="Search projects…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search projects"
        />
        <div className="projects__filters" role="group" aria-label="Filter by category">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`projects__filter ${activeFilter === category ? 'projects__filter--active' : ''}`}
              onClick={() => setActiveFilter(category)}
              aria-pressed={activeFilter === category}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <div className="projects__grid">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={() => setSelectedProject(project)}
            />
          ))}
        </div>
      ) : (
        <p className="projects__empty">No projects match your filters.</p>
      )}

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={Boolean(selectedProject)}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </Section>
  );
};

export default Projects;
