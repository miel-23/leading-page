'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

interface ScrollProgressProps {
  onScrollToTop?: () => void;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({ onScrollToTop }) => {
  const { scrollYProgress, scrollY } = useScroll();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  // Smooth physics-based spring animation for the top scroll progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  useEffect(() => {
    const unsubscribeScroll = scrollY.on('change', (latest) => {
      setShowBackToTop(latest > 280);
    });

    const unsubscribePercent = scrollYProgress.on('change', (latest) => {
      setScrollPercent(Math.round(latest * 100));
    });

    return () => {
      unsubscribeScroll();
      unsubscribePercent();
    };
  }, [scrollY, scrollYProgress]);

  const handleBackToTop = () => {
    if (onScrollToTop) {
      onScrollToTop();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Radius and circumference for the circular progress indicator on the button
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;

  return (
    <>
      {/* ============================================================ */}
      {/* 1. ANIMATED TOP SCROLL PROGRESS BAR                          */}
      {/* ============================================================ */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] pointer-events-none select-none bg-neutral-900/20 backdrop-blur-[1px]">
        {/* Animated Bar with luminous primary gradient and glow */}
        <motion.div
          style={{ scaleX }}
          className="h-full w-full origin-left bg-gradient-to-r from-primary/70 via-primary to-blue-400 shadow-[0_0_12px_rgba(24,119,242,0.7)]"
        />

        {/* Dynamic Glowing Tip */}
        <motion.div
          style={{ left: `${scrollPercent}%` }}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#ffffff,0_0_18px_oklch(78.9%_0.154_211.53)] transition-all duration-75"
        />
      </div>

      {/* ============================================================ */}
      {/* 2. FLOATING BACK TO TOP BUTTON WITH CIRCULAR PROGRESS RING   */}
      {/* ============================================================ */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50"
          >
            <button
              onClick={handleBackToTop}
              title="Retourner en haut de la page"
              aria-label="Retourner en haut de la page"
              className="group relative flex items-center justify-center w-12 h-12 rounded-full cyber-glass border border-white/10 hover:border-primary/50 bg-[#0d0f17]/85 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40"
            >
              {/* SVG Circular Progress Track and Fill */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-1" viewBox="0 0 52 52">
                {/* Background Ring */}
                <circle
                  cx="26"
                  cy="26"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="transparent"
                  className="text-white/[0.08]"
                />
                {/* Progress Ring */}
                <circle
                  cx="26"
                  cy="26"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="text-primary transition-all duration-150 shadow-sm"
                />
              </svg>

              {/* Arrow Icon with hover animation */}
              <div className="relative z-10 flex flex-col items-center justify-center text-neutral-300 group-hover:text-white transition-colors">
                <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
              </div>

              {/* Subtle hover tooltip showing scroll percentage */}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[9px] font-mono-code bg-neutral-900 border border-white/10 text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md">
                {scrollPercent}%
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScrollProgress;
