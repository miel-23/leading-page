'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavigationSection, ThemeMode } from '../types';
import { ArrowRight, Search, Menu, X, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  currentSection: NavigationSection;
  onNavigate: (section: NavigationSection) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onGetStarted: () => void;
  onOpenCommandPalette?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSection,
  onNavigate,
  theme,
  onToggleTheme,
  onGetStarted,
  onOpenCommandPalette,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: { id: NavigationSection; label: string; number: string }[] = [
    { id: 'home', label: 'ACCUEIL', number: '01' },
    { id: 'how-it-works', label: 'FONCTIONNEMENT', number: '02' },
    { id: 'automate', label: 'AUTOMATISATION', number: '03' },
    { id: 'demo', label: 'DÉMO EN DIRECT', number: '04' },
  ];

  // Track scroll position to subtly frost the navbar on phone and desktop
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleMobileNavClick = (id: NavigationSection) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-[#090a0f]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-lg shadow-black/40'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="w-full px-4 sm:px-8 lg:px-14 xl:px-16 flex h-16 sm:h-20 items-center justify-between">
        
        {/* Left: Brand Wordmark */}
        <button
          onClick={() => {
            setIsMobileMenuOpen(false);
            onNavigate('home');
          }}
          className="flex items-center gap-1.5 text-left focus:outline-none cursor-pointer group shrink-0"
        >
          <span className="font-heading text-sm sm:text-base font-bold tracking-[0.22em] sm:tracking-[0.26em] text-white group-hover:text-neutral-200 transition-colors uppercase whitespace-nowrap">
            AUTOMATION<span className="text-primary font-black">.</span>HUB
          </span>
        </button>

        {/* Center: Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
          {navItems.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-[11px] font-mono-code tracking-[0.24em] uppercase transition-all duration-200 whitespace-nowrap cursor-pointer py-1 relative ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-3 bg-primary rounded-full shadow-[0_0_8px_oklch(78.9%_0.154_211.53)]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Side: Desktop Controls & Mobile Actions */}
        <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
          
          {/* Quick Command Palette Button (Desktop & Tablet) */}
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              className="hidden md:inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-white/10 hover:border-primary/40 bg-white/[0.03] hover:bg-white/[0.06] text-neutral-400 hover:text-white text-[11px] font-mono transition-all duration-200 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
              title="Ouvrir la palette de commandes (⌘K)"
            >
              <Search className="w-3 h-3 text-primary" />
              <span className="text-[10px] tracking-wider text-neutral-400 font-mono-code">Rechercher</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] text-neutral-300 font-mono font-bold">
                ⌘K
              </kbd>
            </button>
          )}

          {/* Mobile Search Icon Button */}
          {onOpenCommandPalette && (
            <button
              onClick={onOpenCommandPalette}
              className="md:hidden p-2 rounded-lg border border-white/10 bg-white/[0.03] text-neutral-300 hover:text-white cursor-pointer active:scale-95"
              aria-label="Recherche rapide"
            >
              <Search className="w-4 h-4 text-primary" />
            </button>
          )}

          {/* Theme Switcher Toggle */}
          <button
            onClick={onToggleTheme}
            className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1.5 rounded-full border border-white/10 hover:border-white/20 text-[10px] font-mono-code tracking-[0.16em] sm:tracking-[0.18em] text-neutral-300 hover:text-white transition-all duration-200 cursor-pointer bg-transparent hover:-translate-y-0.5 active:translate-y-0"
            title={`Passer en mode ${theme === 'dark' ? 'clair' : 'sombre'}`}
            aria-label="Changer le thème"
          >
            {theme === 'dark' ? (
              <Moon className="w-3.5 h-3.5 text-primary" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            )}
            <span className="uppercase font-semibold hidden sm:inline-block">
              {theme === 'dark' ? 'SOMBRE' : 'CLAIR'}
            </span>
          </button>

          {/* Desktop Login Button */}
          <button
            onClick={onGetStarted}
            className="hidden sm:inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 text-[9px] sm:text-[10px] font-mono-code font-black tracking-[0.18em] sm:tracking-[0.2em] uppercase text-neutral-950 bg-primary hover:bg-primary-hover rounded-md transition-all duration-200 cursor-pointer whitespace-nowrap active:scale-95 shadow-sm shadow-primary/20 hover:shadow-[0_0_16px_oklch(78.9%_0.154_211.53/0.4)] hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>CONNEXION</span>
            <ArrowRight className="h-3 w-3" />
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-lg border border-white/10 bg-white/[0.04] text-neutral-200 hover:text-white transition-colors cursor-pointer active:scale-95"
            aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>

        </div>

      </div>

      {/* Modern Fullscreen Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100vh - 64px)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden w-full bg-[#090a0f]/98 backdrop-blur-2xl border-b border-white/10 overflow-y-auto flex flex-col justify-between p-6"
          >
            {/* Nav Items List */}
            <div className="space-y-2 pt-2">
              <div className="text-[10px] font-mono-code tracking-[0.25em] text-neutral-500 uppercase px-3 pb-2">
                NAVIGATION DU SYSTÈME
              </div>
              {navItems.map((item, index) => {
                const isActive = currentSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + 0.08, duration: 0.25 }}
                    onClick={() => handleMobileNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-left font-mono-code text-sm tracking-wider uppercase transition-all cursor-pointer ${
                      isActive
                        ? 'bg-primary/10 text-white border border-primary/30 font-bold'
                        : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-mono text-primary font-bold">
                        {item.number}
                      </span>
                      <span>{item.label}</span>
                    </div>
                    {isActive && (
                      <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_oklch(78.9%_0.154_211.53)]" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile Drawer Bottom Actions */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.3 }}
              className="pt-6 border-t border-white/[0.08] space-y-3"
            >
              {/* Quick Search Shortcut */}
              {onOpenCommandPalette && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenCommandPalette();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-neutral-300 text-xs font-mono-code cursor-pointer active:scale-98"
                >
                  <Search className="w-3.5 h-3.5 text-primary" />
                  <span>Recherche & Raccourcis (⌘K)</span>
                </button>
              )}

              {/* Login CTA Button */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onGetStarted();
                }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-neutral-950 font-bold text-xs font-mono-code tracking-[0.2em] uppercase shadow-lg shadow-primary/25 cursor-pointer active:scale-98"
              >
                <span>ACCÉDER À L'ESPACE SÉCURISÉ</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="text-center pt-2 text-[10px] font-mono-code text-neutral-500">
                AUTOMATION HUB · V2.4 HIGH-TECH ARCHITECTURE
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
