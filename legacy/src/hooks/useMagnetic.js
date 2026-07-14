import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Custom hook for magnetic button effect
 * Button attracts the cursor and follows it slightly
 * 
 * @param {number} strength - Magnetic strength (default: 0.3)
 * @returns {Object} Magnetic state and event handlers
 */
const useMagnetic = (strength = 0.3) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const animationFrame = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }

    animationFrame.current = requestAnimationFrame(() => {
      setPosition({ x: deltaX, y: deltaY });
    });
  }, [strength]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }

    animationFrame.current = requestAnimationFrame(() => {
      setPosition({ x: 0, y: 0 });
    });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  const getTransformStyle = useCallback(() => {
    return {
      transform: `translate(${position.x}px, ${position.y}px)`,
      transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out'
    };
  }, [position, isHovered]);

  return {
    ref,
    position,
    isHovered,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    getTransformStyle
  };
};

export default useMagnetic;
