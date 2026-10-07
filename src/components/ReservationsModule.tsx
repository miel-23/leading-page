import React, { useState } from 'react';
import { Users, Plus, CheckCircle, Clock } from 'lucide-react';
import { ReservationRecord } from '../types';

export const ReservationsModule: React.FC = () => {
  const [reservations, setReservations] = useState<ReservationRecord[]>([
    {
      id: 'res-1',
      code: 'RES-4091',
      guestName: 'Marcus Vance',
      guestsCount: 6,
      date: 'Tomorrow, Oct 4',
      timeSlot: '8:00 PM',
      channel: 'whatsapp',
      status: 'confirmed',
      specialNotes: 'VIP Private Booth #4 · Anniversary celebration',
      automatedNotificationSent: true,
    },
    {
      id: 'res-2',
      code: 'RES-4092',
      guestName: 'Elena Rostova',
      guestsCount: 4,
      date: 'Tomorrow, Oct 4',
      timeSlot: '7:30 PM',
      channel: 'messenger',
      status: 'confirmed',
      specialNotes: 'Window seating requested',
      automatedNotificationSent: true,
    },
    {
      id: 'res-3',
      code: 'RES-4093',
      guestName: 'Julian Croft',
      guestsCount: 2,
      date: 'Friday, Oct 5',
      timeSlot: '6:00 PM',
      channel: 'instagram',
      status: 'pending',
      specialNotes: 'Table for dinner before concert',
      automatedNotificationSent: false,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGuestName, setNewGuestName] = useState('');
  const [newGuestsCount, setNewGuestsCount] = useState(2);
  const [newTimeSlot, setNewTimeSlot] = useState('7:00 PM');
  const [newDate] = useState('Tomorrow, Oct 4');
  const [newChannel, setNewChannel] = useState<'messenger' | 'whatsapp' | 'instagram'>('messenger');

  const handleCreateReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName.trim()) return;

    const newRes: ReservationRecord = {
      id: `res-${Date.now()}`,
      code: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
      guestName: newGuestName,
      guestsCount: newGuestsCount,
      date: newDate,
      timeSlot: newTimeSlot,
      channel: newChannel,
      status: 'confirmed',
      specialNotes: 'Generated via Automation Hub Admin Interface',
      automatedNotificationSent: true,
    };

    setReservations((prev) => [newRes, ...prev]);
    setIsModalOpen(false);
    setNewGuestName('');
  };

  return (
    <section id="reservations" className="py-16 lg:py-24 bg-neutral-950 text-neutral-100 border-b border-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono-code text-neutral-400 tracking-widest uppercase">
              <span>04 // SCHEDULING ENGINE</span>
              <span aria-hidden="true">·</span>
              <span>DYNAMIC RESERVATIONS</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2">
              Autonomous Reservations
            </h2>
            <p className="text-neutral-400 text-base font-body">
              Automated table, seat, and appointment bookings received through social messaging channels with real-time capacity checks, instant calendar invites, and automated reminder broadcasts.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold tracking-wider font-mono-code transition-colors shrink-0 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>CREATE RESERVATION</span>
          </button>
        </div>

        {/* Reservations Summary Cards - Monochromatic */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl cyber-glass border border-neutral-800 font-mono-code">
            <div className="text-[10px] text-neutral-500 uppercase">Confirmed Bookings</div>
            <div className="text-2xl font-bold text-white mt-1">
              {reservations.filter((r) => r.status === 'confirmed').length}
            </div>
          </div>
          <div className="p-4 rounded-xl cyber-glass border border-neutral-800 font-mono-code">
            <div className="text-[10px] text-neutral-500 uppercase">Pending Requests</div>
            <div className="text-2xl font-bold text-neutral-300 mt-1">
              {reservations.filter((r) => r.status === 'pending').length}
            </div>
          </div>
          <div className="p-4 rounded-xl cyber-glass border border-neutral-800 font-mono-code">
            <div className="text-[10px] text-neutral-500 uppercase">Automated Reminders</div>
            <div className="text-2xl font-bold text-white mt-1">100% Sent</div>
          </div>
          <div className="p-4 rounded-xl cyber-glass border border-neutral-800 font-mono-code">
            <div className="text-[10px] text-neutral-500 uppercase">Average Booking Speed</div>
            <div className="text-2xl font-bold text-white mt-1">1.2 sec</div>
          </div>
        </div>

        {/* Reservations Table - Monochromatic */}
        <div className="rounded-2xl border border-neutral-800 overflow-hidden bg-neutral-900/60 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-body">
              <thead className="bg-neutral-950/80 border-b border-neutral-800 text-[11px] font-mono-code text-neutral-400 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">Booking Code</th>
                  <th className="py-3.5 px-6">Guest Name</th>
                  <th className="py-3.5 px-6">Party Size</th>
                  <th className="py-3.5 px-6">Date & Time Slot</th>
                  <th className="py-3.5 px-6">Source Channel</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">Auto-Reminder</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {reservations.map((r) => (
                  <tr key={r.id} className="hover:bg-neutral-800/30 transition-colors">
                    <td className="py-4 px-6 font-mono-code font-bold text-white">
                      {r.code}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold text-white">{r.guestName}</div>
                      {r.specialNotes && (
                        <div className="text-[10px] text-neutral-400 font-mono-code mt-0.5">{r.specialNotes}</div>
                      )}
                    </td>
                    <td className="py-4 px-6 font-mono-code text-neutral-200">
                      <div className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 text-neutral-500" />
                        <span>{r.guestsCount} guests</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-mono-code text-neutral-200">
                      <div>{r.date}</div>
                      <div className="text-[10px] text-neutral-500">{r.timeSlot}</div>
                    </td>
                    <td className="py-4 px-6 font-mono-code uppercase text-[11px]">
                      <span className="px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-neutral-300">
                        {r.channel}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono-code">
                      <span className="px-2 py-0.5 rounded text-[10px] uppercase font-semibold bg-neutral-800 border border-neutral-700 text-neutral-300">
                        {r.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-mono-code">
                      {r.automatedNotificationSent ? (
                        <span className="text-neutral-300 text-xs flex items-center gap-1.5">
                          <CheckCircle className="h-3.5 w-3.5 text-neutral-400" />
                          <span>SMS / DM Sent</span>
                        </span>
                      ) : (
                        <span className="text-neutral-500 text-xs flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          <span>Queued</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal for New Reservation */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <span className="font-heading text-xs font-bold text-white uppercase tracking-wider">New Reservation</span>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-neutral-400 hover:text-white text-xs font-mono-code cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>

              <form onSubmit={handleCreateReservation} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono-code text-neutral-400 mb-1">GUEST NAME</label>
                  <input
                    type="text"
                    required
                    value={newGuestName}
                    onChange={(e) => setNewGuestName(e.target.value)}
                    placeholder="e.g. Rachel Sterling"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono-code text-neutral-400 mb-1">GUEST COUNT</label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={newGuestsCount}
                      onChange={(e) => setNewGuestsCount(Number(e.target.value))}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono-code text-neutral-400 mb-1">TIME SLOT</label>
                    <select
                      value={newTimeSlot}
                      onChange={(e) => setNewTimeSlot(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-700"
                    >
                      <option value="6:00 PM">6:00 PM</option>
                      <option value="6:30 PM">6:30 PM</option>
                      <option value="7:00 PM">7:00 PM</option>
                      <option value="7:30 PM">7:30 PM</option>
                      <option value="8:00 PM">8:00 PM</option>
                      <option value="8:30 PM">8:30 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-neutral-400 mb-1">INTAKE CHANNEL</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['messenger', 'whatsapp', 'instagram'] as const).map((ch) => (
                      <button
                        type="button"
                        key={ch}
                        onClick={() => setNewChannel(ch)}
                        className={`p-2 rounded-lg text-xs font-mono-code uppercase tracking-wider border cursor-pointer ${
                          newChannel === ch
                            ? 'bg-neutral-800 border-neutral-700 text-white font-semibold'
                            : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                        }`}
                      >
                        {ch}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-mono-code font-bold tracking-wider transition-colors cursor-pointer"
                  >
                    CONFIRM & SEND AUTOMATED DM
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

