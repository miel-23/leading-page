'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = '',
  delay = 0.15,
}) => {
  const words = text.split(' ');

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: (customDelay = delay) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: customDelay,
      },
    }),
  };

  const wordVariants: Variants = {
    hidden: {
      y: '120%',
      opacity: 0,
      filter: 'blur(8px)',
    },
    visible: {
      y: '0%',
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for snappy, cinematic deceleration
      },
    },
  };

  return (
    <motion.h2
      className={`inline-flex flex-wrap items-center gap-x-2.5 sm:gap-x-3 gap-y-1 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden py-1"
        >
          <motion.span
            className="inline-block bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent font-semibold"
            variants={wordVariants}
          >
            {word}
          </motion.span>
        </span>
      ))}
      {/* Subtle futuristic pulsing indicator dot at the end */}
      <motion.span
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: delay + words.length * 0.12 + 0.3, duration: 0.4 }}
        className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6] ml-1 self-center"
      />
    </motion.h2>
  );
};
