import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './Button.css';

/**
 * Reusable Button component with multiple variants, sizes, and states
 * Supports icons, loading states, and full accessibility
 */
const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'medium',
  type = 'button',
  disabled = false,
  loading = false,
  fullWidth = false,
  iconLeft = null,
  iconRight = null,
  onClick,
  className = '',
  ariaLabel,
  ...props
}, ref) => {

  // Combine class names based on props
  const buttonClasses = [
    'button',
    `button--${variant}`,
    `button--${size}`,
    fullWidth && 'button--full-width',
    loading && 'button--loading',
    disabled && 'button--disabled',
    className
  ].filter(Boolean).join(' ');

  // Handle click with loading and disabled checks
  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    
    if (onClick) {
      onClick(e);
    }
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <span className="button__spinner" aria-hidden="true">
      <svg
        className="button__spinner-icon"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="button__spinner-circle"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="button__spinner-path"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </span>
  );

  return (
    <button
      ref={ref}
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      {...props}
    >
      {/* Loading Spinner */}
      {loading && <LoadingSpinner />}

      {/* Left Icon */}
      {iconLeft && !loading && (
        <span className="button__icon button__icon--left" aria-hidden="true">
          {iconLeft}
        </span>
      )}

      {/* Button Content */}
      <span className={`button__content ${loading ? 'button__content--loading' : ''}`}>
        {children}
      </span>

      {/* Right Icon */}
      {iconRight && !loading && (
        <span className="button__icon button__icon--right" aria-hidden="true">
          {iconRight}
        </span>
      )}
    </button>
  );
});

Button.displayName = 'Button';

Button.propTypes = {
  /** Button content (text, elements, etc.) */
  children: PropTypes.node.isRequired,
  
  /** Visual variant of the button */
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'outline',
    'ghost',
    'danger',
    'success',
    'link'
  ]),
  
  /** Size of the button */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  
  /** HTML button type */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  
  /** Disabled state */
  disabled: PropTypes.bool,
  
  /** Loading state - shows spinner and prevents interaction */
  loading: PropTypes.bool,
  
  /** Makes button full width of container */
  fullWidth: PropTypes.bool,
  
  /** Icon to display on the left side */
  iconLeft: PropTypes.node,
  
  /** Icon to display on the right side */
  iconRight: PropTypes.node,
  
  /** Click handler */
  onClick: PropTypes.func,
  
  /** Additional CSS classes */
  className: PropTypes.string,
  
  /** ARIA label for accessibility */
  ariaLabel: PropTypes.string
};

export default Button;
