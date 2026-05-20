import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { float } from '../../../utils/motion';
import './FloatingShapes.css';

const FloatingShapes = ({ count = 6 }) => {
  const reduced = useReducedMotion();

  if (reduced) return null;

  const shapes = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
    type: Math.floor(Math.random() * 3) // 0: circle, 1: square, 2: triangle
  }));

  const getShapeContent = (type) => {
    switch (type) {
      case 0:
        return <div className="floating-shape__circle" />;
      case 1:
        return <div className="floating-shape__square" />;
      case 2:
        return <div className="floating-shape__triangle" />;
      default:
        return <div className="floating-shape__circle" />;
    }
  };

  return (
    <div className="floating-shapes">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="floating-shape"
          style={{
            position: 'absolute',
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            opacity: 0.1
          }}
          variants={float}
          animate="animate"
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          {getShapeContent(shape.type)}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingShapes;
