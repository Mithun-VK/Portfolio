import React, { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Button from '../../common/Button/Button';
import './Projects.css';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Memoize close handler to prevent re-renders
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Handle body scroll lock and focus management
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      document.body.style.overflow = 'hidden';
      
      // Scroll modal content to top
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
      
      // Focus first focusable element
      setTimeout(() => {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements?.length > 0) {
          focusableElements[0].focus();
        }
      }, 100);
    } else {
      document.body.style.overflow = 'unset';
      previousFocusRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle keyboard events
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    const handleTabTrap = (e) => {
      if (!isOpen || !modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTabTrap);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTabTrap);
    };
  }, [isOpen, handleClose]);

  if (!isOpen || !project) return null;

  // Safe checks for links
  const hasGithub = project.github && 
                    project.github !== 'null' && 
                    !project.github.includes('yourusername');
  const hasLive = project.live && project.live !== 'null';

  // Icon Components
  const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );

  const GithubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );

  const ExternalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );

  const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );

  const modalContent = (
    <>
      <div 
        className="project-modal__overlay"
        onClick={handleClose}
        aria-hidden="true"
      />
      <div 
        ref={modalRef}
        className="project-modal__container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <button
          className="project-modal__close"
          onClick={handleClose}
          aria-label="Close modal"
          title="Close (Esc)"
        >
          <CloseIcon />
        </button>

        <div ref={contentRef} className="project-modal__content">
          {/* Image Section */}
          <div className="project-modal__image-wrapper">
            <img 
              src={project.image} 
              alt={`${project.title} - ${project.tagline || 'Project screenshot'}`}
              className="project-modal__image"
              onError={(e) => {
                e.target.src = '/assets/images/placeholder-project.jpg';
              }}
            />
            {project.featured && (
              <div className="project-modal__badge">⭐ Featured</div>
            )}
            {project.status && (
              <div className={`project-modal__status project-modal__status--${project.status.toLowerCase().replace(' ', '-')}`}>
                {project.status}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="project-modal__details">
            <div className="project-modal__header">
              <span className="project-modal__category">{project.category}</span>
              <h2 id="modal-title" className="project-modal__title">{project.title}</h2>
              {project.tagline && (
                <p className="project-modal__tagline">{project.tagline}</p>
              )}
            </div>

            {/* Meta Information */}
            {(project.duration || project.team || project.role) && (
              <div className="project-modal__meta">
                {project.duration && (
                  <div className="project-modal__meta-item">
                    <strong>Duration:</strong> <span>{project.duration}</span>
                  </div>
                )}
                {project.team && (
                  <div className="project-modal__meta-item">
                    <strong>Team:</strong> <span>{project.team}</span>
                  </div>
                )}
                {project.role && (
                  <div className="project-modal__meta-item">
                    <strong>Role:</strong> <span>{project.role}</span>
                  </div>
                )}
              </div>
            )}

            <div className="project-modal__body">
              {/* Overview */}
              <section className="project-modal__section">
                <h3 className="project-modal__section-title">📖 Overview</h3>
                <p id="modal-description" className="project-modal__description">
                  {project.fullDescription || project.description}
                </p>
              </section>

              {/* Key Features */}
              {project.features && project.features.length > 0 && (
                <section className="project-modal__section">
                  <h3 className="project-modal__section-title">✨ Key Features</h3>
                  <ul className="project-modal__features">
                    {project.features.map((feature, index) => (
                      <li key={index} className="project-modal__feature">
                        <span className="project-modal__feature-icon">
                          <CheckIcon />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Technologies Used */}
              {project.tags && project.tags.length > 0 && (
                <section className="project-modal__section">
                  <h3 className="project-modal__section-title">🛠️ Technologies Used</h3>
                  <div className="project-modal__tags">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="project-modal__tag">{tag}</span>
                    ))}
                  </div>
                </section>
              )}

              {/* Detailed Technologies */}
              {project.technologies && (
                <section className="project-modal__section">
                  <h3 className="project-modal__section-title">🔧 Tech Stack Details</h3>
                  <div className="project-modal__tech-stack">
                    {Object.entries(project.technologies).map(([category, techs]) => (
                      <div key={category} className="project-modal__tech-category">
                        <h4 className="project-modal__tech-category-title">
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </h4>
                        <div className="project-modal__tech-list">
                          {techs.map((tech, idx) => (
                            <span key={idx} className="project-modal__tech-item">{tech}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Challenges & Solutions */}
              {project.challenges && project.challenges.length > 0 && (
                <section className="project-modal__section">
                  <h3 className="project-modal__section-title">🎯 Challenges & Solutions</h3>
                  <div className="project-modal__challenges">
                    {project.challenges.map((challenge, index) => (
                      <div key={index} className="project-modal__challenge">
                        <h4 className="project-modal__challenge-title">
                          {challenge.title}
                        </h4>
                        <p className="project-modal__challenge-description">
                          <strong>Challenge:</strong> {challenge.description}
                        </p>
                        <p className="project-modal__challenge-solution">
                          <strong>Solution:</strong> {challenge.solution}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Results & Impact */}
              {project.results && project.results.length > 0 && (
                <section className="project-modal__section">
                  <h3 className="project-modal__section-title">📊 Results & Impact</h3>
                  <div className="project-modal__results">
                    {project.results.map((result, index) => (
                      <div key={index} className="project-modal__result">
                        <div className="project-modal__result-value">{result.value}</div>
                        <div className="project-modal__result-label">{result.label}</div>
                        {result.description && (
                          <div className="project-modal__result-description">{result.description}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Testimonial */}
              {project.testimonial && (
                <section className="project-modal__section">
                  <h3 className="project-modal__section-title">💬 Testimonial</h3>
                  <div className="project-modal__testimonial">
                    <p className="project-modal__testimonial-text">
                      "{project.testimonial.text}"
                    </p>
                    <div className="project-modal__testimonial-author">
                      <strong>{project.testimonial.author}</strong>
                      <span>{project.testimonial.role}</span>
                    </div>
                  </div>
                </section>
              )}
            </div>

            {/* Footer with Action Buttons */}
            {(hasGithub || hasLive) && (
              <div className="project-modal__footer">
                {hasGithub && (
                  <Button
                    variant="outline"
                    size="large"
                    iconLeft={<GithubIcon />}
                    onClick={() => window.open(project.github, '_blank', 'noopener,noreferrer')}
                    aria-label={`View ${project.title} source code on GitHub`}
                  >
                    View Source Code
                  </Button>
                )}
                {hasLive && (
                  <Button
                    variant="primary"
                    size="large"
                    iconRight={<ExternalIcon />}
                    onClick={() => window.open(project.live, '_blank', 'noopener,noreferrer')}
                    aria-label={`View ${project.title} live demo`}
                  >
                    View Live Demo
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
};

export default ProjectModal;
