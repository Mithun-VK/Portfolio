import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { card3D } from '../../../utils/motion';
import useTilt from '../../../hooks/useTilt';
import './Projects.css';

const PLACEHOLDER =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="450"%3E%3Crect fill="%2318181b" width="800" height="450"/%3E%3Ctext fill="%2371717a" x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18"%3EProject%3C/text%3E%3C/svg%3E';

const ProjectCard = ({ project, onOpen }) => {
  const [imgSrc, setImgSrc] = useState(project.image);
  const reduced = useReducedMotion();
  const { ref, transform, isHovered, handleMouseMove, handleMouseEnter, handleMouseLeave } = useTilt(4, 1200);

  const outcome =
    project.results?.[0]?.label
      ? `${project.results[0].value} ${project.results[0].label}`
      : project.tagline || project.description;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen();
    }
  };

  const getCardStyle = () => {
    if (reduced) return {};
    return {
      transform: `
        perspective(1000px)
        rotateX(${transform.rotateX}deg)
        rotateY(${transform.rotateY}deg)
        scale(${transform.scale})
        translateX(${transform.translateX}px)
        translateY(${transform.translateY}px)
      `,
      transition: isHovered ? 'none' : 'transform 0.3s ease-out'
    };
  };

  return (
    <motion.article
      ref={ref}
      className="project-card interactive"
      style={getCardStyle()}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      variants={card3D}
      initial={reduced ? false : 'hidden'}
      whileInView={reduced ? undefined : 'visible'}
      viewport={{ once: true, margin: '-50px' }}
    >
      <button
        type="button"
        className="project-card__media"
        onClick={onOpen}
        onKeyDown={handleKeyDown}
        aria-label={`View case study: ${project.title}`}
      >
        <img
          src={imgSrc}
          alt=""
          loading="lazy"
          onError={() => setImgSrc(PLACEHOLDER)}
        />
        <div className="project-card__overlay" />
      </button>
      <div className="project-card__body">
        <span className="project-card__category">{project.category}</span>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__outcome">{outcome}</p>
        <ul className="project-card__tags" aria-label="Technologies">
          {project.tags.slice(0, 4).map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <button type="button" className="project-card__cta" onClick={onOpen}>
          View case study
        </button>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
