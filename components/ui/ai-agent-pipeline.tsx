"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const defaultMessages = [
  'Messenger: Message received → "Bonjour, je voudrais commander le Trench Coat"',
  'AI: Understands the message → Intent: Product Order (SKU-9214, Size M)',
  'Automation: Converts into action → Stripe 1-click checkout card dispatched',
  'Messenger: Message received → "Avez-vous une table pour 2 ce soir ?"',
  'AI: Understands the message → Intent: Table Reservation (2 guests, 20:00)',
  'Automation: Converts into action → Table #4 booked, calendar invite sent',
  'Messenger: Message received → "Quels sont vos délais de livraison ?"',
  'AI: Understands the message → Intent: Customer Support inquiry',
  'Automation: Converts into action → Live tracking & VIP status updated in CRM',
  'Pipeline active. Sub-14ms execution latency across all channels.',
]

function AnimatedDot({
  path,
  duration,
  delay,
  size,
  opacity,
  color = "oklch(78.9% 0.154 211.53)",
}: {
  path: string
  duration: number
  delay: number
  size: number
  opacity: number
  color?: string
}) {
  return (
    <circle r={size} fill={color} opacity={opacity}>
      <animateMotion
        dur={`${duration}s`}
        repeatCount="indefinite"
        begin={`${delay}s`}
        path={path}
      />
    </circle>
  )
}

function PulsingDot({
  cx,
  cy,
  color,
  duration,
  delay = 0,
}: {
  cx: number
  cy: number
  color: string
  duration: number
  delay?: number
}) {
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={2.8}
      fill={color}
      animate={{ opacity: [0.15, 1, 0.15] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  )
}

function StatusIndicator({
  cx,
  cy,
  color,
  pulsing = false,
  duration = 1.9,
  delay = 0,
}: {
  cx: number
  cy: number
  color: string
  pulsing?: boolean
  duration?: number
  delay?: number
}) {
  if (pulsing) {
    return (
      <motion.circle
        cx={cx}
        cy={cy}
        r={3}
        fill={color}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    )
  }
  return <circle cx={cx} cy={cy} r={3} fill={color} opacity={0.95} />
}

export default function EnterpriseAIPipeline({
  accentColor = "oklch(78.9% 0.154 211.53)",
  className = "",
}: {
  accentColor?: string
  className?: string
}) {
  const [messageIndex, setMessageIndex] = useState(0)
  const [workflows, setWorkflows] = useState(1247)

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % defaultMessages.length)
    }, 2800)

    const workflowInterval = setInterval(() => {
      setWorkflows((prev) => prev + 1)
    }, 6500)

    return () => {
      clearInterval(messageInterval)
      clearInterval(workflowInterval)
    }
  }, [])

  // Paths connecting Step 1 (Messenger) → Step 2 (AI) → Step 3 (Automation)
  const paths = {
    // Messenger to AI
    p1: "M136,88 L188,88",
    // AI to Automation outputs
    p3: "M336,88 C360,88 375,48 408,48",
    p4: "M336,88 L408,88",
    p5: "M336,88 C360,88 375,128 408,128",
  }

  return (
    <div className={`bg-[#090909] border border-white/[0.08] rounded-[16px] overflow-hidden font-sans w-full max-w-[680px] mx-auto shadow-2xl ${className}`}>
      {/* Header */}
      <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.span
            className="w-2 h-2 rounded-full inline-block"
            style={{ backgroundColor: accentColor }}
            animate={{ opacity: [1, 0.25, 1], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-[11px] text-white/50 tracking-[0.12em] font-mono font-medium">
            CORE PIPELINE · LIVE ARCHITECTURE
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-white/30 font-mono tracking-wider">
            MESSENGER → AI → AUTOMATION
          </span>
          <span className="text-[10px] text-emerald-400/80 font-mono">
            0 errors
          </span>
        </div>
      </div>

      {/* SVG 3-Step Pipeline: Messenger → AI → Automation */}
      <div className="w-full overflow-x-auto overflow-y-hidden scrollbar-none py-3 px-2">
        <svg width="100%" viewBox="0 0 580 176" className="block min-w-[530px]">
          <defs>
            <marker
              id="arrow-accent"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path
                d="M2 1.5L7.5 5L2 8.5"
                fill="none"
                stroke={accentColor}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </marker>
          </defs>

          {/* Connection Paths: Messenger → AI */}
          <path
            d={paths.p1}
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1.5"
            strokeDasharray="3 5"
            markerEnd="url(#arrow-accent)"
          />

          {/* Connection Paths: AI → Automation */}
          <path
            d={paths.p3}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1.5"
            strokeDasharray="3 5"
          />
          <path
            d={paths.p4}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1.5"
            strokeDasharray="3 5"
          />
          <path
            d={paths.p5}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1.5"
            strokeDasharray="3 5"
          />

          {/* Animated flowing data packets */}
          <AnimatedDot path={paths.p1} duration={1.1} delay={0} size={2.5} opacity={1} color={accentColor} />
          <AnimatedDot path={paths.p1} duration={1.1} delay={0.4} size={1.8} opacity={0.65} color={accentColor} />
          <AnimatedDot path={paths.p1} duration={1.1} delay={0.8} size={1.3} opacity={0.35} color={accentColor} />

          <AnimatedDot path={paths.p3} duration={1.3} delay={0.1} size={2.2} opacity={0.9} color={accentColor} />
          <AnimatedDot path={paths.p3} duration={1.3} delay={0.7} size={1.5} opacity={0.55} color={accentColor} />

          <AnimatedDot path={paths.p4} duration={1.15} delay={0.25} size={2.2} opacity={0.9} color={accentColor} />
          <AnimatedDot path={paths.p4} duration={1.15} delay={0.8} size={1.5} opacity={0.55} color={accentColor} />

          <AnimatedDot path={paths.p5} duration={1.4} delay={0.4} size={2.2} opacity={0.9} color={accentColor} />
          <AnimatedDot path={paths.p5} duration={1.4} delay={0.95} size={1.5} opacity={0.55} color={accentColor} />

          {/* ============================================================ */}
          {/* STEP 01: MESSENGER (Message received)                        */}
          {/* ============================================================ */}
          <rect
            x="14"
            y="52"
            width="122"
            height="72"
            rx="10"
            fill="#121214"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
          />
          {/* Accent top border strip */}
          <rect x="26" y="52.5" width="98" height="1" rx="0.5" fill="rgba(255,255,255,0.2)" />
          
          <text
            x="75"
            y="72"
            textAnchor="middle"
            fontSize="9"
            fill="rgba(255,255,255,0.4)"
            fontFamily="monospace"
            letterSpacing=".12em"
          >
            STEP 01 · MESSENGER
          </text>
          <text
            x="75"
            y="92"
            textAnchor="middle"
            fontSize="13"
            fill="#ffffff"
            fontFamily="system-ui"
            fontWeight="700"
          >
            Message
          </text>
          <text
            x="75"
            y="108"
            textAnchor="middle"
            fontSize="12"
            fill={accentColor}
            fontFamily="system-ui"
            fontWeight="500"
          >
            received
          </text>
          <text
            x="75"
            y="138"
            textAnchor="middle"
            fontSize="8.5"
            fill="rgba(255,255,255,0.25)"
            fontFamily="monospace"
          >
            inbound-event
          </text>

          {/* ============================================================ */}
          {/* STEP 02: AI (Understands the message)                        */}
          {/* ============================================================ */}
          <rect
            x="190"
            y="44"
            width="146"
            height="88"
            rx="12"
            fill="#050d18"
            stroke={accentColor}
            strokeWidth="1.2"
          />
          {/* Accent top indicator */}
          <rect x="210" y="44.5" width="106" height="1.5" rx="0.75" fill={accentColor} opacity={0.8} />

          <text
            x="263"
            y="66"
            textAnchor="middle"
            fontSize="9.5"
            fill={accentColor}
            fontFamily="monospace"
            letterSpacing=".14em"
            fontWeight="700"
          >
            STEP 02 · AI
          </text>
          <text
            x="263"
            y="87"
            textAnchor="middle"
            fontSize="14"
            fill="#ffffff"
            fontFamily="system-ui"
            fontWeight="700"
          >
            Understands
          </text>
          <text
            x="263"
            y="104"
            textAnchor="middle"
            fontSize="12"
            fill="rgba(255,255,255,0.85)"
            fontFamily="system-ui"
            fontWeight="500"
          >
            the message
          </text>

          {/* Pulsing AI Reasoning Dots */}
          <PulsingDot cx={251} cy={120} color={accentColor} duration={1.2} delay={0} />
          <PulsingDot cx={263} cy={120} color={accentColor} duration={1.2} delay={0.4} />
          <PulsingDot cx={275} cy={120} color={accentColor} duration={1.2} delay={0.8} />

          <text
            x="263"
            y="146"
            textAnchor="middle"
            fontSize="8.5"
            fill={accentColor}
            opacity={0.65}
            fontFamily="monospace"
          >
            intent-reasoning
          </text>

          {/* ============================================================ */}
          {/* STEP 03: AUTOMATION (Converts into action)                   */}
          {/* ============================================================ */}
          {/* Container Label for Step 03 */}
          <text
            x="485"
            y="26"
            textAnchor="middle"
            fontSize="9.5"
            fill="rgba(255,255,255,0.45)"
            fontFamily="monospace"
            letterSpacing=".12em"
            fontWeight="600"
          >
            STEP 03 · AUTOMATION // Converts into action
          </text>

          {/* Output 1: Products & Orders */}
          <rect
            x="410"
            y="32"
            width="156"
            height="32"
            rx="8"
            fill="#121214"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.8"
          />
          <text
            x="475"
            y="52"
            textAnchor="middle"
            fontSize="11"
            fill="rgba(255,255,255,0.9)"
            fontFamily="system-ui"
            fontWeight="600"
          >
            Products & Orders
          </text>
          <StatusIndicator cx={552} cy={48} color="#22c55e" />

          {/* Output 2: Leads & CRM */}
          <rect
            x="410"
            y="72"
            width="156"
            height="32"
            rx="8"
            fill="#121214"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.8"
          />
          <text
            x="475"
            y="92"
            textAnchor="middle"
            fontSize="11"
            fill="rgba(255,255,255,0.9)"
            fontFamily="system-ui"
            fontWeight="600"
          >
            Leads & CRM Sync
          </text>
          <StatusIndicator cx={552} cy={88} color="#f59e0b" pulsing duration={1.9} />

          {/* Output 3: Reservations */}
          <rect
            x="410"
            y="112"
            width="156"
            height="32"
            rx="8"
            fill="#121214"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="0.8"
          />
          <text
            x="475"
            y="132"
            textAnchor="middle"
            fontSize="11"
            fill="rgba(255,255,255,0.9)"
            fontFamily="system-ui"
            fontWeight="600"
          >
            Instant Reservations
          </text>
          <StatusIndicator cx={552} cy={128} color="#f59e0b" pulsing duration={2.2} delay={0.35} />

          <text
            x="485"
            y="158"
            textAnchor="middle"
            fontSize="8.5"
            fill="rgba(255,255,255,0.25)"
            fontFamily="monospace"
          >
            auto-execution
          </text>
        </svg>
      </div>

      {/* Real-time Message Stream */}
      <div className="border-t border-white/[0.06] px-5 py-3 h-[54px] bg-black/40">
        <div className="flex gap-2.5 items-start h-full">
          <span className="font-mono text-[14px] leading-tight shrink-0 font-bold" style={{ color: accentColor }}>
            ›
          </span>
          <div className="relative flex-1 overflow-hidden h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={messageIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.25 }}
                className="font-mono text-[11px] sm:text-[12px] text-white/80 leading-relaxed absolute inset-0"
              >
                {defaultMessages[messageIndex]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Stats Footer */}
      <div className="border-t border-white/[0.06] px-5 py-3 flex flex-wrap gap-4 sm:gap-6 items-center bg-black/20">
        <div>
          <div className="text-[9px] text-white/30 tracking-[0.1em] mb-0.5">WORKFLOWS</div>
          <motion.div
            key={workflows}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            className="text-[15px] sm:text-[16px] text-white/90 font-mono font-bold"
          >
            {workflows.toLocaleString()}
          </motion.div>
        </div>
        <div>
          <div className="text-[9px] text-white/30 tracking-[0.1em] mb-0.5">INTENTS</div>
          <div className="text-[15px] sm:text-[16px] text-white/90 font-mono font-bold">100% Parsed</div>
        </div>
        <div>
          <div className="text-[9px] text-white/30 tracking-[0.1em] mb-0.5">AVG LATENCY</div>
          <div className="text-[15px] sm:text-[16px] text-white/90 font-mono font-bold">14ms</div>
        </div>
        <div className="ml-auto text-right">
          <div className="text-[9px] text-white/30 tracking-[0.1em] mb-0.5">CONVERSION</div>
          <div className="text-[11px] font-mono font-semibold" style={{ color: accentColor }}>
            Messenger → AI → Action
          </div>
        </div>
      </div>
    </div>
  )
}
