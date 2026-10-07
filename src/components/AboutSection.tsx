import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  onGetStarted: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onGetStarted }) => {
  const securityFeatures = [
    {
      title: 'End-to-End Encryption & Zero Retention',
      description: 'Customer payment tokens and personal messaging payloads are processed in stateless secure enclaves without model training retention.',
    },
    {
      title: 'SOC 2 Type II & ISO 27001 Compliance',
      description: 'Engineered from the ground up to satisfy enterprise governance, data residency regulations, and European GDPR standards.',
    },
    {
      title: '99.99% Uptime High-Availability SLA',
      description: 'Distributed active-active clusters deployed across multiple cloud availability zones ensure uninterrupted commerce around the clock.',
    },
    {
      title: 'Direct Official Meta & WhatsApp Partner APIs',
      description: 'Native official API connectors guarantee zero risk of account throttling, session drops, or non-compliant messaging blocks.',
    },
  ];

  return (
    <section id="about" className="py-16 lg:py-24 bg-neutral-950 text-neutral-100 border-b border-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: About Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono-code text-neutral-400 tracking-widest uppercase">
              <span>07 // COMPANY & MISSION</span>
              <span aria-hidden="true">·</span>
              <span>WHY AUTOMATION HUB</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Building the Future of Autonomous Commerce
            </h2>

            <p className="text-neutral-400 text-sm sm:text-base font-body leading-relaxed">
              Automation Hub was founded on a singular conviction: the most intuitive shopping and reservation experience doesn’t take place on a static website form—it happens naturally inside direct customer conversations.
            </p>

            <p className="text-neutral-400 text-sm sm:text-base font-body leading-relaxed">
              We empower modern retail brands, hospitality groups, and enterprise service providers to turn their social channels into high-throughput revenue generators with full inventory and calendar synchronicity.
            </p>

            <div className="pt-4">
              <button
                onClick={onGetStarted}
                className="inline-flex items-center gap-2.5 px-6 py-3 text-xs font-bold font-mono-code tracking-widest uppercase text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-all cursor-pointer"
              >
                <span>ENTER AUTOMATION HUB</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Trust & Architecture Cards - Monochromatic */}
          <div className="lg:col-span-6 space-y-4">
            {securityFeatures.map((sec, i) => (
              <div
                key={i}
                className="p-5 rounded-xl cyber-glass border border-neutral-800 flex items-start gap-4"
              >
                <div className="h-8 w-8 rounded-md bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-300 shrink-0 mt-0.5">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-heading text-xs font-bold text-white uppercase tracking-wider mb-1">
                    {sec.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-body leading-relaxed">
                    {sec.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

