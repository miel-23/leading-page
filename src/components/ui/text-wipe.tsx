'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TextWipeProps {
  text: string;
  className?: string;
  loop?: boolean;
  duration?: number;
  pauseDuration?: number;
  delay?: number;
}

export const TextWipe: React.FC<TextWipeProps> = ({
  text,
  className = '',
  loop = true,
}) => {
  // 5-second full loop cycle
  // 0s -> 1.2s: Wipe in (0% to 24%)
  // 1.2s -> 3.8s: Fully visible reading phase (24% to 76%)
  // 3.8s -> 4.6s: Wipe out (76% to 92%)
  // 4.6s -> 5.0s: Pause before next loop (92% to 100%)

  const clipPathKeyframes = loop
    ? [
        'inset(0 100% 0 0)', // 0%
        'inset(0 0% 0 0)',   // 24% (fully revealed)
        'inset(0 0% 0 0)',   // 76% (held open)
        'inset(0 0% 0 100%)', // 92% (wiped away)
        'inset(0 100% 0 0)', // 94% (reset to left)
        'inset(0 100% 0 0)', // 100%
      ]
    : ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'];

  const clipPathTimes = loop ? [0, 0.24, 0.76, 0.92, 0.94, 1] : [0, 1];

  const laserLeftKeyframes = loop
    ? [
        '0%',   // 0%
        '100%', // 24%
        '100%', // 74%
        '0%',   // 76%
        '100%', // 92%
        '100%', // 100%
      ]
    : ['0%', '100%'];

  const laserOpacityKeyframes = loop
    ? [
        0, // 0%
        1, // 4%
        1, // 22%
        0, // 25%
        0, // 74%
        0, // 75%
        1, // 77%
        1, // 90%
        0, // 93%
        0, // 100%
      ]
    : [0, 1, 1, 0];

  const laserTimes = loop
    ? [0, 0.04, 0.22, 0.25, 0.74, 0.75, 0.77, 0.9, 0.93, 1]
    : [0, 0.05, 0.95, 1];

  return (
    <div
      className={`relative inline-block overflow-hidden py-1 cursor-default select-none ${className}`}
    >
      {/* Background Ghost / Depth Layer for visual anchor */}
      <div className="opacity-25 text-neutral-500 font-semibold tracking-wide">
        {text}
      </div>

      {/* Looping Wiping Text Reveal via Clip-Path */}
      <motion.div
        className="absolute inset-0 flex items-center overflow-hidden py-1"
        animate={{
          clipPath: clipPathKeyframes,
        }}
        transition={{
          duration: loop ? 5.2 : 1.2,
          repeat: loop ? Infinity : 0,
          repeatType: 'loop',
          times: clipPathTimes,
          ease: 'easeInOut',
        }}
      >
        <span className="whitespace-nowrap font-semibold tracking-wide bg-gradient-to-r from-white via-neutral-100 to-neutral-300 bg-clip-text text-transparent drop-shadow-sm">
          {text}
        </span>
      </motion.div>

      {/* High-Tech Glowing Laser Wipe Blade that loops synchronously */}
      <motion.div
        className="absolute top-0 bottom-0 w-[2.5px] bg-gradient-to-b from-transparent via-[oklch(78.9%_0.154_211.53)] to-transparent shadow-[0_0_14px_oklch(78.9%_0.154_211.53)] pointer-events-none z-20"
        animate={{
          left: laserLeftKeyframes,
          opacity: laserOpacityKeyframes,
        }}
        transition={{
          duration: loop ? 5.2 : 1.2,
          repeat: loop ? Infinity : 0,
          repeatType: 'loop',
          times: laserTimes,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};
