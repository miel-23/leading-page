import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HowItWorks } from './components/HowItWorks';
import FUIBentoGridDark from './components/ui/bento';
import { SeeAutomationInAction } from './components/SeeAutomationInAction';
import { Cta69 } from './components/ui/cta69';
import { ScrollProgress } from './components/ui/scroll-progress';
import { Footer } from './components/Footer';
import { SectionReveal } from './components/ui/section-reveal';
import { LoadingScreen } from './components/ui/loading-screen';
import { CommandPalette } from './components/ui/command-palette';
import { NavigationSection, ThemeMode } from './types';
import { useLenis } from './hooks/useLenis';
import { CheckCheck, X } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ah_theme') as ThemeMode;
      return saved || 'dark';
    }
    return 'dark';
  });

  const [currentSection, setCurrentSection] = useState<NavigationSection>('home');
  const [notificationToast, setNotificationToast] = useState<string | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initial smooth loading transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 750);
    return () => clearTimeout(timer);
  }, []);

  // Global ⌘K / Ctrl+K shortcut listener
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Initialize Lenis smooth scroller for elegant scrolling feel
  const { scrollTo } = useLenis();

  // Apply theme class to <html>
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('ah_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleNavigate = (section: NavigationSection) => {
    setCurrentSection(section);

    if (section === 'home') {
      scrollTo(0);
      return;
    }

    const sectionEl = document.getElementById(section);
    if (sectionEl) {
      scrollTo(sectionEl);
    }
  };

  const handleGetStarted = () => {
    setNotificationToast('Redirection vers votre espace sécurisé...');
    setTimeout(() => setNotificationToast(null), 3500);
  };

  const handleExploreModule = (module: string) => {
    setCurrentSection(module as NavigationSection);
    const el = document.getElementById(module) || document.getElementById('demo') || document.getElementById('automate');
    if (el) {
      scrollTo(el);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-[#090a0f] text-neutral-100' : 'bg-neutral-50 text-neutral-900'}`}>
      
      {/* 1. Premium Loading Screen with Technical Typing Effect */}
      <LoadingScreen isLoading={isLoading} />

      {/* 2. Global Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={handleNavigate}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* 3. Scroll Progress Bar & Floating Back-To-Top Arrow Button */}
      <ScrollProgress onScrollToTop={() => scrollTo(0)} />

      {/* 4. Top Bar (Wordmark - Clean Nav Links - Theme Switcher & LOGIN) */}
      <Navbar
        currentSection={currentSection}
        onNavigate={handleNavigate}
        theme={theme}
        onToggleTheme={toggleTheme}
        onGetStarted={handleGetStarted}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* 5. Modern Floating Notification Toast with Smooth Physics */}
      <AnimatePresence>
        {notificationToast && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl cyber-glass border border-primary/30 text-xs font-mono-code text-white shadow-2xl flex items-center gap-3 bg-[#0d1017]/95 backdrop-blur-xl"
          >
            <div className="p-1 rounded-md bg-primary/20 text-primary">
              <CheckCheck className="h-4 w-4 shrink-0" />
            </div>
            <span className="font-body text-neutral-200">{notificationToast}</span>
            <button
              onClick={() => setNotificationToast(null)}
              className="ml-2 text-neutral-400 hover:text-white transition-colors cursor-pointer p-0.5 rounded hover:bg-white/5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area — Modern, Focused Landing Page Flow */}
      <main className="w-full">
        {/* 1. Hero Section (Visual Typography on Left + 3D Visual on Right) */}
        <HeroSection
          theme={theme}
          onGetStarted={handleGetStarted}
          onExploreModule={handleExploreModule}
        />

        {/* 2. How Automation Hub Works (3-Step Pipeline: Messenger → AI → Automation) */}
        <HowItWorks onExploreModule={handleExploreModule} />

        {/* 3. What You Can Automate Bento Grid */}
        <SectionReveal>
          <FUIBentoGridDark />
        </SectionReveal>

        {/* 4. See Automation in Action (Interactive Messenger to Dashboard Conversion) */}
        <SectionReveal>
          <SeeAutomationInAction />
        </SectionReveal>

        {/* 5. Final Call to Action (Cta69 from 21st.dev) */}
        <SectionReveal>
          <Cta69
            badge={{ label: "PRÊT À AUTOMATISER ?" }}
            heading="Automatisez vos conversations. Développez votre entreprise."
            button={{
              label: "Commencer l'automatisation →",
              href: "#demo",
            }}
            labels={{
              marqueePhrase: "AUTOMATION HUB",
              note: "Transformez chaque message client en action commerciale concrète grâce à l'IA.",
              footnote: "Aucune complexité. Juste de l'automatisation.",
            }}
            onAction={handleGetStarted}
          />
        </SectionReveal>
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}
