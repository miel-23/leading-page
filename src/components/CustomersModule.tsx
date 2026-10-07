import React, { useState } from 'react';
import { Search, Mail, Phone, ExternalLink } from 'lucide-react';
import { CustomerProfile } from '../types';

export const CustomersModule: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerProfile | null>(null);

  const [customers] = useState<CustomerProfile[]>([
    {
      id: 'cust-1',
      name: 'Elena Rostova',
      email: 'elena.rostova@nexus.io',
      phone: '+1 (555) 392-1084',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      preferredChannel: 'messenger',
      totalSpend: 3420,
      orderCount: 6,
      reservationCount: 2,
      lastActive: '12m ago',
      tags: ['Enterprise Buyer', 'High LTV', 'Hardware'],
      status: 'vip',
    },
    {
      id: 'cust-2',
      name: 'Marcus Vance',
      email: 'm.vance@vanguard.co',
      phone: '+1 (555) 720-9421',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      preferredChannel: 'whatsapp',
      totalSpend: 840,
      orderCount: 3,
      reservationCount: 5,
      lastActive: '1h ago',
      tags: ['Frequent Diner', 'WhatsApp VIP'],
      status: 'active',
    },
    {
      id: 'cust-3',
      name: 'Sophia Chen',
      email: 'sophia.c@designlab.org',
      phone: '+1 (555) 481-2299',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      preferredChannel: 'instagram',
      totalSpend: 5120,
      orderCount: 9,
      reservationCount: 1,
      lastActive: '3h ago',
      tags: ['Creator', 'Influencer', 'High Volume'],
      status: 'vip',
    },
    {
      id: 'cust-4',
      name: 'Julian Croft',
      email: 'julian@croftaerospace.com',
      phone: '+1 (555) 883-9102',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      preferredChannel: 'messenger',
      totalSpend: 1290,
      orderCount: 2,
      reservationCount: 3,
      lastActive: 'Yesterday',
      tags: ['Tech Lead', 'Early Adopter'],
      status: 'active',
    },
  ]);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <section id="customers" className="py-16 lg:py-24 bg-neutral-950 text-neutral-100 border-b border-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-3 text-xs font-mono-code text-neutral-400 tracking-widest uppercase">
            <span>05 // CRM DIRECTORY</span>
            <span aria-hidden="true">·</span>
            <span>CUSTOMER INTELLIGENCE</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2">
            Omnichannel Customers
          </h2>
          <p className="text-neutral-400 text-base font-body">
            Automated customer profiling across all messaging touchpoints. Track conversation frequency, lifetime revenue, ordering history, and behavioral traits in one single ledger.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl cyber-glass mb-6">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or trait..."
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-700 font-body"
            />
          </div>

          <div className="flex items-center gap-4 text-xs font-mono-code text-neutral-500">
            <span>TOTAL PROFILES: <strong className="text-white">{customers.length}</strong></span>
            <span aria-hidden="true">·</span>
            <span>SYNC: <strong className="text-neutral-300">REAL-TIME</strong></span>
          </div>
        </div>

        {/* Customer Directory Table - Monochromatic */}
        <div className="rounded-2xl border border-neutral-800 overflow-hidden bg-neutral-900/60 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-body">
              <thead className="bg-neutral-950/80 border-b border-neutral-800 text-[11px] font-mono-code text-neutral-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">Customer</th>
                  <th className="py-3.5 px-6">Preferred Channel</th>
                  <th className="py-3.5 px-6">Lifetime Value</th>
                  <th className="py-3.5 px-6">Orders & Bookings</th>
                  <th className="py-3.5 px-6">Traits / Tags</th>
                  <th className="py-3.5 px-6">Last Active</th>
                  <th className="py-3.5 px-6">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-neutral-800/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-md bg-neutral-800 border border-neutral-700 flex items-center justify-center font-bold text-xs text-white">
                          {c.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-white text-xs">{c.name}</div>
                          <div className="text-[10px] text-neutral-400 font-mono-code">{c.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-mono-code uppercase text-[11px]">
                      <span className="px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-neutral-300">
                        {c.preferredChannel}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono-code font-bold text-sm text-neutral-100 tabular-nums">
                      ${c.totalSpend.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 font-mono-code text-xs text-neutral-300">
                      <div>{c.orderCount} orders placed</div>
                      <div className="text-[10px] text-neutral-500">{c.reservationCount} bookings</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1">
                        {c.tags.map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono-code text-neutral-300 bg-neutral-800 px-2 py-0.5 rounded"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6 font-mono-code text-xs text-neutral-400">
                      {c.lastActive}
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => setSelectedCustomer(c)}
                        className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-300 hover:text-white rounded-md text-xs font-mono-code transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <span>Profile</span>
                        <ExternalLink className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Customer Modal */}
        {selectedCustomer && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div className="font-heading text-xs font-bold text-white uppercase tracking-wider">
                  Customer Profile Dossier
                </div>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="text-neutral-400 hover:text-white text-xs font-mono-code cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-md bg-neutral-800 border border-neutral-700 flex items-center justify-center font-bold text-lg text-white">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white font-body">{selectedCustomer.name}</h3>
                  <div className="text-xs text-neutral-400 font-mono-code flex items-center gap-2 mt-1">
                    <Mail className="h-3.5 w-3.5 text-neutral-500" />
                    <span>{selectedCustomer.email}</span>
                  </div>
                  <div className="text-xs text-neutral-400 font-mono-code flex items-center gap-2 mt-0.5">
                    <Phone className="h-3.5 w-3.5 text-neutral-500" />
                    <span>{selectedCustomer.phone}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 font-mono-code text-xs">
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="text-neutral-500 text-[10px] uppercase">Lifetime Value</div>
                  <div className="text-sm font-bold text-white mt-1">${selectedCustomer.totalSpend}</div>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="text-neutral-500 text-[10px] uppercase">Orders</div>
                  <div className="text-sm font-bold text-white mt-1">{selectedCustomer.orderCount}</div>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="text-neutral-500 text-[10px] uppercase">Reservations</div>
                  <div className="text-sm font-bold text-white mt-1">{selectedCustomer.reservationCount}</div>
                </div>
              </div>

              <div>
                <div className="text-xs font-mono-code text-neutral-400 mb-2 uppercase">Omnichannel Activity Log</div>
                <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono-code space-y-2 text-neutral-300">
                  <div>• Order placed via {selectedCustomer.preferredChannel.toUpperCase()} (${selectedCustomer.totalSpend})</div>
                  <div>• Autonomous reservation confirmed via Messenger bot</div>
                  <div>• Automated shipping tracking update dispatched</div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-mono-code font-bold tracking-wider transition-colors cursor-pointer"
                >
                  RETURN TO DIRECTORY
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

