/**
 * Shared Framer Motion variants — editorial, reduced-motion aware
 * Enhanced with advanced animation patterns
 */

export const easeOut = [0.25, 0.1, 0.25, 1];
export const easeInOut = [0.4, 0, 0.2, 1];
export const springConfig = { type: 'spring', stiffness: 100, damping: 15 };

// Basic Animations
export const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 }
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0 }
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0 }
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 16 },
  visible: { opacity: 1, x: 0 }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
};

export const slideUp = {
  hidden: { y: 100, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

// 3D Animations
export const rotate3D = {
  hidden: { opacity: 0, rotateX: -15, rotateY: 15, scale: 0.9 },
  visible: { opacity: 1, rotateX: 0, rotateY: 0, scale: 1 }
};

export const flipIn = {
  hidden: { opacity: 0, rotateY: -90 },
  visible: { opacity: 1, rotateY: 0 }
};

// Container Animations
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 }
  }
};

export const staggerContainerSlow = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

export const staggerFromCenter = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

// Text Animations
export const textReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const characterReveal = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

export const wordReveal = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 }
};

// Card Animations
export const cardHover = {
  hover: { 
    y: -8, 
    scale: 1.02,
    transition: { duration: 0.3, ease: easeOut }
  }
};

export const cardTap = {
  tap: { scale: 0.98 }
};

export const card3D = {
  hidden: { opacity: 0, rotateX: 15, rotateY: -15, scale: 0.95 },
  visible: { opacity: 1, rotateX: 0, rotateY: 0, scale: 1 },
  hover: {
    rotateX: -5,
    rotateY: 5,
    scale: 1.02,
    transition: { duration: 0.4, ease: easeOut }
  }
};

// Modal Animations
export const modalOverlay = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

export const modalContent = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.9, y: 20 }
};

// Page Transitions
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export const pageTransitionFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

// Particle/Background Animations
export const float = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

export const pulse = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

export const glow = {
  animate: {
    boxShadow: [
      '0 0 0 0 rgba(59, 130, 246, 0.4)',
      '0 0 0 10px rgba(59, 130, 246, 0)',
      '0 0 0 0 rgba(59, 130, 246, 0)'
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Magnetic Button
export const magneticButton = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

// Transition Helpers
export const sectionTransition = (reduced) =>
  reduced ? { duration: 0 } : { duration: 0.45, ease: easeOut };

export const smoothTransition = (reduced) =>
  reduced ? { duration: 0 } : { duration: 0.6, ease: easeInOut };

export const bounceTransition = (reduced) =>
  reduced ? { duration: 0 } : { duration: 0.5, ease: easeOut };

// Viewport Configs
export const viewportOnce = { once: true, margin: '-80px' };
export const viewportMultiple = { once: false, margin: '-100px' };
export const viewportEarly = { once: true, margin: '-150px' };

// Motion Props Generators
export const getMotionProps = (reduced) => ({
  initial: reduced ? false : 'hidden',
  whileInView: reduced ? undefined : 'visible',
  viewport: viewportOnce,
  transition: sectionTransition(reduced)
});

export const getScrollMotionProps = (reduced) => ({
  initial: reduced ? false : 'hidden',
  whileInView: reduced ? undefined : 'visible',
  viewport: viewportMultiple,
  transition: smoothTransition(reduced)
});

export const getStaggerProps = (reduced) => ({
  variants: staggerContainer,
  initial: reduced ? false : 'hidden',
  whileInView: reduced ? undefined : 'visible',
  viewport: viewportOnce
});

// Parallax
export const parallaxY = (value) => ({
  y: value,
  transition: { type: 'spring', stiffness: 100, damping: 20 }
});

export const parallaxX = (value) => ({
  x: value,
  transition: { type: 'spring', stiffness: 100, damping: 20 }
});
