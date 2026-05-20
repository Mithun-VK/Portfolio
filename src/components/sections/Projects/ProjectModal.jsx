/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { modalOverlay, modalContent } from '../../../utils/motion';
import './Projects.css';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);
  const reduced = useReducedMotion();

  const handleClose = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        const focusable = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        focusable?.[0]?.focus();
      });
    } else {
      document.body.style.overflow = '';
      previousFocusRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, handleClose]);

  if (!isOpen || !project) return null;

  const hasGithub = project.github && !project.github.includes('yourusername');
  const hasLive = project.live && project.live !== 'null';

  const content = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="project-modal-overlay"
          onClick={handleClose}
          role="presentation"
          variants={modalOverlay}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: reduced ? 0 : 0.3 }}
        >
          <motion.div
            ref={modalRef}
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()}
            variants={modalContent}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: reduced ? 0 : 0.3 }}
          >
            <motion.button 
              type="button" 
              className="project-modal__close" 
              onClick={handleClose} 
              aria-label="Close"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              ×
            </motion.button>
            <div className="project-modal__content">
              <motion.img 
                src={project.image} 
                alt="" 
                className="project-modal__hero"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              />
              <motion.div 
                className="project-modal__meta"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                {project.role && <span>{project.role}</span>}
                {project.duration && <span>{project.duration}</span>}
                <span>{project.category}</span>
              </motion.div>
              <motion.h2 
                id="modal-title" 
                className="project-modal__title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                {project.title}
              </motion.h2>

              <motion.section 
                className="project-modal__section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <h3>Overview</h3>
                <p>{project.fullDescription || project.description}</p>
              </motion.section>

              {project.challenges?.length > 0 && (
                <motion.section 
                  className="project-modal__section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <h3>Approach</h3>
                  {project.challenges.map((c, i) => (
                    <p key={i}>
                      <strong>{c.title}.</strong> {c.solution || c.description}
                    </p>
                  ))}
                </motion.section>
              )}

              {project.results?.length > 0 && (
                <motion.section 
                  className="project-modal__section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <h3>Outcome</h3>
                  <div className="project-modal__results">
                    {project.results.map((r, i) => (
                      <motion.div 
                        key={i} 
                        className="project-modal__result"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.7 + (i * 0.1) }}
                      >
                        <span className="project-modal__result-value">{r.value}</span>
                        <span className="project-modal__result-label">{r.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              )}

              {project.tags?.length > 0 && (
                <motion.section 
                  className="project-modal__section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                >
                  <h3>Stack</h3>
                  <p>{project.tags.join(' · ')}</p>
                </motion.section>
              )}

              {(hasGithub || hasLive) && (
                <motion.footer 
                  className="project-modal__footer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.9 }}
                >
                  {hasGithub && (
                    <a
                      href={project.github}
                      className="project-modal__link interactive"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Source code
                    </a>
                  )}
                  {hasLive && (
                    <a
                      href={project.live}
                      className="project-modal__link interactive"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live demo
                    </a>
                  )}
                </motion.footer>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
};

export default ProjectModal;
