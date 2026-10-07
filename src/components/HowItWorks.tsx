import React from 'react';
import { motion } from 'framer-motion';
import EnterpriseAIPipeline from '@/components/ui/ai-agent-pipeline';

interface HowItWorksProps {
  onExploreModule?: (module: 'ai-automation' | 'conversations' | 'products' | 'platform' | 'workflows') => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = () => {
  return (
    <section id="how-it-works" className="relative py-20 lg:py-28 bg-[#090a0f] text-neutral-100 border-b border-neutral-900/80 overflow-hidden transition-colors">
      
      {/* Background Architectural Subtle Accents */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[radial-gradient(ellipse_at_center,oklch(78.9%_0.154_211.53/0.06),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.01)_0%,transparent_100%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with smooth slide-up reveal */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(5px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-3.5 px-3 py-1 rounded-sm cyber-glass border border-white/10 text-[10px] font-mono-code tracking-[0.25em] text-neutral-400 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-semibold text-neutral-300">COMMENT ÇA MARCHE</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase leading-tight mb-4">
            Du message à l'action.
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base font-body leading-relaxed max-w-lg mx-auto">
            Un pipeline en trois étapes convertissant chaque intention de message en résultat commercial vérifié en quelques millisecondes.
          </p>
        </motion.div>

        {/* Live Interactive 3-Step Pipeline: Messenger → AI → Automation */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center"
        >
          <EnterpriseAIPipeline accentColor="oklch(78.9% 0.154 211.53)" />
        </motion.div>

      </div>
    </section>
  );
};
