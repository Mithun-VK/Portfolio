import React, { useState } from 'react';
import Card from '../../common/Card/Card';
import Button from '../../common/Button/Button';
import ProjectModal from './ProjectModal';
import './Projects.css';

const ProjectCard = ({ project, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(project.image);

  const handleViewDetails = () => {
    setShowModal(true);
  };

  // Safe check for links
  const hasGithub = project.github && project.github !== 'null' && project.github !== 'https://github.com/yourusername/encryption-tool';
  const hasLive = project.live && project.live !== 'null';

  const GithubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );

  const ExternalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );

  const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="16" x2="12" y2="12"/>
      <line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  );

  const handleImageError = (e) => {
    setImageError(true);
    setImageLoaded(false);
    // Create a placeholder data URL as fallback
    const placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24"%3EProject Image%3C/text%3E%3C/svg%3E';
    setImageSrc(placeholder);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  return (
    <>
      <Card 
        variant="elevated" 
        hoverable 
        className="project-card"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {project.featured && (
          <Card.Badge variant="success">Featured</Card.Badge>
        )}

        {/* Status Badge */}
        {project.status && (
          <div className={`project-card__status project-card__status--${project.status.toLowerCase().replace(' ', '-')}`}>
            {project.status}
          </div>
        )}

        <div 
          onClick={handleViewDetails} 
          style={{ cursor: 'pointer' }}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleViewDetails();
            }
          }}
          aria-label={`View ${project.title} details`}
        >
          {/* Direct img tag instead of Card.Image */}
          <div className="card-image-wrapper">
            <img 
              src={imageSrc}
              alt={`${project.title} - ${project.tagline || project.description}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              className="card-image"
              style={{
                opacity: imageLoaded && !imageError ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out'
              }}
            />
            {!imageLoaded && !imageError && (
              <div className="project-card__skeleton" aria-label="Loading image">
                <div className="skeleton-animation"></div>
              </div>
            )}
          </div>
        </div>

        <Card.Body>
          <div className="project-card__category">{project.category}</div>
          
          <Card.Title>{project.title}</Card.Title>
          
          {project.tagline && (
            <div className="project-card__tagline">{project.tagline}</div>
          )}
          
          <Card.Description>{project.description}</Card.Description>

          {/* Duration and Team Info */}
          {(project.duration || project.team) && (
            <div className="project-card__meta">
              {project.duration && (
                <span className="project-card__meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {project.duration}
                </span>
              )}
              {project.team && (
                <span className="project-card__meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  {project.team}
                </span>
              )}
            </div>
          )}

          <Card.Tags tags={project.tags} />
        </Card.Body>

        <Card.Footer>
          <div className="project-card__links">
            <Button
              variant="ghost"
              size="small"
              iconLeft={<InfoIcon />}
              onClick={handleViewDetails}
              aria-label={`View details for ${project.title}`}
            >
              Details
            </Button>
            {hasGithub && (
              <Button
                variant="ghost"
                size="small"
                iconLeft={<GithubIcon />}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.github, '_blank', 'noopener,noreferrer');
                }}
                aria-label={`View ${project.title} source code on GitHub`}
              >
                Code
              </Button>
            )}
            {hasLive && (
              <Button
                variant="primary"
                size="small"
                iconRight={<ExternalIcon />}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.live, '_blank', 'noopener,noreferrer');
                }}
                aria-label={`View ${project.title} live demo`}
              >
                Live
              </Button>
            )}
          </div>
        </Card.Footer>
      </Card>

      {/* Modal with safe project data */}
      {showModal && (
        <ProjectModal 
          project={project}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default ProjectCard;
