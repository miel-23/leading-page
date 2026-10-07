import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import messengerFlowImg from '../assets/images/messenger_automation_flow_1791032018951.jpg';
import neuralCoreImg from '../assets/images/automation_neural_core_1791032031831.jpg';

interface PlatformOverviewProps {
  onExploreModule: (module: 'ai-automation' | 'conversations' | 'products' | 'workflows') => void;
}

export const PlatformOverview: React.FC<PlatformOverviewProps> = ({ onExploreModule }) => {
  const capabilities = [
    {
      index: '01',
      title: 'Omnichannel Messenger Unification',
      description:
        'Bridge Facebook Messenger, WhatsApp Business, Instagram Direct, and Web Chat widgets into a single persistent conversation ledger with real-time bidirectional webhooks.',
      module: 'conversations' as const,
    },
    {
      index: '02',
      title: 'Conversational Commerce & Instant Checkout',
      description:
        'Display interactive product carousels directly inside customer chats. Generate secure one-click checkout tokens with automatic inventory reservation and fraud prevention.',
      module: 'products' as const,
    },
    {
      index: '03',
      title: 'Dynamic Reservation & Table Allocator',
      description:
        'Intelligently inspect table and appointment availability across multiple locations. Issue instant booking confirmations, calendar invites, and automated SMS reminder loops.',
      module: 'ai-automation' as const,
    },
    {
      index: '04',
      title: 'Autonomous Multi-Agent Workflows',
      description:
        'Chain Gemini natural language models, database queries, Stripe transactions, and logistics updates together with zero operational overhead and sub-second execution.',
      module: 'workflows' as const,
    },
  ];

  return (
    <section id="platform" className="py-16 lg:py-24 bg-neutral-950 text-neutral-100 border-b border-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with smooth slide-up */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16"
        >
          <div className="flex items-center gap-2 mb-3 text-xs font-mono-code text-neutral-400 tracking-widest uppercase">
            <span>PLATFORM ARCHITECTURE</span>
            <span aria-hidden="true">·</span>
            <span>SPECIFICATION</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Engineered for Autonomous Scale
          </h2>
          <p className="text-neutral-400 text-base font-body leading-relaxed">
            Automation Hub replaces disconnected chatbots with a high-concurrency operating system. Synchronize customer identity, inventory status, booking tables, and payment confirmation in milliseconds.
          </p>
        </motion.div>

        {/* Asymmetric Bento Showcase - Monochromatic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          
          {/* Bento Card 1: Visual Messenger Flow with smooth upward entrance */}
          <motion.div
            initial={{ opacity: 0, y: 32, filter: 'blur(5px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 rounded-2xl border border-neutral-800 bg-neutral-900/40 overflow-hidden flex flex-col justify-between group"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img
                src={messengerFlowImg}
                alt="Messenger Automation Flow Visualization"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter grayscale-[40%] contrast-110 brightness-90 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              <div className="absolute top-4 left-4 p-2 rounded-lg cyber-glass font-mono-code text-[11px] text-neutral-300 tracking-wider">
                OMNICHANNEL PROTOCOL // DISTRIBUTED
              </div>
            </div>

            <div className="p-6 lg:p-8 space-y-3">
              <h3 className="font-heading text-lg font-bold text-white">
                Zero-Latency Conversational Routing
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-body leading-relaxed">
                Inbound events from Meta graph APIs and WhatsApp Cloud API are processed through an event-driven worker pool. Customer contexts are reconstructed instantaneously from past purchases, inquiries, and loyalty status.
              </p>
              <div className="flex items-center gap-4 text-xs font-mono-code text-neutral-500 pt-2">
                <span>&lt; 14ms Intent Extraction</span>
                <span aria-hidden="true">·</span>
                <span>Bidirectional Webhooks</span>
                <span aria-hidden="true">·</span>
                <span>Active Deduplication</span>
              </div>
            </div>
          </motion.div>

          {/* Bento Card 2: Neural Core Processor */}
          <motion.div
            initial={{ opacity: 0, y: 32, filter: 'blur(5px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 rounded-2xl border border-neutral-800 bg-neutral-900/40 overflow-hidden flex flex-col justify-between group"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <img
                src={neuralCoreImg}
                alt="Automation Neural Processing Core"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter grayscale-[35%] contrast-110 brightness-90 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              <div className="absolute top-4 left-4 p-2 rounded-lg cyber-glass font-mono-code text-[11px] text-neutral-300 tracking-wider">
                HYPER-REASONING // ENGINE
              </div>
            </div>

            <div className="p-6 lg:p-8 space-y-3">
              <h3 className="font-heading text-lg font-bold text-white">
                Context-Aware Commerce Logic
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-body leading-relaxed">
                Rather than static canned answers, the engine performs real-time relational lookups across your live products database, customer CRM, and reservation books to formulate accurate transaction options.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onExploreModule('ai-automation')}
                  className="inline-flex items-center gap-2 text-xs font-mono-code font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer"
                >
                  <span>Launch Live Simulator</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Core Capabilities List with Staggered Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {capabilities.map((cap, idx) => (
            <motion.div
              key={cap.index}
              initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onExploreModule(cap.module)}
              className="p-6 rounded-2xl cyber-glass border border-neutral-800 hover:border-neutral-700 transition-all duration-200 group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono-code text-sm font-bold text-neutral-400 group-hover:text-white transition-colors">
                  {cap.index}.
                </span>
                <span className="text-[11px] font-mono-code text-neutral-500 group-hover:text-neutral-300 transition-colors flex items-center gap-1">
                  <span>Explore Feature</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
              <h3 className="font-heading text-base font-bold text-white mb-2 group-hover:text-neutral-200 transition-colors">
                {cap.title}
              </h3>
              <p className="text-xs text-neutral-400 font-body leading-relaxed">
                {cap.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quantified Rigor Proof Metrics with subtle scale & unblur */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.99, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 rounded-2xl border border-neutral-800 bg-neutral-900/40 grid grid-cols-2 lg:grid-cols-4 gap-6 font-mono-code"
        >
          <div>
            <div className="text-3xl sm:text-4xl font-black text-white tabular-nums">99.4%</div>
            <div className="text-xs text-neutral-300 mt-1 font-body">Autonomous Resolution Rate</div>
            <div className="text-[10px] text-neutral-500 mt-0.5">Across 2.4M customer sessions</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-white tabular-nums">&lt; 14ms</div>
            <div className="text-xs text-neutral-300 mt-1 font-body">Intent Semantic Parsing</div>
            <div className="text-[10px] text-neutral-500 mt-0.5">Zero cold-start edge execution</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-white tabular-nums">3.8x</div>
            <div className="text-xs text-neutral-300 mt-1 font-body">In-Chat Order Velocity</div>
            <div className="text-[10px] text-neutral-500 mt-0.5">Compared to web storefront cart drop-off</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-white tabular-nums">100%</div>
            <div className="text-xs text-neutral-300 mt-1 font-body">Omnichannel Profile Sync</div>
            <div className="text-[10px] text-neutral-500 mt-0.5">Unified identity across 4 networks</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
