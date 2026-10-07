'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrolltellingCanvas } from './ScrolltellingCanvas';
import { ScrolltellingOverlay } from './ScrolltellingOverlay';
import { ThemeMode } from '../../types';

gsap.registerPlugin(ScrollTrigger);

interface ScrolltellingExperienceProps {
  theme: ThemeMode;
  onExploreModules: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const ScrolltellingExperience: React.FC<ScrolltellingExperienceProps> = ({
  theme,
  onExploreModules,
  onScrollToSection,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // 1. Mouse Tracking for Parallax Depth
  useEffect(() => {
    let animationFrameId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const updateParallax = () => {
      // Smooth lerp for buttery mouse offset
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      setMousePosition({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // 2. GSAP ScrollTrigger Integration
  useEffect(() => {
    if (!containerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.0,
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  // Jump to specific narrative phase
  const handleJumpToPhase = (phaseIndex: number) => {
    if (!containerRef.current) return;
    const phaseRanges = [0.00, 0.11, 0.22, 0.33, 0.44, 0.55, 0.66, 0.77, 0.88];
    const targetP = phaseRanges[phaseIndex] ?? 0;
    
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetScrollY = containerTop + targetP * containerHeight;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  };

  return (
    <div
      ref={containerRef}
      id="scrolltelling-experience"
      className="relative w-full h-[850vh] bg-[#090a0f] transition-colors"
    >
      {/* Sticky Pinned 3D Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background Architectural Atmosphere */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,rgba(37,99,235,0.07),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_65%,rgba(56,189,248,0.04),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.015)_0%,transparent_40%)]" />
        </div>

        {/* 3D WebGL Canvas Layer (Three.js + React Three Fiber) */}
        <ScrolltellingCanvas
          progress={progress}
          mousePosition={mousePosition}
          theme={theme}
        />

        {/* Synchronized HUD & Editorial Narrative Overlay Layer */}
        <ScrolltellingOverlay
          progress={progress}
          theme={theme}
          onJumpToPhase={handleJumpToPhase}
          onExploreModules={onExploreModules}
        />
      </div>
    </div>
  );
};
