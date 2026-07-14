import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = ({ 
  children, 
  variant = 'default',
  hoverable = false,
  clickable = false,
  onClick,
  loading = false,
  className = '',
  ...props 
}) => {
  const cardClasses = [
    'card',
    `card--${variant}`,
    hoverable && 'card--hoverable',
    clickable && 'card--clickable',
    loading && 'card--loading',
    className
  ].filter(Boolean).join(' ');

  const CardWrapper = clickable ? 'button' : 'div';

  if (loading) {
    return (
      <div className={cardClasses}>
        <CardSkeleton />
      </div>
    );
  }

  return (
    <CardWrapper
      className={cardClasses}
      onClick={clickable ? onClick : undefined}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      {...props}
    >
      {children}
    </CardWrapper>
  );
};

const CardSkeleton = () => (
  <>
    <div className="card__skeleton-image"></div>
    <div className="card__skeleton-body">
      <div className="card__skeleton-title"></div>
      <div className="card__skeleton-text"></div>
      <div className="card__skeleton-text card__skeleton-text--short"></div>
    </div>
  </>
);

Card.Header = ({ children, className = '' }) => (
  <div className={`card__header ${className}`}>
    {children}
  </div>
);

Card.Image = ({ src, alt, overlay = false, className = '' }) => (
  <div className={`card__image ${overlay ? 'card__image--overlay' : ''} ${className}`}>
    <img src={src} alt={alt} loading="lazy" />
    {overlay && <div className="card__image-overlay">{overlay}</div>}
  </div>
);

Card.Body = ({ children, className = '' }) => (
  <div className={`card__body ${className}`}>
    {children}
  </div>
);

Card.Title = ({ children, className = '' }) => (
  <h3 className={`card__title ${className}`}>
    {children}
  </h3>
);

Card.Description = ({ children, className = '' }) => (
  <p className={`card__description ${className}`}>
    {children}
  </p>
);

Card.Tags = ({ tags = [], onTagClick, className = '' }) => (
  <div className={`card__tags ${className}`}>
    {tags.map((tag, index) => (
      <span 
        key={index} 
        className="card__tag"
        onClick={onTagClick ? () => onTagClick(tag) : undefined}
        role={onTagClick ? 'button' : undefined}
      >
        {tag}
      </span>
    ))}
  </div>
);

Card.Badge = ({ children, variant = 'default', className = '' }) => (
  <div className={`card__badge card__badge--${variant} ${className}`}>
    {children}
  </div>
);

Card.Footer = ({ children, className = '' }) => (
  <div className={`card__footer ${className}`}>
    {children}
  </div>
);

Card.Meta = ({ author, date, readTime, className = '' }) => (
  <div className={`card__meta ${className}`}>
    {author && <span className="card__meta-item">{author}</span>}
    {date && <span className="card__meta-item">{date}</span>}
    {readTime && <span className="card__meta-item">{readTime}</span>}
  </div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'outlined', 'elevated', 'filled']),
  hoverable: PropTypes.bool,
  clickable: PropTypes.bool,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  className: PropTypes.string
};

Card.Header.displayName = 'Card.Header';
Card.Image.displayName = 'Card.Image';
Card.Body.displayName = 'Card.Body';
Card.Title.displayName = 'Card.Title';
Card.Description.displayName = 'Card.Description';
Card.Tags.displayName = 'Card.Tags';
Card.Badge.displayName = 'Card.Badge';
Card.Footer.displayName = 'Card.Footer';
Card.Meta.displayName = 'Card.Meta';

export default Card;
