import React, { useState } from 'react';
import { Send, Bot, CheckCheck, RefreshCw, ShoppingCart, Calendar, Truck, ArrowRight, User } from 'lucide-react';
import { ChatMessage } from '../types';

export const MessengerAutomation: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState<'messenger' | 'whatsapp' | 'instagram'>('messenger');
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>('Autonomous Intent Classification: Idle');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: 'Hello! Welcome to Automation Hub demo store. How can I assist you today? I can help you with product orders, table reservations, or order tracking.',
      timestamp: '10:42 AM',
      channel: 'messenger',
    },
  ]);

  const presetScenarios = [
    {
      label: 'Reserve Table for 4',
      text: 'I would like to book a table for 4 guests tomorrow at 7:30 PM.',
      intent: 'RESERVATION_REQUEST',
    },
    {
      label: 'Check Product Stock',
      text: 'Do you have the Cyber Vision AR Headset in stock?',
      intent: 'INVENTORY_QUERY',
    },
    {
      label: 'Track Order #AH-9842',
      text: 'Can you track my order #AH-9842?',
      intent: 'ORDER_STATUS_LOOKUP',
    },
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isProcessing) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'customer',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      channel: activeChannel,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsProcessing(true);
    setLastAction('Analyzing message semantics & entity extraction...');

    // Simulate AI reasoning pipeline
    setTimeout(() => {
      const lower = text.toLowerCase();
      let botResponse: ChatMessage;

      if (lower.includes('reserve') || lower.includes('book') || lower.includes('table')) {
        setLastAction('Intent: RESERVATION_INTENT (Confidence: 99.2%) -> Booking Slot Confirmed');
        botResponse = {
          id: `bot_${Date.now()}`,
          sender: 'bot',
          text: 'Terrific! I found an open table for 4 guests tomorrow at 7:30 PM. I have tentatively registered your reservation.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          channel: activeChannel,
          intent: 'RESERVATION_CONFIRMED',
          confidence: 0.99,
          actionPayload: {
            type: 'reservation_confirmation',
            title: 'Reservation Confirmed: Table #14',
            details: 'Tomorrow @ 7:30 PM · 4 Guests · Main Dining Room',
            status: 'Confirmed via Omnichannel AI',
          },
        };
      } else if (lower.includes('stock') || lower.includes('product') || lower.includes('headset') || lower.includes('cyber')) {
        setLastAction('Intent: PRODUCT_QUERY (Confidence: 98.7%) -> Real-time Inventory Match');
        botResponse = {
          id: `bot_${Date.now()}`,
          sender: 'bot',
          text: 'Yes! The Cyber Vision AR Headset is in stock with 14 units available at our central fulfillment warehouse.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          channel: activeChannel,
          intent: 'PRODUCT_DISCOVERY',
          confidence: 0.98,
          actionPayload: {
            type: 'product_card',
            title: 'Cyber Vision AR Headset (Pro Edition)',
            details: 'Ultra-low latency dual 4K micro-OLED with spatial neural tracking.',
            price: 799,
            status: 'In Stock · Ready to dispatch',
          },
        };
      } else if (lower.includes('track') || lower.includes('order') || lower.includes('9842')) {
        setLastAction('Intent: ORDER_TRACKING (Confidence: 99.6%) -> Logistics API Sync');
        botResponse = {
          id: `bot_${Date.now()}`,
          sender: 'bot',
          text: 'Found order #AH-9842! It has been dispatched via Express Logistics and is currently out for delivery.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          channel: activeChannel,
          intent: 'LOGISTICS_TRACKING',
          confidence: 0.99,
          actionPayload: {
            type: 'order_summary',
            title: 'Order #AH-9842 · Out for Delivery',
            details: 'Estimated Arrival: Today before 4:00 PM · Carrier: DHL Express',
            status: 'Dispatched',
          },
        };
      } else {
        setLastAction('Intent: GENERAL_INQUIRY (Confidence: 95.1%) -> Contextual AI Knowledge Base');
        botResponse = {
          id: `bot_${Date.now()}`,
          sender: 'bot',
          text: `Thank you for reaching out via ${activeChannel.toUpperCase()}! Our Automation Hub has recognized your query and synchronized it with your omnichannel customer profile. Would you like to check our product catalog, place an order, or schedule a booking?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          channel: activeChannel,
          intent: 'GENERAL_ASSISTANCE',
          confidence: 0.95,
        };
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsProcessing(false);
    }, 700);
  };

  const resetChat = () => {
    setMessages([
      {
        id: 'm1',
        sender: 'bot',
        text: `Connected to ${activeChannel.toUpperCase()} Automation Gateway. How can I help your customers today?`,
        timestamp: '10:42 AM',
        channel: activeChannel,
      },
    ]);
    setLastAction('Gateway reset. Ready for inbound payload.');
  };

  return (
    <section id="ai-automation" className="relative py-16 lg:py-24 bg-neutral-950 text-neutral-100 border-b border-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 max-w-3xl">
          <div className="flex items-center gap-2 mb-3 text-xs font-mono-code text-neutral-400 tracking-widest uppercase">
            <span>01 // AI AUTOMATION</span>
            <span aria-hidden="true">·</span>
            <span>MESSENGER SIMULATOR</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Interactive Messenger Automation
          </h2>
          <p className="text-neutral-400 text-base font-body leading-relaxed">
            Experience real-time AI conversation handling. Send test messages or trigger automated shopping, reservations, and customer support scenarios across Meta Messenger, WhatsApp, and Instagram.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Preset Scenarios & AI Reasoning Monitor */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Trigger Scenarios */}
            <div className="p-6 rounded-2xl cyber-glass border border-neutral-800">
              <h3 className="font-heading text-xs font-bold tracking-widest text-neutral-200 uppercase mb-4">
                Instant Test Scenarios
              </h3>
              <p className="text-xs text-neutral-400 mb-4 font-body">
                Click any scenario below to inject an authentic customer inquiry into the live simulator:
              </p>
              <div className="space-y-2.5">
                {presetScenarios.map((scenario, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(scenario.text)}
                    disabled={isProcessing}
                    className="w-full text-left p-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 transition-all group cursor-pointer disabled:opacity-50"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-neutral-200 group-hover:text-white">
                      <span>{scenario.label}</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-40 group-hover:translate-x-1 group-hover:opacity-100 transition-all text-neutral-400" />
                    </div>
                    <p className="text-[11px] text-neutral-500 mt-1 line-clamp-1 font-body">
                      "{scenario.text}"
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Live AI Reasoning Inspection Box */}
            <div className="p-6 rounded-2xl cyber-glass border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-xs font-bold tracking-widest text-neutral-200 uppercase">
                  Telemetry & Reasoning Flow
                </h3>
                <span className="flex items-center gap-1.5 text-[11px] font-mono-code text-neutral-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  PIPELINE ONLINE
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 font-mono-code text-xs space-y-2">
                <div className="text-neutral-500 text-[11px]">LATEST STATE:</div>
                <div className="text-neutral-200 font-medium text-xs break-words">
                  {lastAction}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono-code">
                <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800">
                  <div className="text-neutral-500 text-[10px] uppercase">Latency</div>
                  <div className="text-neutral-200 font-bold text-sm mt-0.5">14.2 ms</div>
                </div>
                <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800">
                  <div className="text-neutral-500 text-[10px] uppercase">Model</div>
                  <div className="text-neutral-200 font-bold text-sm mt-0.5">Gemini 2.5 Flash</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Live Chat Interface (Unified Monochromatic Color System) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-neutral-800 overflow-hidden bg-neutral-900 shadow-xl flex flex-col h-[620px]">
              
              {/* Chat Header with Channel Switcher - Monochromatic */}
              <div className="p-4 border-b border-neutral-800 bg-neutral-950 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-md bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-200">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold tracking-wider text-white font-heading">
                      AUTOMATION HUB AGENT
                    </div>
                    <div className="text-[11px] text-neutral-400 font-mono-code flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      AUTONOMOUS RESOLUTION ACTIVE
                    </div>
                  </div>
                </div>

                {/* Channel Selector - Strictly Monochromatic */}
                <div className="flex items-center gap-1 p-1 bg-neutral-900 rounded-lg border border-neutral-800">
                  {(['messenger', 'whatsapp', 'instagram'] as const).map((channel) => (
                    <button
                      key={channel}
                      onClick={() => { setActiveChannel(channel); resetChat(); }}
                      className={`px-3 py-1 text-xs font-mono-code rounded-md transition-colors cursor-pointer capitalize ${
                        activeChannel === channel
                          ? 'bg-neutral-800 text-white font-semibold'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {channel}
                    </button>
                  ))}
                  <button
                    onClick={resetChat}
                    className="p-1 text-neutral-500 hover:text-white transition-colors cursor-pointer"
                    title="Reset Simulator"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Chat Message Scroll Area */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-neutral-950/60">
                {messages.map((msg) => {
                  const isUser = msg.sender === 'customer';
                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
                    >
                      <div
                        className={`h-7 w-7 rounded-md flex items-center justify-center shrink-0 text-xs ${
                          isUser
                            ? 'bg-neutral-800 text-neutral-300'
                            : 'bg-neutral-900 border border-neutral-700 text-neutral-200'
                        }`}
                      >
                        {isUser ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                      </div>

                      <div className="space-y-1.5">
                        <div
                          className={`p-3.5 rounded-2xl text-xs font-body leading-relaxed ${
                            isUser
                              ? 'bg-blue-600 text-white rounded-tr-none'
                              : 'bg-neutral-900 text-neutral-200 border border-neutral-800 rounded-tl-none'
                          }`}
                        >
                          <p>{msg.text}</p>

                          {/* Dynamic Action Payload Cards - Monochromatic Architecture */}
                          {msg.actionPayload && (
                            <div className="mt-3 p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-100 space-y-2">
                              {msg.actionPayload.type === 'reservation_confirmation' && (
                                <>
                                  <div className="flex items-center gap-1.5 text-white font-mono-code text-[11px] font-semibold">
                                    <Calendar className="h-3.5 w-3.5 text-neutral-400" />
                                    <span>{msg.actionPayload.title}</span>
                                  </div>
                                  <p className="text-[11px] text-neutral-400">{msg.actionPayload.details}</p>
                                  <div className="text-[10px] text-neutral-500 font-mono-code">
                                    Status: {msg.actionPayload.status}
                                  </div>
                                </>
                              )}

                              {msg.actionPayload.type === 'product_card' && (
                                <>
                                  <div className="flex items-center justify-between">
                                    <span className="font-semibold text-xs text-white">{msg.actionPayload.title}</span>
                                    <span className="text-white font-bold font-mono-code tabular-nums">${msg.actionPayload.price}</span>
                                  </div>
                                  <p className="text-[11px] text-neutral-400">{msg.actionPayload.details}</p>
                                  <div className="pt-2 flex items-center justify-between">
                                    <span className="text-[10px] text-neutral-400 font-mono-code">{msg.actionPayload.status}</span>
                                    <button
                                      onClick={() => handleSendMessage(`I want to order ${msg.actionPayload?.title}`)}
                                      className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-semibold rounded-md flex items-center gap-1 cursor-pointer transition-colors"
                                    >
                                      <ShoppingCart className="h-3 w-3" />
                                      <span>Order Now</span>
                                    </button>
                                  </div>
                                </>
                              )}

                              {msg.actionPayload.type === 'order_summary' && (
                                <>
                                  <div className="flex items-center gap-1.5 text-white font-mono-code text-[11px] font-semibold">
                                    <Truck className="h-3.5 w-3.5 text-neutral-400" />
                                    <span>{msg.actionPayload.title}</span>
                                  </div>
                                  <p className="text-[11px] text-neutral-400">{msg.actionPayload.details}</p>
                                </>
                              )}
                            </div>
                          )}
                        </div>

                        <div
                          className={`flex items-center gap-1.5 text-[10px] text-neutral-500 font-mono-code ${
                            isUser ? 'justify-end' : ''
                          }`}
                        >
                          <span>{msg.timestamp}</span>
                          {isUser && <CheckCheck className="h-3 w-3 text-neutral-400" />}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {isProcessing && (
                  <div className="flex gap-3 max-w-[85%]">
                    <div className="h-7 w-7 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-300 flex items-center justify-center shrink-0">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                    <div className="p-3 rounded-2xl bg-neutral-900 text-neutral-400 border border-neutral-800 rounded-tl-none flex items-center gap-1.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-neutral-400 animate-pulse" />
                      <div className="h-1.5 w-1.5 rounded-full bg-neutral-400 animate-pulse [animation-delay:0.2s]" />
                      <div className="h-1.5 w-1.5 rounded-full bg-neutral-400 animate-pulse [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-3 border-t border-neutral-800 bg-neutral-950 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={`Type a customer message on ${activeChannel.toUpperCase()}...`}
                  className="flex-1 bg-neutral-900 border border-neutral-800 text-neutral-100 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-neutral-700 font-body placeholder:text-neutral-500"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isProcessing}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Send</span>
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

