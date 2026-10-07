'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Home,
  Workflow,
  Sparkles,
  Play,
  ArrowRight,
  Sun,
  Moon,
  CornerDownLeft,
} from 'lucide-react';
import { NavigationSection, ThemeMode } from '../../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: NavigationSection) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  shortcut?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  theme,
  onToggleTheme,
}) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: CommandItem[] = [
    {
      id: 'home',
      title: 'Accueil — Héro & Présentation',
      category: 'Navigation',
      icon: Home,
      action: () => {
        onNavigate('home');
        onClose();
      },
      shortcut: 'H',
    },
    {
      id: 'how-it-works',
      title: 'Comment ça marche — Pipeline 3 étapes',
      category: 'Navigation',
      icon: Workflow,
      action: () => {
        onNavigate('how-it-works');
        onClose();
      },
      shortcut: 'W',
    },
    {
      id: 'automate',
      title: 'Ce que vous pouvez automatiser — Modules Bento',
      category: 'Navigation',
      icon: Sparkles,
      action: () => {
        onNavigate('automate');
        onClose();
      },
      shortcut: 'B',
    },
    {
      id: 'demo',
      title: 'Démonstration en direct — Simulation interactive',
      category: 'Navigation',
      icon: Play,
      action: () => {
        onNavigate('demo');
        onClose();
      },
      shortcut: 'D',
    },
    {
      id: 'cta',
      title: 'Commencer — Déploiement & Authentification',
      category: 'Action',
      icon: ArrowRight,
      action: () => {
        onNavigate('cta');
        onClose();
      },
      shortcut: '↵',
    },
    {
      id: 'theme',
      title: theme === 'dark' ? 'Passer en Mode Clair' : 'Passer en Mode Sombre',
      category: 'Préférences',
      icon: theme === 'dark' ? Sun : Moon,
      action: () => {
        onToggleTheme();
        onClose();
      },
      shortcut: 'T',
    },
  ];

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [isOpen]);

  // Keyboard navigation inside palette
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9990] flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl rounded-2xl cyber-glass border border-white/10 bg-[#0d1017]/95 shadow-2xl overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-white/[0.08]">
              <Search className="w-4 h-4 text-primary shrink-0 mr-3" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Rechercher une section, commande ou action..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                className="w-full bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none font-body"
              />
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-neutral-400 bg-white/5 border border-white/10 rounded">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div className="p-2 max-h-[320px] overflow-y-auto space-y-1">
              {filteredItems.length === 0 ? (
                <div className="py-8 text-center text-xs font-mono text-neutral-500">
                  Aucun résultat trouvé pour « {search} »
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-primary/10 text-white border border-primary/30'
                          : 'text-neutral-300 hover:text-white border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-1.5 rounded-lg transition-colors ${
                            isSelected
                              ? 'bg-primary text-neutral-950'
                              : 'bg-white/5 text-neutral-400'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-medium text-white">{item.title}</div>
                          <div className="text-[10px] font-mono text-neutral-500">
                            {item.category}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {item.shortcut && (
                          <kbd className="px-1.5 py-0.5 text-[9px] font-mono text-neutral-400 bg-white/5 rounded border border-white/5">
                            {item.shortcut}
                          </kbd>
                        )}
                        {isSelected && (
                          <CornerDownLeft className="w-3 h-3 text-primary animate-pulse" />
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer helper */}
            <div className="px-4 py-2 border-t border-white/[0.06] bg-black/30 flex items-center justify-between text-[10px] font-mono text-neutral-500">
              <span className="flex items-center gap-2">
                <span>↑↓ Naviguer</span>
                <span>·</span>
                <span>↵ Valider</span>
              </span>
              <span>Automation Hub Quick Command</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
