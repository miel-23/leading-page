import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { SplineScene } from '@/components/ui/splite';
import { Spotlight } from '@/components/ui/spotlight';
import { TextWipe } from '@/components/ui/text-wipe';
import { ThemeMode } from '../types';

interface HeroSectionProps {
  theme: ThemeMode;
  onGetStarted: () => void;
  onExploreModule: (module: 'ai-automation' | 'conversations' | 'products' | 'platform' | 'workflows') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  theme,
  onGetStarted,
  onExploreModule,
}) => {
  return (
    <section className="relative min-h-[92vh] lg:min-h-screen w-full overflow-hidden bg-[#090a0f] text-neutral-100 flex flex-col justify-between pt-28 sm:pt-32 lg:pt-28 pb-10 sm:pb-12">
      {/* Background Architectural Columns & Subtle Atmospheric Light (Matching Reference Image) */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Soft top-down atmospheric illumination & subtle cyan/azure primary aura */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_60%_25%,oklch(78.9%_0.154_211.53/0.1),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_20%_20%,oklch(78.9%_0.154_211.53/0.05),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.015)_0%,transparent_35%)]" />

        {/* 4 Architectural Vertical Columns matching the reference image */}
        <div className="absolute left-0 top-0 bottom-0 w-[24%] border-r border-white/[0.03] bg-white/[0.003]" />
        <div className="absolute left-[24%] top-0 bottom-0 w-[26%] border-r border-white/[0.03] bg-white/[0.007]" />
        <div className="absolute left-[50%] top-0 bottom-0 w-[25%] border-r border-white/[0.03]" />
        <div className="absolute left-[75%] top-0 bottom-0 w-[25%]" />
      </div>

      {/* Main Hero Container */}
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 z-10 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Visual Typography (Faithful to Reference Image - Completely Preserved) */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-5 sm:space-y-6 lg:space-y-7">
            
            {/* Primary Accent Badge (Single focal accent from reference image) */}
            <div className="inline-flex items-center gap-2.5 sm:gap-3 flex-wrap">
              <span className="bg-primary text-neutral-950 text-[10px] sm:text-[11px] font-black tracking-[0.22em] sm:tracking-[0.25em] px-3 sm:px-3.5 py-1 uppercase rounded-sm shadow-sm shadow-primary/20">
                ICI ET MAINTENANT
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono-code tracking-[0.20em] sm:tracking-[0.22em] text-neutral-400 uppercase">
                AUTOMATION HUB
              </span>
            </div>

            {/* Giant Monochromatic Typography (FUTUR + Futuristic E from Reference Image) */}
            <div className="space-y-1.5">
              <div className="flex items-center">
                <h1 className="font-heading text-5xl sm:text-7xl xl:text-8xl 2xl:text-9xl font-black tracking-tight text-white leading-none uppercase select-none flex items-center">
                  <span>FUTUR</span>
                  {/* Futuristic "E" with three horizontal lines, identical to the reference logo */}
                  <span className="inline-flex flex-col justify-between h-[0.72em] w-[0.55em] ml-1 sm:ml-2 py-[0.06em]">
                    <span className="h-[0.16em] w-full bg-white rounded-[1px]" />
                    <span className="h-[0.16em] w-[80%] bg-white rounded-[1px]" />
                    <span className="h-[0.16em] w-full bg-white rounded-[1px]" />
                  </span>
                </h1>
              </div>
              <TextWipe
                text="Opérations Omnicanales Autonomes"
                className="font-display text-lg sm:text-2xl xl:text-3xl tracking-wide font-semibold"
                delay={0.25}
              />
            </div>

            {/* Subtitle Description */}
            <p className="max-w-xl text-xs sm:text-sm md:text-base text-neutral-400 leading-relaxed font-body">
              Automatisez vos conversations Messenger, WhatsApp et Web avec l'Intelligence Artificielle. Transformez chaque échange client en opportunité commerciale avec gestion autonome des commandes, réservations et données en temps réel.
            </p>

            {/* Action Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1">
              <button
                onClick={() => onExploreModule('how-it-works' as any)}
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs font-black tracking-widest uppercase text-neutral-950 bg-primary hover:bg-primary-hover rounded-lg transition-all duration-200 active:scale-[0.98] cursor-pointer shadow-lg shadow-primary/20 hover:shadow-primary/35 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 text-center"
              >
                <span>DÉCOUVRIR LA PLATEFORME</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onExploreModule('demo' as any)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold tracking-wider text-neutral-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-primary/40 rounded-lg transition-all duration-200 cursor-pointer hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 text-center"
              >
                <Zap className="h-3.5 w-3.5 text-primary" />
                <span>VOIR LA DÉMO</span>
              </button>
            </div>

          </div>

          {/* Right Column: 3D Spline Scene Without Any Box/Card Background (Transparent PNG Mode directly over hero bg) */}
          <div className="lg:col-span-6 relative w-full h-[320px] sm:h-[460px] lg:h-[620px] flex items-center justify-center bg-transparent">
            {/* Interactive Spotlight Glow */}
            <Spotlight
              className="-top-24 left-10 md:left-24"
              fill="white"
            />
            {/* Spline Canvas - Screen blend mode to eliminate any black background like a transparent PNG */}
            <div className="w-full h-full relative z-10 flex items-center justify-center bg-transparent [mix-blend-mode:screen]">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full bg-transparent"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
