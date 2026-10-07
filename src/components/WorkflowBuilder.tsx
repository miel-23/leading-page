import React, { useState } from 'react';
import { Play, ArrowRight } from 'lucide-react';
import { WorkflowNode } from '../types';

export const WorkflowBuilder: React.FC = () => {
  const [activePreset, setActivePreset] = useState<'order' | 'reservation' | 'support'>('order');
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);
  const [executionLogs, setExecutionLogs] = useState<string[]>([
    'System standby. Workflow ready to execute.',
  ]);

  const workflows: Record<'order' | 'reservation' | 'support', WorkflowNode[]> = {
    order: [
      {
        id: 'node-1',
        type: 'trigger',
        title: 'Customer DM Received',
        description: 'Webhook triggers when customer mentions product name in Messenger / WhatsApp / IG',
        icon: 'MessageSquare',
        status: 'idle',
        config: { Channel: 'Omnichannel', Event: 'message.create' },
      },
      {
        id: 'node-2',
        type: 'ai_reasoning',
        title: 'Gemini Intent & SKU Extractor',
        description: 'Detects purchase intent, extracts desired quantity, and queries stock level in real time',
        icon: 'Zap',
        status: 'idle',
        config: { Model: 'Gemini 2.5 Flash', Accuracy: '99.4%' },
      },
      {
        id: 'node-3',
        type: 'condition',
        title: 'Inventory Availability Check',
        description: 'Verifies warehouse inventory > 0 and calculates tax & shipping rates',
        icon: 'Layers',
        status: 'idle',
        config: { Rule: 'stock > 0', Fallback: 'Suggest Alternate SKU' },
      },
      {
        id: 'node-4',
        type: 'action',
        title: 'Send Interactive Product Card',
        description: 'Generates in-chat interactive payment button with 1-click Apple Pay / Google Pay',
        icon: 'ShieldCheck',
        status: 'idle',
        config: { Gateway: 'Stripe Direct', Expiry: '15 mins' },
      },
      {
        id: 'node-5',
        type: 'action',
        title: 'Sync Orders & Notify Warehouse',
        description: 'Writes order record to database, generates tracking code, and notifies fulfillment',
        icon: 'Database',
        status: 'idle',
        config: { Database: 'Orders Ledger', Webhook: 'DHL Express' },
      },
    ],
    reservation: [
      {
        id: 'node-1',
        type: 'trigger',
        title: 'Table Booking Inquiry',
        description: 'Customer requests reservation for specific date, time, and guest count',
        icon: 'MessageSquare',
        status: 'idle',
        config: { Channel: 'WhatsApp / Messenger', Event: 'reservation.inquiry' },
      },
      {
        id: 'node-2',
        type: 'ai_reasoning',
        title: 'Slot & Capacity Engine',
        description: 'Evaluates seating chart, current table bookings, and server load',
        icon: 'Zap',
        status: 'idle',
        config: { Algorithm: 'Dynamic Table Allocator', Latency: '11ms' },
      },
      {
        id: 'node-3',
        type: 'condition',
        title: 'VIP & Dietary Tag Scan',
        description: 'Checks customer CRM profile for dining preferences or anniversary notes',
        icon: 'Layers',
        status: 'idle',
        config: { ProfileSync: 'Omnichannel CRM', CheckNotes: 'true' },
      },
      {
        id: 'node-4',
        type: 'action',
        title: 'Instant Confirmation & SMS Invite',
        description: 'Locks table slot, issues reservation code, and sends calendar file to guest',
        icon: 'ShieldCheck',
        status: 'idle',
        config: { Channel: 'SMS + WhatsApp', Format: '.ics Calendar' },
      },
    ],
    support: [
      {
        id: 'node-1',
        type: 'trigger',
        title: 'Support or FAQ Request',
        description: 'Customer inquires about refund policy, warranty, or delivery status',
        icon: 'MessageSquare',
        status: 'idle',
        config: { Channel: 'All Messaging Channels', Priority: 'Standard' },
      },
      {
        id: 'node-2',
        type: 'ai_reasoning',
        title: 'Autonomous Knowledge Search',
        description: 'Performs semantic vector search across return guidelines and past resolutions',
        icon: 'Zap',
        status: 'idle',
        config: { KnowledgeBase: 'Active Enterprise Docs', ConfidenceCutoff: '0.88' },
      },
      {
        id: 'node-3',
        type: 'action',
        title: 'Dispatch Resolution or Agent Handoff',
        description: 'Instantly resolves inquiry or escalates to human agent if sentiment drops',
        icon: 'ShieldCheck',
        status: 'idle',
        config: { AutoReply: 'Enabled', FallbackRouting: 'Human Helpdesk' },
      },
    ],
  };

  const currentNodes = workflows[activePreset];

  const runTestExecution = () => {
    if (isExecuting) return;
    setIsExecuting(true);
    setActiveStepIndex(0);
    setExecutionLogs([`[0.00s] Initializing test trigger for: ${activePreset.toUpperCase()} PIPELINE...`]);

    currentNodes.forEach((node, idx) => {
      setTimeout(() => {
        setActiveStepIndex(idx);
        setExecutionLogs((prev) => [
          ...prev,
          `[+${((idx + 1) * 0.4).toFixed(2)}s] Node ${idx + 1} (${node.title}) executed successfully. Payload passed to next step.`,
        ]);

        if (idx === currentNodes.length - 1) {
          setTimeout(() => {
            setIsExecuting(false);
            setActiveStepIndex(null);
            setExecutionLogs((prev) => [
              ...prev,
              `[SUCCESS] Workflow execution completed with 0 errors. Total duration: ${((idx + 1) * 0.45).toFixed(2)}s.`,
            ]);
          }, 600);
        }
      }, (idx + 1) * 550);
    });
  };

  return (
    <section id="workflows" className="py-16 lg:py-24 bg-neutral-950 text-neutral-100 border-b border-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono-code text-neutral-400 tracking-widest uppercase">
              <span>06 // PIPELINE ARCHITECTURE</span>
              <span aria-hidden="true">·</span>
              <span>AI WORKFLOW ENGINE</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2">
              Visual AI Workflows
            </h2>
            <p className="text-neutral-400 text-base font-body">
              Build autonomous decision graphs. Route conversational triggers through AI reasoning nodes, inventory conditions, and multi-channel fulfillment without touching boilerplate code.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Preset Selector - Monochromatic */}
            <div className="flex items-center p-1 bg-neutral-900 border border-neutral-800 rounded-xl">
              <button
                onClick={() => { setActivePreset('order'); setActiveStepIndex(null); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono-code tracking-wider transition-colors cursor-pointer ${
                  activePreset === 'order' ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Commerce Flow
              </button>
              <button
                onClick={() => { setActivePreset('reservation'); setActiveStepIndex(null); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono-code tracking-wider transition-colors cursor-pointer ${
                  activePreset === 'reservation' ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Reservation Flow
              </button>
              <button
                onClick={() => { setActivePreset('support'); setActiveStepIndex(null); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono-code tracking-wider transition-colors cursor-pointer ${
                  activePreset === 'support' ? 'bg-neutral-800 text-white font-semibold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Support Flow
              </button>
            </div>

            {/* Test Execution Trigger */}
            <button
              onClick={runTestExecution}
              disabled={isExecuting}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold font-mono-code tracking-wider transition-all cursor-pointer"
            >
              <Play className={`h-3.5 w-3.5 ${isExecuting ? 'animate-spin' : ''}`} />
              <span>{isExecuting ? 'EXECUTING...' : 'RUN WORKFLOW TEST'}</span>
            </button>
          </div>
        </div>

        {/* Visual Pipeline Canvas */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 lg:p-8 shadow-xl space-y-8">
          
          {/* Node Chain - ALL nodes use the SAME visual color system */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 relative">
            {currentNodes.map((node, index) => {
              const isActive = activeStepIndex === index;

              return (
                <div key={node.id} className="relative flex flex-col">
                  <div
                    className={`h-full p-5 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                      isActive
                        ? 'border-blue-500/80 bg-neutral-900 shadow-md scale-[1.01]'
                        : 'border-neutral-800 bg-neutral-900/80'
                    }`}
                  >
                    <div>
                      {/* Step Index & Type Tag - Unified Monochromatic */}
                      <div className="flex items-center justify-between mb-3 text-[10px] font-mono-code uppercase">
                        <span className="text-neutral-500">Step 0{index + 1}</span>
                        <span className="px-2 py-0.5 rounded font-semibold bg-neutral-800 border border-neutral-700 text-neutral-300">
                          {node.type.replace('_', ' ')}
                        </span>
                      </div>

                      <h4 className="font-heading text-xs font-bold text-white mb-2 leading-tight">
                        {node.title}
                      </h4>
                      <p className="text-[11px] text-neutral-400 font-body leading-relaxed mb-4">
                        {node.description}
                      </p>
                    </div>

                    {/* Node Config Meta */}
                    <div className="pt-3 border-t border-neutral-800 text-[10px] font-mono-code space-y-1 text-neutral-400">
                      {Object.entries(node.config).map(([k, v]) => (
                        <div key={k} className="flex justify-between">
                          <span className="text-neutral-500">{k}:</span>
                          <span className="text-neutral-300">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Connecting Arrow for Desktop */}
                  {index < currentNodes.length - 1 && (
                    <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-neutral-600">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Execution Console - Monochromatic */}
          <div className="rounded-xl bg-neutral-950 border border-neutral-800 p-4 font-mono-code text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-3 text-neutral-400 text-[11px]">
              <div className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${isExecuting ? 'bg-blue-500 animate-pulse' : 'bg-neutral-500'}`} />
                <span className="uppercase tracking-wider">EXECUTION CONSOLE LOGS</span>
              </div>
              <span>STATUS: {isExecuting ? 'RUNNING' : 'READY'}</span>
            </div>

            <div className="space-y-1 max-h-36 overflow-y-auto text-neutral-400">
              {executionLogs.map((log, i) => (
                <div key={i} className={log.includes('SUCCESS') ? 'text-white font-semibold' : ''}>
                  {log}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

