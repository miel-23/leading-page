import React from 'react';
import { NavigationSection } from '../types';

interface FooterProps {
  onNavigate: (section: NavigationSection) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-neutral-950 border-t border-neutral-900 py-12 text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-neutral-900">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_oklch(78.9%_0.154_211.53)]" />
              <span className="font-heading text-sm sm:text-base font-bold tracking-widest text-white">
                AUTOMATION HUB
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-body max-w-md leading-relaxed">
              Opérations omnicanales automatisées et commerce conversationnel intelligent.
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs font-mono-code">
            <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer py-1">
              ACCUEIL
            </button>
            <button onClick={() => onNavigate('how-it-works')} className="hover:text-white transition-colors cursor-pointer py-1">
              FONCTIONNEMENT
            </button>
            <button onClick={() => onNavigate('automate')} className="hover:text-white transition-colors cursor-pointer py-1">
              AUTOMATISATION
            </button>
            <button onClick={() => onNavigate('demo')} className="hover:text-white transition-colors cursor-pointer py-1">
              DÉMO EN DIRECT
            </button>
            <button onClick={() => onNavigate('cta')} className="hover:text-white transition-colors cursor-pointer py-1 text-primary font-semibold">
              COMMENCER
            </button>
          </nav>
        </div>

        {/* Quiet Copyright & Meta */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-neutral-500 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Automation Hub Systems Inc. Tous droits réservés.
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-1.5 text-[11px] sm:text-xs">
            <span className="hover:text-neutral-400 cursor-pointer transition-colors">Politique de confidentialité</span>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span className="hover:text-neutral-400 cursor-pointer transition-colors">Conditions d'utilisation</span>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <span className="hover:text-neutral-400 cursor-pointer transition-colors">Sécurité & Conformité</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
