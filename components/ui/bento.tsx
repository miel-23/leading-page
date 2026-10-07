"use client";

import React from "react";
import { clsx } from "clsx";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Sparkles,
  UserCheck,
  ShoppingBag,
  PackageCheck,
  BarChart3,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export function BentoCard({
  dark = true,
  className = "",
  eyebrow,
  title,
  description,
  graphic,
  fade = ["bottom"],
  icon,
}: {
  dark?: boolean;
  className?: string;
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  graphic?: React.ReactNode;
  fade?: ("top" | "bottom")[];
  icon?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      data-dark={dark ? "true" : undefined}
      className={clsx(
        className,
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-neutral-900/40 backdrop-blur-md shadow-lg transition-all duration-300 hover:border-primary/40 hover:shadow-primary/5"
      )}
    >
      {/* Visual Graphic Canvas Area */}
      <div className="relative h-56 sm:h-64 w-full shrink-0 overflow-hidden bg-neutral-950/60 flex items-center justify-center p-4">
        {graphic}
        {fade.includes("top") && (
          <div className="absolute inset-0 bg-gradient-to-b from-[#090a0f] via-transparent to-transparent opacity-80 pointer-events-none" />
        )}
        {fade.includes("bottom") && (
          <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-[#090a0f]/80 to-transparent pointer-events-none" />
        )}
      </div>

      {/* Text Info Container */}
      <div className="relative p-6 sm:p-7 z-20 isolate mt-[-40px] backdrop-blur-xl bg-neutral-950/80 border-t border-white/[0.06] text-white flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-primary uppercase">
              {icon}
              <span>{eyebrow}</span>
            </div>
            <ArrowRight className="h-3.5 w-3.5 text-neutral-500 group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>

          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white font-heading">
            {title}
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-body leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function FUIBentoGridDark() {
  return (
    <section id="automate" className="relative py-20 lg:py-28 bg-[#090a0f] text-neutral-100 border-b border-neutral-900/80 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,oklch(78.9%_0.154_211.53/0.05),transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3.5 px-3 py-1 rounded-sm cyber-glass border border-white/10 text-[10px] font-mono tracking-[0.25em] text-neutral-400 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-semibold text-neutral-300">CE QUE VOUS POUVEZ AUTOMATISER</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase leading-tight mb-3">
            Automatisez plus. Travaillez mieux.
          </h2>

          <p className="text-neutral-400 text-base sm:text-lg font-body leading-relaxed">
            Transformez chaque conversation en actions commerciales rentables.
          </p>
        </div>

        {/* Asymmetric Alternating Bento Grid matching the layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          
          {/* 1. MESSAGES (Wide: 7 cols) */}
          <BentoCard
            eyebrow="Messages"
            icon={<MessageSquare className="h-3.5 w-3.5 text-primary" />}
            title="Conversations clients gérées automatiquement"
            description="Les messages entrants depuis Facebook Messenger, WhatsApp et les widgets Web sont traités instantanément sans latence humaine."
            className="lg:col-span-7"
            graphic={
              <div className="w-full max-w-md space-y-2.5 p-2 font-mono text-[11px]">
                <div className="flex items-center gap-2 text-[10px] text-neutral-500 mb-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>BOÎTE OMNICANALE · EN DIRECT</span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-900/90 border border-white/10 flex items-start gap-3">
                  <div className="h-7 w-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">
                    M
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-neutral-400 text-[10px]">
                      <span>Client Messenger #8291</span>
                      <span>À l'instant</span>
                    </div>
                    <div className="text-white text-xs mt-0.5 font-sans">
                      "Bonjour, avez-vous le Trench Coat Noir en taille M ?"
                    </div>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 flex items-start gap-3 ml-4">
                  <div className="h-7 w-7 rounded-full bg-primary text-neutral-950 flex items-center justify-center font-bold text-xs shrink-0">
                    IA
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-primary text-[10px]">
                      <span>Agent Automation Hub</span>
                      <span>12ms</span>
                    </div>
                    <div className="text-white text-xs mt-0.5 font-sans">
                      "Oui parfaitement ! Il reste 14 pièces en stock. Souhaitez-vous le commander maintenant ?"
                    </div>
                  </div>
                </div>
              </div>
            }
          />

          {/* 2. AI RESPONSES (Narrow: 5 cols) */}
          <BentoCard
            eyebrow="Réponses IA"
            icon={<Sparkles className="h-3.5 w-3.5 text-primary" />}
            title="Réponses intelligentes et contextuelles"
            description="La compréhension sémantique détecte les commandes, réservations, questions fréquentes et statuts VIP sans rigidité."
            className="lg:col-span-5"
            graphic={
              <div className="w-full max-w-xs space-y-2 p-3 font-mono text-[11px] rounded-xl bg-neutral-900/80 border border-white/10">
                <div className="flex items-center justify-between text-[10px] text-neutral-400 pb-1 border-b border-white/5">
                  <span>INTENTION SÉMANTIQUE</span>
                  <span className="text-primary font-bold">99.4% Précision</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-neutral-400">Intention</span>
                  <span className="text-emerald-400 font-semibold">ACHAT_COMMANDE</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-neutral-400">Entité Produit</span>
                  <span className="text-white">SKU-9214 (Taille M)</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-neutral-400">Confiance</span>
                  <span className="text-primary">0.982 cosine</span>
                </div>
              </div>
            }
          />

          {/* 3. LEADS (Narrow: 5 cols) */}
          <BentoCard
            eyebrow="Prospects & CRM"
            icon={<UserCheck className="h-3.5 w-3.5 text-primary" />}
            title="Capturez et qualifiez vos contacts"
            description="Chaque profil utilisateur, historique d'achat, adresse et segment VIP est automatiquement classifié dans le CRM unifié."
            className="lg:col-span-5"
            graphic={
              <div className="w-full max-w-xs p-4 rounded-xl bg-neutral-900/90 border border-white/10 font-mono text-[11px] space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                    AR
                  </div>
                  <div>
                    <div className="text-white font-bold font-sans text-xs">Alex Rivera</div>
                    <div className="text-[10px] text-neutral-400">alex.rivera@meta.user</div>
                  </div>
                </div>
                <div className="pt-2 border-t border-white/5 grid grid-cols-2 gap-2 text-[10px]">
                  <div>
                    <div className="text-neutral-500">SEGMENT</div>
                    <div className="text-primary font-semibold">VIP Haute Intention</div>
                  </div>
                  <div>
                    <div className="text-neutral-500">VALEUR À VIE</div>
                    <div className="text-white font-semibold">1 420,00 €</div>
                  </div>
                </div>
              </div>
            }
          />

          {/* 4. PRODUCTS (Wide: 7 cols) */}
          <BentoCard
            eyebrow="Produits & Catalogue"
            icon={<ShoppingBag className="h-3.5 w-3.5 text-primary" />}
            title="Présentez vos produits automatiquement"
            description="Affichez des fiches produits interactives avec suivi des stocks en direct, choix des tailles et prévisualisations immédiates."
            className="lg:col-span-7"
            graphic={
              <div className="w-full max-w-md flex items-center gap-3 overflow-hidden p-2">
                <div className="w-48 shrink-0 p-3 rounded-xl bg-neutral-900/90 border border-white/10 font-mono text-[11px]">
                  <div className="aspect-video w-full rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-400 text-xs font-sans mb-2">
                    🛍 Trench Coat Noir
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold text-white">
                    <span>189,00 €</span>
                    <span className="text-[10px] text-emerald-400">14 en stock</span>
                  </div>
                </div>
                <div className="w-48 shrink-0 p-3 rounded-xl bg-neutral-900/90 border border-primary/30 font-mono text-[11px]">
                  <div className="aspect-video w-full rounded-lg bg-primary/20 flex items-center justify-center text-primary text-xs font-sans mb-2">
                    ⚡ Commande Immédiate
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold text-white">
                    <span>Payer en 1 clic</span>
                    <span className="text-[10px] text-primary">Stripe Prêt</span>
                  </div>
                </div>
              </div>
            }
          />

          {/* 5. ORDERS (Wide: 7 cols) */}
          <BentoCard
            eyebrow="Commandes"
            icon={<PackageCheck className="h-3.5 w-3.5 text-primary" />}
            title="Convertissez les conversations en commandes"
            description="Générez des liens de paiement sécurisés, éliminez l'abandon de panier et encaissez vos ventes directement dans la messagerie."
            className="lg:col-span-7"
            graphic={
              <div className="w-full max-w-md p-3.5 rounded-xl bg-neutral-900/90 border border-white/10 font-mono text-[11px] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>COMMANDE #ORD-9842 CONFIRMÉE</span>
                  </span>
                  <span className="text-emerald-400 font-semibold">189,00 € Réglé</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-[10px] pt-1 text-neutral-400">
                  <div>
                    <div>PAIEMENT</div>
                    <div className="text-white font-sans font-medium">Apple Pay</div>
                  </div>
                  <div>
                    <div>EXPÉDITION</div>
                    <div className="text-primary font-sans font-medium">Auto-Préparée</div>
                  </div>
                  <div>
                    <div>REÇU</div>
                    <div className="text-white font-sans font-medium">Envoyé au chat</div>
                  </div>
                </div>
              </div>
            }
          />

          {/* 6. DATA (Narrow: 5 cols) */}
          <BentoCard
            eyebrow="Données & Analytique"
            icon={<BarChart3 className="h-3.5 w-3.5 text-primary" />}
            title="Centralisez vos données commerciales"
            description="Tableau de bord synchronisé en temps réel combinant conversations, conversion des commandes et métriques de revenu."
            className="lg:col-span-5"
            graphic={
              <div className="w-full max-w-xs p-4 rounded-xl bg-neutral-900/90 border border-white/10 font-mono text-[11px] space-y-2.5">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400">TAUX DE CONVERSION</span>
                  <span className="text-emerald-400 font-bold">+28.4%</span>
                </div>
                <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full w-[78%]" />
                </div>
                <div className="flex justify-between text-[10px] text-neutral-400 pt-1">
                  <span>2.4M Échanges / Mois</span>
                  <span className="text-white font-semibold">100% En Ligne</span>
                </div>
              </div>
            }
          />

        </div>
      </div>
    </section>
  );
}
