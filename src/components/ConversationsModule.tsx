import React, { useState } from 'react';
import { Search, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { ConversationThread } from '../types';

export const ConversationsModule: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState<'all' | 'messenger' | 'whatsapp' | 'instagram'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [replyText, setReplyText] = useState('');

  const [threads, setThreads] = useState<ConversationThread[]>([
    {
      id: 'th-1',
      customerName: 'Elena Rostova',
      customerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      channel: 'messenger',
      lastMessage: 'Is the Cyber Vision AR Headset compatible with Mac Studio M3?',
      timestamp: '2m ago',
      unreadCount: 1,
      sentiment: 'curious',
      status: 'automated',
      tags: ['VIP Customer', 'High Intent', 'Tech'],
      totalOrders: 6,
      spentTotal: 3420,
      messages: [
        {
          id: 'm1',
          sender: 'customer',
          text: 'Hi there! I am looking at the Cyber Vision AR Headset.',
          timestamp: '11:15 AM',
        },
        {
          id: 'm2',
          sender: 'bot',
          text: 'Hello Elena! Happy to assist you. The Cyber Vision AR Headset is in stock.',
          timestamp: '11:16 AM',
        },
        {
          id: 'm3',
          sender: 'customer',
          text: 'Is the Cyber Vision AR Headset compatible with Mac Studio M3?',
          timestamp: '11:18 AM',
        },
      ],
    },
    {
      id: 'th-2',
      customerName: 'Marcus Vance',
      customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      channel: 'whatsapp',
      lastMessage: 'Can you reserve a private booth for 6 tomorrow evening?',
      timestamp: '14m ago',
      unreadCount: 0,
      sentiment: 'positive',
      status: 'resolved',
      tags: ['Reservation', 'Dining Club'],
      totalOrders: 3,
      spentTotal: 840,
      messages: [
        {
          id: 'm1',
          sender: 'customer',
          text: 'Can you reserve a private booth for 6 tomorrow evening?',
          timestamp: '10:58 AM',
        },
        {
          id: 'm2',
          sender: 'bot',
          text: 'Certainly Marcus! Private Booth #4 is reserved for 6 guests tomorrow at 8:00 PM. A calendar invite has been sent to your WhatsApp.',
          timestamp: '10:59 AM',
        },
      ],
    },
    {
      id: 'th-3',
      customerName: 'Sophia Chen',
      customerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      channel: 'instagram',
      lastMessage: 'Order #AH-9842 arrived in perfect condition, thank you!',
      timestamp: '1h ago',
      unreadCount: 0,
      sentiment: 'positive',
      status: 'resolved',
      tags: ['Loyal Buyer'],
      totalOrders: 9,
      spentTotal: 5120,
      messages: [
        {
          id: 'm1',
          sender: 'customer',
          text: 'Order #AH-9842 arrived in perfect condition, thank you!',
          timestamp: '09:40 AM',
        },
        {
          id: 'm2',
          sender: 'bot',
          text: 'That is wonderful to hear, Sophia! Enjoy your new gear. Let us know if you need anything else!',
          timestamp: '09:41 AM',
        },
      ],
    },
    {
      id: 'th-4',
      customerName: 'Liam O’Connor',
      customerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      channel: 'messenger',
      lastMessage: 'I need to change the shipping address for my pending order.',
      timestamp: '3h ago',
      unreadCount: 2,
      sentiment: 'urgent',
      status: 'agent_needed',
      tags: ['Address Change', 'Pending Dispatch'],
      totalOrders: 1,
      spentTotal: 490,
      messages: [
        {
          id: 'm1',
          sender: 'customer',
          text: 'I need to change the shipping address for my pending order.',
          timestamp: '08:12 AM',
        },
      ],
    },
  ]);

  const [activeThreadId, setActiveThreadId] = useState<string>(threads[0].id);
  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  const filteredThreads = threads.filter((t) => {
    const matchesChannel = selectedChannel === 'all' || t.channel === selectedChannel;
    const matchesQuery = t.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         t.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesChannel && matchesQuery;
  });

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    const newMsg = {
      id: `rep_${Date.now()}`,
      sender: 'agent' as const,
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setThreads((prev) =>
      prev.map((t) =>
        t.id === activeThread.id
          ? {
              ...t,
              messages: [...t.messages, newMsg],
              lastMessage: replyText,
              timestamp: 'Just now',
              status: 'resolved',
            }
          : t
      )
    );
    setReplyText('');
  };

  const handleApplyAISuggestion = (suggestion: string) => {
    setReplyText(suggestion);
  };

  return (
    <section id="conversations" className="py-16 lg:py-24 bg-neutral-950 text-neutral-100 border-b border-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-3 text-xs font-mono-code text-neutral-400 tracking-widest uppercase">
            <span>02 // UNIFIED DESK</span>
            <span aria-hidden="true">·</span>
            <span>OMNICHANNEL INBOX</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Unified Conversations
          </h2>
          <p className="text-neutral-400 text-base font-body leading-relaxed">
            Consolidate live customer inquiries across Facebook Messenger, WhatsApp, Instagram Direct, and Web widgets into a single high-velocity command desk with automated AI assistance.
          </p>
        </div>

        {/* Console Container - Monochromatic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-2xl border border-neutral-800 bg-neutral-900/60 overflow-hidden shadow-xl h-[700px]">
          
          {/* Thread List Column */}
          <div className="lg:col-span-4 border-r border-neutral-800 flex flex-col bg-neutral-950/80">
            
            {/* Search and Filters */}
            <div className="p-4 border-b border-neutral-800 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search conversations..."
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-700"
                />
              </div>

              {/* Channel Filter Tabs - Strictly Monochromatic */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
                {(['all', 'messenger', 'whatsapp', 'instagram'] as const).map((ch) => (
                  <button
                    key={ch}
                    onClick={() => setSelectedChannel(ch)}
                    className={`px-2.5 py-1 text-[11px] font-mono-code rounded-md uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                      selectedChannel === ch
                        ? 'bg-neutral-800 text-white font-semibold'
                        : 'text-neutral-400 hover:text-white bg-neutral-900'
                    }`}
                  >
                    {ch}
                  </button>
                ))}
              </div>
            </div>

            {/* Threads List */}
            <div className="flex-1 overflow-y-auto divide-y divide-neutral-900">
              {filteredThreads.map((thread) => {
                const isSelected = thread.id === activeThread.id;
                return (
                  <button
                    key={thread.id}
                    onClick={() => setActiveThreadId(thread.id)}
                    className={`w-full text-left p-4 transition-colors flex items-start gap-3 cursor-pointer ${
                      isSelected ? 'bg-neutral-900 border-l-2 border-blue-500' : 'hover:bg-neutral-900/50'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <div className="h-9 w-9 rounded-md bg-neutral-800 border border-neutral-700 flex items-center justify-center font-bold text-xs text-neutral-300">
                        {thread.customerName.charAt(0)}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-white truncate font-body">
                          {thread.customerName}
                        </span>
                        <span className="text-[10px] text-neutral-500 font-mono-code shrink-0">
                          {thread.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 truncate font-body">
                        {thread.lastMessage}
                      </p>

                      <div className="flex items-center gap-2 mt-2 text-[10px] text-neutral-500 font-mono-code">
                        <span className="uppercase text-neutral-300">{thread.channel}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-neutral-400">
                          {thread.status === 'agent_needed' ? 'Human Needed' : 'Autonomous'}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Chat Messages Column */}
          <div className="lg:col-span-5 border-r border-neutral-800 flex flex-col bg-neutral-950">
            
            {/* Active Thread Bar */}
            <div className="p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/40">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-md bg-neutral-800 border border-neutral-700 flex items-center justify-center font-bold text-xs text-white">
                  {activeThread.customerName.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-body">
                    {activeThread.customerName}
                  </div>
                  <div className="text-[10px] text-neutral-400 font-mono-code flex items-center gap-1.5">
                    <span className="capitalize">{activeThread.channel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-neutral-400">Synced via Automation Hub</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono-code text-neutral-400">
                  {activeThread.messages.length} messages
                </span>
              </div>
            </div>

            {/* Conversation Flow */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeThread.messages.map((m) => {
                const isCustomer = m.sender === 'customer';
                return (
                  <div
                    key={m.id}
                    className={`flex flex-col max-w-[85%] ${isCustomer ? '' : 'ml-auto items-end'}`}
                  >
                    <div
                      className={`p-3 rounded-xl text-xs font-body leading-relaxed ${
                        isCustomer
                          ? 'bg-neutral-900 text-neutral-200 border border-neutral-800 rounded-tl-none'
                          : 'bg-blue-600 text-white rounded-tr-none'
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className="text-[10px] text-neutral-500 font-mono-code mt-1 px-1">
                      {m.timestamp}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* AI Copilot Suggestion Box - Monochromatic */}
            <div className="p-3 border-t border-neutral-800 bg-neutral-900/40">
              <div className="flex items-center gap-1.5 text-[11px] font-mono-code text-neutral-400 mb-2">
                <Sparkles className="h-3 w-3 text-neutral-400" />
                <span>AI SUGGESTED ACTIONS</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleApplyAISuggestion('Yes! Cyber Vision connects effortlessly with Mac Studio M3 via Thunderbolt 4 and ultra-low latency spatial mirror.')}
                  className="px-2.5 py-1 text-[11px] rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700 transition-colors text-left cursor-pointer"
                >
                  "Yes, fully compatible with Mac Studio M3..."
                </button>
                <button
                  onClick={() => handleApplyAISuggestion('I have attached the direct product spec sheet and instant ordering link with free overnight shipping.')}
                  className="px-2.5 py-1 text-[11px] rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700 transition-colors text-left cursor-pointer"
                >
                  "Attach spec sheet & free overnight shipping..."
                </button>
              </div>
            </div>

            {/* Reply Composer */}
            <div className="p-3 border-t border-neutral-800 bg-neutral-950 flex items-center gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendReply();
                }}
                placeholder="Type your response or trigger automated flow..."
                className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3.5 py-2 text-xs text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-700 font-body"
              />
              <button
                onClick={handleSendReply}
                disabled={!replyText.trim()}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Send</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>

          </div>

          {/* Customer CRM Metadata Column - Monochromatic */}
          <div className="hidden lg:flex lg:col-span-3 flex-col bg-neutral-900/40 p-5 space-y-6 overflow-y-auto">
            
            <div>
              <h3 className="font-heading text-xs font-bold tracking-widest text-neutral-400 uppercase mb-3">
                Customer Intelligence
              </h3>
              <div className="text-center py-4 border-b border-neutral-800">
                <div className="h-14 w-14 mx-auto rounded-md bg-neutral-800 border border-neutral-700 flex items-center justify-center font-bold text-base text-white mb-2">
                  {activeThread.customerName.charAt(0)}
                </div>
                <div className="font-bold text-sm text-white font-body">{activeThread.customerName}</div>
                <div className="text-xs text-neutral-400 font-mono-code">{activeThread.channel} user</div>
              </div>
            </div>

            {/* Metrics - Monochromatic */}
            <div className="space-y-2.5 font-mono-code text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                <span className="text-neutral-500">LIFETIME VALUE</span>
                <span className="font-bold text-white tabular-nums">${activeThread.spentTotal}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                <span className="text-neutral-500">TOTAL ORDERS</span>
                <span className="font-bold text-white tabular-nums">{activeThread.totalOrders}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                <span className="text-neutral-500">SENTIMENT</span>
                <span className="font-bold text-neutral-200 uppercase">{activeThread.sentiment}</span>
              </div>
            </div>

            {/* Identified Traits */}
            <div>
              <div className="text-xs font-mono-code text-neutral-500 mb-2 uppercase">Identified Traits</div>
              <div className="flex flex-wrap gap-1.5">
                {activeThread.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-mono-code text-neutral-300 bg-neutral-800 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800">
              <div className="text-xs font-mono-code text-neutral-500 uppercase mb-2">Automated Actions</div>
              <div className="space-y-2 text-xs text-neutral-300 font-mono-code">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-neutral-400" />
                  <span>Messenger Webhook Active</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-neutral-400" />
                  <span>Catalog Context Loaded</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-neutral-400" />
                  <span>Stripe Instant Link Ready</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

