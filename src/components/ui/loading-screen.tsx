'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoaderCircle } from 'lucide-react';

interface LoadingScreenProps {
  isLoading: boolean;
  onFinished?: () => void;
}

const FULL_TEXT = 'CHARGEMENT';

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isLoading,
  onFinished,
}) => {
  const [displayText, setDisplayText] = useState(FULL_TEXT);
  const [isDeleting, setIsDeleting] = useState(true);

  // Technical typing / untyping loop
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
        }, 65);
      } else {
        // Short pause when completely deleted
        timeout = setTimeout(() => {
          setIsDeleting(false);
        }, 180);
      }
    } else {
      if (displayText.length < FULL_TEXT.length) {
        timeout = setTimeout(() => {
          setDisplayText(FULL_TEXT.slice(0, displayText.length + 1));
        }, 85);
      } else {
        // Pause when fully typed before next cycle
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 900);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting]);

  return (
    <AnimatePresence onExitComplete={onFinished}>
      {isLoading && (
        <motion.div
          key="global-loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.015 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#090a0f] pointer-events-none select-none"
        >
          {/* Subtle localized radial ambient glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(78.9%_0.154_211.53/0.04)_0%,transparent_60%)]" />

          {/* Core loader container */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-4">
            <LoaderCircle
              className="h-8 w-8 animate-spin"
              style={{ color: 'oklch(78.9% 0.154 211.53)' }}
              strokeWidth={2}
            />

            {/* Technical Animated Text with Cursor */}
            <div className="flex items-center gap-1 text-[11px] font-mono-code tracking-[0.26em] text-neutral-400 font-medium">
              <span>{displayText}</span>
              <span
                className="inline-block w-1.5 h-3.5 bg-primary tech-cursor align-middle"
                style={{ backgroundColor: 'oklch(78.9% 0.154 211.53)' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
