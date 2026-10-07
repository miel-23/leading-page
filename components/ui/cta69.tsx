"use client";

import React from "react";
import { Badge7 } from "@/components/ui/cta69-utils/badge7";
import { Button12 } from "@/components/ui/cta69-utils/button12";
import { cn } from "@/lib/utils";

export interface Badge {
  label: string;
}

export interface ActionButton {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface Cta69Labels {
  /** Repeated phrase scrolling across the backdrop */
  marqueePhrase?: string;
  /** Short supporting line beneath the heading */
  note?: string;
  /** Fine print sitting under the button */
  footnote?: string;
}

export interface Cta69Props {
  badge?: Badge;
  heading?: string;
  button?: ActionButton;
  labels?: Cta69Labels;
  className?: string;
  onAction?: () => void;
}

export const cta69Demo: Cta69Props = {
  badge: { label: "PRÊT À AUTOMATISER ?" },
  heading: "Automatisez vos conversations. Développez votre entreprise.",
  button: {
    label: "Commencer l'automatisation →",
    href: "#demo",
  },
  labels: {
    marqueePhrase: "AUTOMATION HUB",
    note: "Transformez chaque message client en action commerciale concrète grâce à l'IA.",
    footnote: "Aucune complexité. Juste de l'automatisation.",
  },
};

const REPEATS = 8;

export function Cta69({
  badge = cta69Demo.badge,
  heading = cta69Demo.heading,
  button = cta69Demo.button,
  labels = cta69Demo.labels,
  className,
  onAction,
}: Cta69Props) {
  const marqueePhrase = labels?.marqueePhrase || "AUTOMATION HUB";
  const marqueeLine = marqueePhrase
    ? `${marqueePhrase} · `.repeat(REPEATS)
    : "";

  const handleButtonClick = () => {
    if (button?.onClick) {
      button.onClick();
    } else if (onAction) {
      onAction();
    } else if (button?.href) {
      const target = document.querySelector(button.href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="cta"
      className={cn(
        "relative overflow-hidden bg-[#090a0f] py-20 md:py-28 lg:py-32 w-full border-b border-neutral-900/80 transition-colors",
        className
      )}
    >
      <style>{`
        @keyframes cta69-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>

      {/* Giant scrolling backdrop */}
      {marqueePhrase && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center overflow-hidden select-none opacity-40 dark:opacity-30"
        >
          <div className="flex w-max shrink-0 animate-[cta69-marquee_40s_linear_infinite] whitespace-nowrap text-white/[0.04]">
            {[0, 1].map((copy) => (
              <span
                key={copy}
                className="text-[20vw] font-black leading-none tracking-tighter md:text-[15vw] font-heading uppercase"
              >
                {marqueeLine}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Centered statement */}
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 text-center md:px-6 z-10">
        {badge && <Badge7 label={badge.label} />}

        {heading && (
          <h2 className="mt-8 text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight text-white font-heading uppercase">
            {heading}
          </h2>
        )}

        {labels?.note && (
          <p className="mt-6 max-w-xl text-balance text-base sm:text-lg md:text-xl text-neutral-400 font-body leading-relaxed">
            {labels.note}
          </p>
        )}

        {button && (
          <div className="mt-10 sm:mt-12">
            <Button12
              label={button.label}
              onClick={handleButtonClick}
            />
          </div>
        )}

        {labels?.footnote && (
          <p className="mt-8 text-sm sm:text-base text-neutral-500 font-mono tracking-wide">
            {labels.footnote}
          </p>
        )}
      </div>
    </section>
  );
}

export default Cta69;
