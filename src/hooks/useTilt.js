import { useState, useRef, useCallback } from 'react';

/**
 * Custom hook for 3D tilt effect on cards
 * Creates a realistic 3D rotation based on mouse position
 * 
 * @param {number} maxRotation - Maximum rotation in degrees (default: 15)
 * @param {number} perspective - Perspective depth (default: 1000)
 * @returns {Object} Tilt state and event handlers
 */
const useTilt = (maxRotation = 15, perspective = 1000) => {
  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    translateX: 0,
    translateY: 0
  });
  
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const animationFrame = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate rotation based on mouse position
    const rotateX = (mouseY / (rect.height / 2)) * -maxRotation;
    const rotateY = (mouseX / (rect.width / 2)) * maxRotation;
    
    // Add slight translation for more realistic effect
    const translateX = (mouseX / rect.width) * 10;
    const translateY = (mouseY / rect.height) * 10;

    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }

    animationFrame.current = requestAnimationFrame(() => {
      setTransform({
        rotateX: Math.max(-maxRotation, Math.min(maxRotation, rotateX)),
        rotateY: Math.max(-maxRotation, Math.min(maxRotation, rotateY)),
        scale: 1.02,
        translateX,
        translateY
      });
    });
  }, [maxRotation]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }

    animationFrame.current = requestAnimationFrame(() => {
      setTransform({
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        translateX: 0,
        translateY: 0
      });
    });
  }, []);

  const getTransformStyle = useCallback(() => {
    return {
      transform: `
        perspective(${perspective}px)
        rotateX(${transform.rotateX}deg)
        rotateY(${transform.rotateY}deg)
        scale(${transform.scale})
        translateX(${transform.translateX}px)
        translateY(${transform.translateY}px)
      `,
      transition: isHovered ? 'none' : 'transform 0.3s ease-out'
    };
  }, [transform, isHovered, perspective]);

  return {
    ref,
    transform,
    isHovered,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    getTransformStyle
  };
};

export default useTilt;
