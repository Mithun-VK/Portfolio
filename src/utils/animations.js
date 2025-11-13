/* eslint-disable no-unused-expressions */
/**
 * Animation Utilities
 * Reusable animation functions and presets
 */

import { ANIMATION_DURATION } from './constants';

// ============================================
// EASING FUNCTIONS
// ============================================

export const easingFunctions = {
  // No easing, no acceleration
  linear: (t) => t,
  
  // Accelerating from zero velocity
  easeInQuad: (t) => t * t,
  easeInCubic: (t) => t * t * t,
  easeInQuart: (t) => t * t * t * t,
  easeInQuint: (t) => t * t * t * t * t,
  
  // Decelerating to zero velocity
  easeOutQuad: (t) => t * (2 - t),
  easeOutCubic: (t) => (--t) * t * t + 1,
  easeOutQuart: (t) => 1 - (--t) * t * t * t,
  easeOutQuint: (t) => 1 + (--t) * t * t * t * t,
  
  // Acceleration until halfway, then deceleration
  easeInOutQuad: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInOutQuart: (t) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
  easeInOutQuint: (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t,
  
  // Elastic bounce effect
  easeInElastic: (t) => {
    return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1.1) * 5 * Math.PI);
  },
  easeOutElastic: (t) => {
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t - 0.1) * 5 * Math.PI) + 1;
  },
  
  // Bounce effect
  easeOutBounce: (t) => {
    const n1 = 7.5625;
    const d1 = 2.75;

    if (t < 1 / d1) {
      return n1 * t * t;
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75;
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375;
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
  }
};

// ============================================
// SCROLL ANIMATIONS
// ============================================

/**
 * Smooth scroll to element
 * @param {string|HTMLElement} target - Target element or selector
 * @param {number} offset - Offset from top
 * @param {number} duration - Animation duration
 */
export const smoothScrollTo = (target, offset = 0, duration = ANIMATION_DURATION.SLOW) => {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  
  if (!element) return;

  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    
    const easedProgress = easingFunctions.easeInOutCubic(progress);
    window.scrollTo(0, startPosition + distance * easedProgress);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

/**
 * Animate value from start to end
 * @param {number} start - Start value
 * @param {number} end - End value
 * @param {number} duration - Animation duration
 * @param {Function} callback - Callback function with current value
 * @param {string} easing - Easing function name
 */
export const animateValue = (start, end, duration, callback, easing = 'easeInOutCubic') => {
  const startTime = performance.now();
  const easingFn = easingFunctions[easing] || easingFunctions.linear;

  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easingFn(progress);
    const current = start + (end - start) * easedProgress;

    callback(current);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};

// ============================================
// FADE ANIMATIONS
// ============================================

/**
 * Fade in element
 * @param {HTMLElement} element - Target element
 * @param {number} duration - Animation duration
 * @param {Function} callback - Callback on complete
 */
export const fadeIn = (element, duration = ANIMATION_DURATION.BASE, callback) => {
  element.style.opacity = 0;
  element.style.display = 'block';

  let last = +new Date();
  const tick = () => {
    const opacity = +element.style.opacity + (new Date() - last) / duration;
    element.style.opacity = opacity;
    last = +new Date();

    if (+opacity < 1) {
      requestAnimationFrame(tick);
    } else {
      if (callback) callback();
    }
  };

  tick();
};

/**
 * Fade out element
 * @param {HTMLElement} element - Target element
 * @param {number} duration - Animation duration
 * @param {Function} callback - Callback on complete
 */
export const fadeOut = (element, duration = ANIMATION_DURATION.BASE, callback) => {
  element.style.opacity = 1;

  let last = +new Date();
  const tick = () => {
    const opacity = +element.style.opacity - (new Date() - last) / duration;
    element.style.opacity = opacity;
    last = +new Date();

    if (+opacity > 0) {
      requestAnimationFrame(tick);
    } else {
      element.style.display = 'none';
      if (callback) callback();
    }
  };

  tick();
};

// ============================================
// SLIDE ANIMATIONS
// ============================================

/**
 * Slide down element
 * @param {HTMLElement} element - Target element
 * @param {number} duration - Animation duration
 */
export const slideDown = (element, duration = ANIMATION_DURATION.BASE) => {
  element.style.removeProperty('display');
  let display = window.getComputedStyle(element).display;
  if (display === 'none') display = 'block';
  element.style.display = display;

  const height = element.offsetHeight;
  element.style.overflow = 'hidden';
  element.style.height = 0;
  element.style.paddingTop = 0;
  element.style.paddingBottom = 0;
  element.style.marginTop = 0;
  element.style.marginBottom = 0;
  element.offsetHeight; // Force reflow

  element.style.transitionProperty = 'height, margin, padding';
  element.style.transitionDuration = duration + 'ms';
  element.style.height = height + 'px';
  element.style.removeProperty('padding-top');
  element.style.removeProperty('padding-bottom');
  element.style.removeProperty('margin-top');
  element.style.removeProperty('margin-bottom');

  setTimeout(() => {
    element.style.removeProperty('height');
    element.style.removeProperty('overflow');
    element.style.removeProperty('transition-duration');
    element.style.removeProperty('transition-property');
  }, duration);
};

/**
 * Slide up element
 * @param {HTMLElement} element - Target element
 * @param {number} duration - Animation duration
 */
export const slideUp = (element, duration = ANIMATION_DURATION.BASE) => {
  element.style.transitionProperty = 'height, margin, padding';
  element.style.transitionDuration = duration + 'ms';
  element.style.height = element.offsetHeight + 'px';
  element.offsetHeight; // Force reflow
  
  element.style.overflow = 'hidden';
  element.style.height = 0;
  element.style.paddingTop = 0;
  element.style.paddingBottom = 0;
  element.style.marginTop = 0;
  element.style.marginBottom = 0;

  setTimeout(() => {
    element.style.display = 'none';
    element.style.removeProperty('height');
    element.style.removeProperty('padding-top');
    element.style.removeProperty('padding-bottom');
    element.style.removeProperty('margin-top');
    element.style.removeProperty('margin-bottom');
    element.style.removeProperty('overflow');
    element.style.removeProperty('transition-duration');
    element.style.removeProperty('transition-property');
  }, duration);
};

// ============================================
// SCROLL REVEAL OBSERVER
// ============================================

/**
 * Create intersection observer for scroll animations
 * @param {Object} options - Observer options
 * @returns {IntersectionObserver} Observer instance
 */
export const createScrollObserver = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    className = 'is-visible',
    once = true
  } = options;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(className);
        if (once) {
          observer.unobserve(entry.target);
        }
      } else if (!once) {
        entry.target.classList.remove(className);
      }
    });
  }, {
    threshold,
    rootMargin
  });

  return observer;
};

// ============================================
// STAGGER ANIMATIONS
// ============================================

/**
 * Apply stagger animation to elements
 * @param {NodeList|Array} elements - Elements to animate
 * @param {number} delay - Delay between each element
 * @param {Function} animationFn - Animation function
 */
export const staggerAnimation = (elements, delay = 100, animationFn = fadeIn) => {
  elements.forEach((element, index) => {
    setTimeout(() => {
      animationFn(element);
    }, index * delay);
  });
};

// Export all as default for convenience
export default {
  easingFunctions,
  smoothScrollTo,
  animateValue,
  fadeIn,
  fadeOut,
  slideDown,
  slideUp,
  createScrollObserver,
  staggerAnimation
};
