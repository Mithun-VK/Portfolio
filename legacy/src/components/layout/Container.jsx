import React from 'react';
import './layout.css';

const Container = ({ children, className = '', as: Tag = 'div', ...props }) => (
  <Tag className={`layout-container ${className}`.trim()} {...props}>
    {children}
  </Tag>
);

export default Container;
