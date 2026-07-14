import React from 'react';
import './layout.css';

const SectionHeader = ({ eyebrow, title, description, center = false, id }) => {
  const titleId = id || (title ? `${title.replace(/\s+/g, '-').toLowerCase()}-heading` : undefined);

  return (
    <header
      className={`layout-section-header ${center ? 'layout-section-header--center' : ''}`.trim()}
    >
      {eyebrow && <p className="layout-section-header__eyebrow">{eyebrow}</p>}
      {title && (
        <h2 id={titleId} className="layout-section-header__title">
          {title}
        </h2>
      )}
      {description && (
        <p className="layout-section-header__description">{description}</p>
      )}
    </header>
  );
};

export default SectionHeader;
