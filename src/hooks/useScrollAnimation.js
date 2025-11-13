import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for scroll-based animations
 * Tracks scroll position, direction, and provides utilities for scroll animations
 * 
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Scroll threshold for visibility (default: 100)
 * @param {boolean} options.trackDirection - Whether to track scroll direction (default: true)
 * @returns {Object} Scroll state and utilities
 */
const useScrollAnimation = (options = {}) => {
  const {
    threshold = 100,
    trackDirection = true
  } = options;

  const [scrollState, setScrollState] = useState({
    scrollY: 0,
    scrollX: 0,
    scrollProgress: 0,
    direction: null,
    isScrollingDown: false,
    isScrollingUp: false,
    isAtTop: true,
    isAtBottom: false,
    hasScrolled: false
  });

  const previousScrollY = useRef(0);
  const ticking = useRef(false);

  // Calculate scroll progress (0-100)
  const calculateScrollProgress = useCallback(() => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const trackLength = documentHeight - windowHeight;
    
    return trackLength > 0 ? (scrollTop / trackLength) * 100 : 0;
  }, []);

  // Handle scroll event with RAF for performance
  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollProgress = calculateScrollProgress();
        
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        
        const isAtTop = scrollY < threshold;
        const isAtBottom = scrollY + windowHeight >= documentHeight - threshold;
        const hasScrolled = scrollY > threshold;

        let direction = null;
        let isScrollingDown = false;
        let isScrollingUp = false;

        if (trackDirection) {
          if (scrollY > previousScrollY.current) {
            direction = 'down';
            isScrollingDown = true;
          } else if (scrollY < previousScrollY.current) {
            direction = 'up';
            isScrollingUp = true;
          }
          previousScrollY.current = scrollY;
        }

        setScrollState({
          scrollY,
          scrollX,
          scrollProgress,
          direction,
          isScrollingDown,
          isScrollingUp,
          isAtTop,
          isAtBottom,
          hasScrolled
        });

        ticking.current = false;
      });

      ticking.current = true;
    }
  }, [threshold, trackDirection, calculateScrollProgress]);

  // Scroll to specific position
  const scrollTo = useCallback((position, behavior = 'smooth') => {
    window.scrollTo({
      top: position,
      behavior
    });
  }, []);

  // Scroll to top
  const scrollToTop = useCallback((behavior = 'smooth') => {
    scrollTo(0, behavior);
  }, [scrollTo]);

  // Scroll to element
  const scrollToElement = useCallback((elementId, offset = 0, behavior = 'smooth') => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior
      });
    }
  }, []);

  // Check if element is in viewport
  const isElementInViewport = useCallback((element, offset = 0) => {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= -offset &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }, []);

  useEffect(() => {
    // Set initial state
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return {
    ...scrollState,
    scrollTo,
    scrollToTop,
    scrollToElement,
    isElementInViewport
  };
};

export default useScrollAnimation;
