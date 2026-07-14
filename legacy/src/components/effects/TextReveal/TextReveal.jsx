import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { characterReveal } from '../../../utils/motion';
import './TextReveal.css';

const TextReveal = ({ text, className = '', delay = 0, duration = 0.05 }) => {
  const reduced = useReducedMotion();

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  const characters = text.split('');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: duration,
        delayChildren: delay
      }
    }
  };

  return (
    <motion.span
      className={`text-reveal ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          className="text-reveal__char"
          variants={characterReveal}
          style={{
            display: char === ' ' ? 'inline' : 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : 'normal'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default TextReveal;
