'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Cpu, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { ThemeMode } from '../../types';

interface ScrolltellingOverlayProps {
  progress: number;
  theme: ThemeMode;
  onJumpToPhase: (phaseIndex: number) => void;
  onExploreModules: () => void;
}

const PHASES = [
  {
    id: 1,
    range: [0.00, 0.11],
    tag: 'PHASE 01 // ARCHITECTURE',
    title: 'AUTOMATION HUB',
    subtitle: 'Autonomous Omnichannel Operations',
    description: 'A minimal AI core floats in equilibrium. Very subtle particles and atmospheric light anticipate operational activation.',
    badge: 'CORE STATUS: EQUILIBRIUM',
  },
  {
    id: 2,
    range: [0.11, 0.22],
    tag: 'PHASE 02 // ACTIVATION',
    title: 'INTELLIGENT AUTOMATION',
    subtitle: 'Neural Decision Engine Online',
    description: 'The AI core accelerates into gyroscopic rotation. Data particles energize as connection listeners boot across Meta, WhatsApp, and Instagram.',
    badge: 'TELEMETRY: LIVE 4.8 GHz',
  },
  {
    id: 3,
    range: [0.22, 0.33],
    tag: 'PHASE 03 // MESSENGER',
    title: 'MESSAGE RECEIVED',
    subtitle: '↓ AI PROCESSING',
    description: 'Camera closes in on the core. Real-time conversational streams arrive with zero queue latency, streaming directly into the neural classifier.',
    badge: 'INGESTION: 0.8ms LATENCY',
  },
  {
    id: 4,
    range: [0.33, 0.44],
    tag: 'PHASE 04 // AI ANALYSIS',
    title: 'UNDERSTAND · ANALYZE · RESPOND',
    subtitle: 'Deep Multi-Modal Comprehension',
    description: 'Dynamic connection lines radiate across the network. Intent parsing, semantic classification, and deterministic decision trees trigger simultaneously.',
    badge: 'PRECISION: 99.8% CONFIDENCE',
  },
  {
    id: 5,
    range: [0.44, 0.55],
    tag: 'PHASE 05 // CUSTOMER',
    title: 'CUSTOMER PROFILE SYNTHESIS',
    subtitle: 'Cross-Channel Identity Resolution',
    description: 'Customer nodes emerge in 3D. The AI links conversations with lifetime order history, dietary preferences, and VIP reservation privileges.',
    badge: 'IDENTITY: SARAH CHEN (VIP)',
  },
  {
    id: 6,
    range: [0.55, 0.66],
    tag: 'PHASE 06 // PRODUCT',
    title: 'PRODUCT DETECTED',
    subtitle: 'Live Inventory & Catalog Matching',
    description: '3D catalog tokens materialize. Real-time stock validation and dynamic pricing lock directly into conversational memory without human latency.',
    badge: 'CATALOG: CELLAR SELECTION #84',
  },
  {
    id: 7,
    range: [0.66, 0.77],
    tag: 'PHASE 07 // TRANSACTION',
    title: 'AUTONOMOUS ORDER SETTLED',
    subtitle: 'Instant Reservation & Payment Hold',
    description: 'Dialogue transforms seamlessly into a committed transaction. Tables booked, payment tokenized, and POS systems synchronized instantaneously.',
    badge: 'SETTLEMENT: $120.00 PROCESSED',
  },
  {
    id: 8,
    range: [0.77, 0.88],
    tag: 'PHASE 08 // AUTOMATION ENGINE',
    title: 'THE AUTOMATION ENGINE',
    subtitle: 'Messenger + AI + Customer + Product + Order',
    description: 'All nodes intertwine into one unified nervous system. The camera retreats to unveil the complete interconnected operational ecosystem.',
    badge: 'SYSTEM: FULL LATTICE ENGAGED',
  },
  {
    id: 9,
    range: [0.88, 1.00],
    tag: 'PHASE 09 // TRANSITION',
    title: 'ONE SYSTEM. EVERY CONVERSATION.',
    subtitle: 'The Sovereign Operational Standard',
    description: 'The 3D infrastructure gracefully settles into the background. Autonomous commerce operates continuously across all channels.',
    badge: 'READY: DEPLOY WORKSPACE',
  },
];

export const ScrolltellingOverlay: React.FC<ScrolltellingOverlayProps> = ({
  progress,
  theme,
  onJumpToPhase,
  onExploreModules,
}) => {
  // Determine current active phase
  const activePhaseIndex = Math.min(
    PHASES.length - 1,
    Math.max(
      0,
      PHASES.findIndex((p) => progress >= p.range[0] && progress <= p.range[1])
    )
  );

  const activePhase = PHASES[activePhaseIndex] || PHASES[0];

  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-4 sm:p-6 lg:p-8 select-none">
      
      {/* Top Telemetry HUD & Scrub Bar */}
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-2 pt-16 sm:pt-14">
        {/* Scrub progress hairline */}
        <div className="w-full h-[2px] bg-white/[0.08] rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-sky-300 transition-all duration-75 shadow-[0_0_8px_#3b82f6]"
            style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
          />
        </div>

        {/* Live HUD Metadata Line */}
        <div className="flex flex-wrap items-center justify-between text-[10px] font-mono-code text-neutral-400 gap-2">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-white font-bold tracking-wider">
              {activePhase.tag}
            </span>
            <span className="text-neutral-600">·</span>
            <span className="text-blue-400 font-semibold">{activePhase.badge}</span>
          </div>

          <div className="flex items-center gap-3">
            <span>SCROLL PROGRESS: {Math.round(progress * 100).toString().padStart(3, '0')}%</span>
            <span className="text-neutral-600">·</span>
            <span className="text-neutral-500">LENIS GSAP SYNC</span>
          </div>
        </div>

        {/* Clickable Quick-Jump Phase Bar */}
        <div className="hidden md:flex items-center gap-1.5 pt-1 pointer-events-auto overflow-x-auto scrollbar-none">
          {PHASES.map((phase, idx) => {
            const isCurrent = idx === activePhaseIndex;
            return (
              <button
                key={phase.id}
                onClick={() => onJumpToPhase(idx)}
                className={`px-2 py-1 rounded text-[9px] font-mono-code tracking-wider uppercase transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isCurrent
                    ? 'bg-blue-600 text-white font-bold shadow-sm shadow-blue-900/30'
                    : 'bg-white/[0.03] hover:bg-white/[0.08] text-neutral-400 hover:text-white border border-white/[0.06]'
                }`}
                title={`Jump to Phase 0${phase.id}`}
              >
                0{phase.id} {phase.title.split(' ')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Center Narrative Stage Typography (Synchronized With 3D Camera & Nodes) */}
      <div className="w-full max-w-7xl mx-auto my-auto py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePhase.id}
            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl space-y-4"
          >
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-blue-600/20 border border-blue-500/30 text-blue-400 text-[10px] font-mono-code tracking-[0.2em] uppercase font-bold">
              <Sparkles className="h-3 w-3" />
              <span>{activePhase.tag}</span>
            </div>

            {/* Main Editorial Headline with Text Wipe Reveal */}
            <div className="space-y-1">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-none drop-shadow-lg">
                {activePhase.title}
              </h1>
              <p className="font-display text-lg sm:text-xl lg:text-2xl text-blue-400 font-semibold tracking-wide">
                {activePhase.subtitle}
              </p>
            </div>

            {/* Technological Explanation */}
            <p className="text-sm sm:text-base text-neutral-300 font-body leading-relaxed max-w-xl">
              {activePhase.description}
            </p>

            {/* Interactive Action on Final Phase (Phase 09) */}
            {activePhase.id === 9 && (
              <div className="pt-2 pointer-events-auto">
                <button
                  onClick={onExploreModules}
                  className="inline-flex items-center gap-2.5 px-6 py-3 text-xs font-bold font-mono-code tracking-widest uppercase text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-all duration-200 cursor-pointer shadow-lg shadow-blue-900/30 active:scale-95"
                >
                  <span>EXPLORE OPERATIONAL MODULES</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom HUD & Scroll Indicator */}
      <div className="w-full max-w-7xl mx-auto flex items-end justify-between pb-4 sm:pb-6 text-xs font-mono-code text-neutral-400">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-neutral-300">
            <Cpu className="h-3.5 w-3.5 text-blue-400" />
            <span>NEURAL PIPELINE: ACTIVE</span>
          </div>
          <span className="hidden sm:inline text-neutral-600">·</span>
          <span className="hidden sm:inline text-[10px] text-neutral-500">
            MOUSE PARALLAX ENGAGED
          </span>
        </div>

        {/* Scroll Call to Action Prompt */}
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-neutral-400">
          <span>{progress > 0.88 ? 'SCROLL TO CONTINUE' : 'SCROLL TO EXPLORE TECHNOLOGY'}</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="h-3.5 w-3.5 text-blue-400" />
          </motion.div>
        </div>
      </div>

    </div>
  );
};
