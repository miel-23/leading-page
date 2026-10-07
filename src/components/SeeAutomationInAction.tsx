import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  Bot,
  Sparkles,
  ShoppingBag,
  Users,
  Package,
  Layers,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Zap,
} from 'lucide-react';
import { AIInput } from '@/components/ui/ai-input';

interface MessageItem {
  id: string;
  sender: 'customer' | 'ai';
  text: string;
  time: string;
}

export const SeeAutomationInAction: React.FC = () => {
  // Demo simulation step (0 to 4)
  const [step, setStep] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [orderCount, setOrderCount] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'conversations' | 'clients' | 'produits' | 'commandes'>('commandes');

  // Scripted conversation as specified in prompt
  const initialMessages: MessageItem[] = [
    {
      id: 'm1',
      sender: 'customer',
      text: 'Bonjour, je voudrais commander ce produit.',
      time: '14:20',
    },
    {
      id: 'm2',
      sender: 'ai',
      text: 'Bonjour ! Bien sûr. Quel produit souhaitez-vous commander ?',
      time: '14:20',
    },
    {
      id: 'm3',
      sender: 'customer',
      text: 'Le produit Premium.',
      time: '14:21',
    },
    {
      id: 'm4',
      sender: 'ai',
      text: 'Parfait. Je peux préparer votre commande.',
      time: '14:21',
    },
  ];

  const [messages, setMessages] = useState<MessageItem[]>(initialMessages.slice(0, 2));

  // Sequence controller
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer1 = setTimeout(() => {
      setMessages(initialMessages.slice(0, 3));
      setStep(1);
    }, 2400);

    const timer2 = setTimeout(() => {
      setMessages(initialMessages);
      setStep(2);
    }, 4200);

    const timer3 = setTimeout(() => {
      setStep(3); // Data flow triggered
    }, 5500);

    const timer4 = setTimeout(() => {
      setStep(4); // Order registered on dashboard
      setOrderCount(1);
    }, 6800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [isAutoPlaying]);

  const handleReset = () => {
    setMessages(initialMessages.slice(0, 2));
    setStep(0);
    setOrderCount(0);
    setIsAutoPlaying(true);
  };

  const handleUserCustomSubmit = (customText: string) => {
    setIsAutoPlaying(false);
    const newMsg: MessageItem = {
      id: `usr_${Date.now()}`,
      sender: 'customer',
      text: customText,
      time: 'À l\'instant',
    };
    setMessages((prev) => [...prev, newMsg]);
    setStep(2);

    setTimeout(() => {
      const replyMsg: MessageItem = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        text: `Entendu ! Votre demande "${customText}" a été analysée et synchronisée avec le dashboard.`,
        time: 'À l\'instant',
      };
      setMessages((prev) => [...prev, replyMsg]);
      setStep(3);

      setTimeout(() => {
        setStep(4);
        setOrderCount((prev) => prev + 1);
      }, 1000);
    }, 1200);
  };

  return (
    <section id="demo" className="relative py-20 lg:py-28 bg-[#090a0f] text-neutral-100 border-b border-neutral-900/80 overflow-hidden">
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-[radial-gradient(ellipse_at_center,oklch(78.9%_0.154_211.53/0.05),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.01)_0%,transparent_100%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3.5 px-3 py-1 rounded-sm cyber-glass border border-white/10 text-[10px] font-mono tracking-[0.25em] text-neutral-400 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-semibold text-neutral-300">DÉMONSTRATION EN ACTION</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase leading-tight mb-3">
              D'un message à une action commerciale.
            </h2>

            <p className="text-neutral-400 text-sm sm:text-base font-body leading-relaxed">
              Découvrez comment Automation Hub transforme chaque échange client en action intelligente et automatisée.
            </p>
          </div>

          {/* Interactive Replay button */}
          <button
            onClick={handleReset}
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-semibold tracking-wider text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all cursor-pointer active:scale-95"
          >
            <RotateCcw className="h-3.5 w-3.5 text-primary" />
            <span>REJOUER LA DÉMO</span>
          </button>
        </div>

        {/* Main Demonstration Stage: Messenger → AI Processing → Automation Hub Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* ============================================================ */}
          {/* LEFT: Realistic Messenger Conversation Panel (5 cols)         */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 flex flex-col rounded-2xl cyber-glass border border-white/10 overflow-hidden shadow-2xl bg-neutral-950/70">
            {/* Messenger Header */}
            <div className="px-5 py-4 border-b border-white/[0.08] bg-[#0084FF]/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-9 w-9 rounded-full bg-[#0084FF] flex items-center justify-center text-white shadow-md shadow-[#0084FF]/30">
                    <MessageSquare className="h-5 w-5 fill-white text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-neutral-900" />
                </div>
                <div>
                  <div className="font-bold text-sm text-white flex items-center gap-2">
                    <span>Automation Hub Boutique</span>
                    <span className="text-[10px] font-mono text-primary font-normal px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20">
                      MESSENGER
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-400 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>En ligne · Réponse sous 12ms</span>
                  </div>
                </div>
              </div>

              <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest hidden sm:block">
                LIVE DEMO
              </div>
            </div>

            {/* Conversation Feed */}
            <div className="p-5 flex-1 space-y-3.5 min-h-[300px] max-h-[340px] overflow-y-auto font-body">
              <AnimatePresence>
                {messages.map((msg) => {
                  const isCustomer = msg.sender === 'customer';
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`flex flex-col ${isCustomer ? 'items-end' : 'items-start'}`}
                    >
                      <div className="text-[10px] font-mono text-neutral-500 mb-1 px-1">
                        {isCustomer ? 'Client' : 'Assistant IA'} · {msg.time}
                      </div>

                      <div
                        className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed transition-all ${
                          isCustomer
                            ? 'bg-[#0084FF] text-white rounded-tr-none shadow-md shadow-[#0084FF]/20 font-medium'
                            : 'bg-neutral-800/90 text-neutral-100 rounded-tl-none border border-white/10'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Typing indicator when processing */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-neutral-800/60 w-fit text-neutral-400 text-xs"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.4s]" />
                </motion.div>
              )}
            </div>

            {/* AIInput Component (Integrated as requested) */}
            <div className="p-3 border-t border-white/[0.08] bg-black/40">
              <AIInput
                placeholder="Tapez un message pour tester l'IA..."
                minHeight={44}
                maxHeight={90}
                onSubmit={handleUserCustomSubmit}
              />
              <div className="text-[10px] text-neutral-500 font-mono text-center pt-1">
                Appuyez sur Entrée ou cliquez pour envoyer en direct
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* CENTER: AI Processing & Data Flow Bridge (2 cols)             */}
          {/* ============================================================ */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center py-4 lg:py-0">
            <div className="flex flex-row lg:flex-col items-center justify-center gap-2 sm:gap-4 text-center w-full">
              
              {/* Step 1 indicator: Message Received */}
              <div className={`flex flex-col items-center transition-all duration-300 ${step >= 0 ? 'opacity-100' : 'opacity-30'}`}>
                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full cyber-glass border border-white/10 flex items-center justify-center text-primary text-[11px] sm:text-xs font-mono font-bold mb-1 shadow-sm">
                  1
                </div>
                <span className="text-[9px] sm:text-[10px] font-mono text-neutral-300 uppercase tracking-wider whitespace-nowrap">
                  Message reçu
                </span>
              </div>

              {/* Data Flow Line 1 (Vertical on Desktop, Horizontal on Mobile) */}
              <div className="hidden lg:block h-8 w-[2px] bg-gradient-to-b from-white/20 via-primary to-white/20 relative overflow-hidden">
                <motion.div
                  animate={{ y: ['-100%', '200%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  className="w-full h-4 bg-primary shadow-[0_0_8px_oklch(78.9%_0.154_211.53)]"
                />
              </div>
              <div className="lg:hidden w-5 sm:w-10 h-[2px] bg-gradient-to-r from-white/20 via-primary to-white/20 relative overflow-hidden shrink-0">
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  className="h-full w-3 bg-primary shadow-[0_0_8px_oklch(78.9%_0.154_211.53)]"
                />
              </div>

              {/* Step 2 indicator: AI Understands */}
              <div className={`flex flex-col items-center transition-all duration-300 ${step >= 2 ? 'opacity-100 scale-105' : 'opacity-40'}`}>
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary mb-1 shadow-[0_0_15px_oklch(78.9%_0.154_211.53/0.3)]">
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
                </div>
                <span className="text-[9px] sm:text-[10px] font-mono text-primary font-bold uppercase tracking-wider whitespace-nowrap">
                  L'IA comprend
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono text-neutral-500 hidden sm:inline-block">
                  Intention
                </span>
              </div>

              {/* Data Flow Line 2 (Vertical on Desktop, Horizontal on Mobile) */}
              <div className="hidden lg:block h-8 w-[2px] bg-gradient-to-b from-white/20 via-primary to-white/20 relative overflow-hidden">
                <motion.div
                  animate={{ y: ['-100%', '200%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 0.7 }}
                  className="w-full h-4 bg-primary shadow-[0_0_8px_oklch(78.9%_0.154_211.53)]"
                />
              </div>
              <div className="lg:hidden w-5 sm:w-10 h-[2px] bg-gradient-to-r from-white/20 via-primary to-white/20 relative overflow-hidden shrink-0">
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 0.7 }}
                  className="h-full w-3 bg-primary shadow-[0_0_8px_oklch(78.9%_0.154_211.53)]"
                />
              </div>

              {/* Step 3 indicator: Action Triggered */}
              <div className={`flex flex-col items-center transition-all duration-300 ${step >= 4 ? 'opacity-100 scale-105' : 'opacity-40'}`}>
                <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-xs font-mono font-bold mb-1 shadow-sm">
                  <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
                <span className="text-[9px] sm:text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider whitespace-nowrap">
                  Action faite
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono text-neutral-500 hidden sm:inline-block">
                  Commande
                </span>
              </div>

            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT: Realistic Automation Hub Dashboard Panel (5 cols)     */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 flex flex-col rounded-2xl cyber-glass border border-white/10 overflow-hidden shadow-2xl bg-[#0d0f17]">
            {/* Dashboard Topbar */}
            <div className="px-5 py-3.5 border-b border-white/[0.08] bg-neutral-900/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
                  <Layers className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white tracking-wide uppercase font-heading">
                    AUTOMATION HUB
                  </div>
                  <div className="text-[10px] font-mono text-neutral-400">
                    Dashboard d'administration
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>SYNCHRONISÉ</span>
              </div>
            </div>

            {/* Dashboard Navigation Tabs */}
            <div className="flex border-b border-white/[0.06] bg-black/20 px-3 overflow-x-auto scrollbar-none">
              {[
                { id: 'commandes', label: 'Commandes', icon: Package },
                { id: 'conversations', label: 'Conversations', icon: MessageSquare },
                { id: 'clients', label: 'Clients', icon: Users },
                { id: 'produits', label: 'Produits', icon: ShoppingBag },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-2 text-[11px] font-mono transition-colors border-b-2 cursor-pointer ${
                      isActive
                        ? 'border-primary text-white font-bold'
                        : 'border-transparent text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <Icon className="h-3 w-3" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Dashboard Main Content */}
            <div className="p-5 space-y-4 flex-1">
              
              {/* The 4 KPI Cards (As Specified in Prompt) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {/* 1. CONVERSATIONS */}
                <div className="p-3 rounded-xl bg-neutral-900/60 border border-white/10 flex flex-col justify-between">
                  <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider flex items-center justify-between">
                    <span>CONVERSATIONS</span>
                    <MessageSquare className="h-3 w-3 text-neutral-500" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
                    1
                  </div>
                </div>

                {/* 2. CLIENTS */}
                <div className="p-3 rounded-xl bg-neutral-900/60 border border-white/10 flex flex-col justify-between">
                  <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider flex items-center justify-between">
                    <span>CLIENTS</span>
                    <Users className="h-3 w-3 text-neutral-500" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
                    1
                  </div>
                </div>

                {/* 3. PRODUITS */}
                <div className="p-3 rounded-xl bg-neutral-900/60 border border-white/10 flex flex-col justify-between">
                  <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider flex items-center justify-between">
                    <span>PRODUITS</span>
                    <ShoppingBag className="h-3 w-3 text-neutral-500" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
                    1
                  </div>
                </div>

                {/* 4. COMMANDES (Animates from 0 to 1 when conversation triggers order) */}
                <motion.div
                  animate={{
                    borderColor: orderCount > 0 ? 'oklch(78.9% 0.154 211.53)' : 'rgba(255,255,255,0.1)',
                    backgroundColor: orderCount > 0 ? 'rgba(24,119,242,0.15)' : 'rgba(23,23,23,0.6)',
                  }}
                  transition={{ duration: 0.5 }}
                  className="p-3 rounded-xl border flex flex-col justify-between"
                >
                  <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider flex items-center justify-between">
                    <span className={orderCount > 0 ? 'text-primary font-bold' : ''}>COMMANDES</span>
                    <Package className={`h-3 w-3 ${orderCount > 0 ? 'text-primary' : 'text-neutral-500'}`} />
                  </div>
                  <motion.div
                    key={orderCount}
                    initial={{ scale: 1.3 }}
                    animate={{ scale: 1 }}
                    className={`text-xl sm:text-2xl font-bold font-mono mt-1 ${
                      orderCount > 0 ? 'text-primary' : 'text-neutral-400'
                    }`}
                  >
                    {orderCount}
                  </motion.div>
                </motion.div>
              </div>

              {/* ASSISTANT IA Card (Active Status) */}
              <div className="p-3.5 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span>ASSISTANT IA</span>
                      <span className="flex items-center gap-1 text-[9px] font-mono text-emerald-400 font-semibold px-1.5 py-0.2 rounded bg-emerald-500/10">
                        <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
                        Active
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      “Génération automatique des réponses”
                    </div>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-primary font-semibold">
                  Mode Autonome
                </div>
              </div>

              {/* DERNIÈRES CONVERSATIONS (As Specified in Prompt) */}
              <div className="rounded-xl bg-neutral-900/60 border border-white/10 p-3.5">
                <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                  <span>DERNIÈRES CONVERSATIONS</span>
                  <span className="text-[9px] text-neutral-500">Mise à jour temps réel</span>
                </div>

                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="h-7 w-7 rounded-full bg-neutral-800 text-neutral-300 flex items-center justify-center font-bold text-[10px]">
                        26
                      </div>
                      <div>
                        <div className="font-semibold text-white">Client 265837236...</div>
                        <div className="text-[10px] text-neutral-400">
                          {orderCount > 0 ? 'Produit: "Le produit Premium" (189 €)' : 'Conversation active...'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Status: Open
                      </span>
                      {orderCount > 0 && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-primary/20 text-primary border border-primary/30 hidden sm:inline-block">
                          Commande #8921 Créée
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Dashboard Footer Meta */}
            <div className="px-5 py-2.5 border-t border-white/[0.06] bg-black/40 flex items-center justify-between text-[10px] font-mono text-neutral-500">
              <span>RÉSEAU: Meta Graph API Webhook</span>
              <span className="text-primary font-semibold">14ms de traitement</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
