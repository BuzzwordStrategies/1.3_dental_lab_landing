// src/utils/animations.js - Animation utilities for consistent motion design
export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export const fadeInDown = {
  initial: { opacity: 0, y: -60 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.6 }
};

export const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.6 }
};

export const scaleOnHover = {
  whileHover: { scale: 1.05 },
  transition: { duration: 0.2 }
};

export const buttonHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { duration: 0.2 }
};

export const cardHover = {
  whileHover: { y: -5, scale: 1.02 },
  transition: { duration: 0.3 }
};

export const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export const slideInFromBottom = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 100 },
  transition: { duration: 0.5 }
};

export const modalAnimation = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
  transition: { duration: 0.3 }
};

export const pulseAnimation = {
  animate: { scale: [1, 1.05, 1] },
  transition: { repeat: Infinity, duration: 2 }
};

export const bounceAnimation = {
  animate: { y: [0, -10, 0] },
  transition: { repeat: Infinity, duration: 1.5 }
};

// Utility function to create delayed animations
export const withDelay = (animation, delay) => ({
  ...animation,
  transition: {
    ...animation.transition,
    delay
  }
});

// Utility function to create viewport-triggered animations
export const withViewport = (animation, options = {}) => ({
  ...animation,
  viewport: {
    once: true,
    amount: 0.3,
    ...options
  }
});

export default {
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleOnHover,
  buttonHover,
  cardHover,
  staggerContainer,
  staggerItem,
  slideInFromBottom,
  modalAnimation,
  pulseAnimation,
  bounceAnimation,
  withDelay,
  withViewport
};
