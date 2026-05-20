import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const animationFrame = useRef(null);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const handleMouseMove = (e) => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }

      animationFrame.current = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
        setIsVisible(true);
      });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.interactive')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }

      document.body.style.cursor = 'auto';
    };
  }, []);

  // Don't render on touch devices or with reduced motion
  if (typeof window !== 'undefined' && 
      (window.matchMedia('(prefers-reduced-motion: reduce)').matches || 
       'ontouchstart' in window)) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Main cursor */}
          <motion.div
            className="custom-cursor"
            animate={{
              x: position.x - 16,
              y: position.y - 16,
              scale: isHovering ? 1.5 : 1,
              backgroundColor: isClicking ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.5)'
            }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 28,
              mass: 0.5
            }}
          />
          
          {/* Cursor trail */}
          <motion.div
            className="custom-cursor-trail"
            animate={{
              x: position.x - 8,
              y: position.y - 8,
              scale: isHovering ? 2 : 1
            }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 20,
              mass: 1
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default CustomCursor;
