// src/AnimatedBackground.js

import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground1 = () => {
  const variants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [1, 0.7, 1],
      borderRadius: ["20%", "50%", "20%"],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "mirror"
      }
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-dark-purple to-light-purple z-[-1]"
      variants={variants}
      animate="animate"
    />
  );
};

export default AnimatedBackground1;
