import React from 'react';
import Container from './Container';
import './layout.css';

const Section = ({
  id,
  children,
  className = '',
  alt = false,
  labelledBy,
  containerClassName = ''
}) => (
  <section
    id={id}
    className={`layout-section ${alt ? 'layout-section--alt' : ''} ${className}`.trim()}
    aria-labelledby={labelledBy}
  >
    <Container className={containerClassName}>{children}</Container>
  </section>
);

export default Section;
