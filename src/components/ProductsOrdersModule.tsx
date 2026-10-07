import React, { useState } from 'react';
import { Package, ShoppingBag, Search, ChevronRight } from 'lucide-react';
import { ProductItem, OrderRecord } from '../types';

export const ProductsOrdersModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [searchQuery, setSearchQuery] = useState('');

  const [products] = useState<ProductItem[]>([
    {
      id: 'p1',
      name: 'Cyber Vision AR Spatial Headset',
      sku: 'CV-AR-900',
      category: 'Hardware',
      price: 799,
      stock: 14,
      image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=300&auto=format&fit=crop&q=80',
      inStock: true,
      conversionRate: '18.4%',
      conversationalSales: 142,
    },
    {
      id: 'p2',
      name: 'Autonomous Neural Gateway Hub',
      sku: 'ANG-HUB-10',
      category: 'Automation Edge',
      price: 450,
      stock: 28,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&auto=format&fit=crop&q=80',
      inStock: true,
      conversionRate: '22.1%',
      conversationalSales: 318,
    },
    {
      id: 'p3',
      name: 'Omnichannel Smart POS Terminal',
      sku: 'POS-OMNI-04',
      category: 'Terminals',
      price: 320,
      stock: 6,
      image: 'https://images.unsplash.com/photo-1556742049-0a67e55722c3?w=300&auto=format&fit=crop&q=80',
      inStock: true,
      conversionRate: '15.8%',
      conversationalSales: 89,
    },
    {
      id: 'p4',
      name: 'Haptic Sensor Glove Interface',
      sku: 'HSG-400',
      category: 'Peripherals',
      price: 260,
      stock: 0,
      image: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=300&auto=format&fit=crop&q=80',
      inStock: false,
      conversionRate: '9.2%',
      conversationalSales: 64,
    },
  ]);

  const [orders, setOrders] = useState<OrderRecord[]>([
    {
      id: 'ord-1',
      orderNumber: '#AH-9842',
      customerName: 'Sophia Chen',
      channel: 'instagram',
      items: [{ productName: 'Cyber Vision AR Spatial Headset', quantity: 1, price: 799 }],
      totalAmount: 799,
      status: 'dispatched',
      createdAt: 'Today, 08:30 AM',
      paymentStatus: 'paid',
    },
    {
      id: 'ord-2',
      orderNumber: '#AH-9843',
      customerName: 'Elena Rostova',
      channel: 'messenger',
      items: [
        { productName: 'Autonomous Neural Gateway Hub', quantity: 2, price: 450 },
        { productName: 'Omnichannel Smart POS Terminal', quantity: 1, price: 320 },
      ],
      totalAmount: 1220,
      status: 'processing',
      createdAt: 'Today, 10:14 AM',
      paymentStatus: 'paid',
    },
    {
      id: 'ord-3',
      orderNumber: '#AH-9844',
      customerName: 'David K.',
      channel: 'whatsapp',
      items: [{ productName: 'Omnichannel Smart POS Terminal', quantity: 1, price: 320 }],
      totalAmount: 320,
      status: 'received',
      createdAt: 'Today, 11:22 AM',
      paymentStatus: 'paid',
    },
  ]);

  const advanceOrderStatus = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const nextStatusMap: Record<OrderRecord['status'], OrderRecord['status']> = {
          received: 'processing',
          processing: 'dispatched',
          dispatched: 'completed',
          completed: 'completed',
        };
        return { ...o, status: nextStatusMap[o.status] };
      })
    );
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="products" className="py-16 lg:py-24 bg-neutral-950 text-neutral-100 border-b border-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono-code text-neutral-400 tracking-widest uppercase">
              <span>03 // COMMERCE ENGINE</span>
              <span aria-hidden="true">·</span>
              <span>PRODUCTS & ORDERS</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2">
              Conversational Catalog & Orders
            </h2>
            <p className="text-neutral-400 text-base font-body">
              Sync e-commerce inventory with real-time messenger checkout. Customers purchase directly within WhatsApp, Instagram, or Messenger with automated logistics tracking.
            </p>
          </div>

          {/* Tab Selector - Monochromatic */}
          <div className="flex items-center p-1 bg-neutral-900 border border-neutral-800 rounded-xl">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono-code tracking-wider transition-colors cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-neutral-800 text-white font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Package className="h-3.5 w-3.5" />
              <span>PRODUCTS ({products.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono-code tracking-wider transition-colors cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-neutral-800 text-white font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>LIVE ORDERS ({orders.length})</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Products */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            
            {/* Search and Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl cyber-glass">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products or SKU..."
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-700 font-body"
                />
              </div>

              <div className="flex items-center gap-4 text-xs font-mono-code text-neutral-500">
                <span>INVENTORY SYNC: <strong className="text-neutral-300">REAL-TIME</strong></span>
                <span aria-hidden="true">·</span>
                <span>CHANNELS: <strong className="text-neutral-300">OMNICHANNEL</strong></span>
              </div>
            </div>

            {/* Products Table - Monochromatic */}
            <div className="rounded-2xl border border-neutral-800 overflow-hidden bg-neutral-900/60 shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-body">
                  <thead className="bg-neutral-950/80 border-b border-neutral-800 text-[11px] font-mono-code text-neutral-400 uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-6">Product Item</th>
                      <th className="py-3.5 px-6">SKU / Category</th>
                      <th className="py-3.5 px-6">Price</th>
                      <th className="py-3.5 px-6">Inventory Status</th>
                      <th className="py-3.5 px-6">Conversational Sales</th>
                      <th className="py-3.5 px-6">Conversion</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/60 font-body">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-neutral-800/30 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-md bg-neutral-800 border border-neutral-700 flex items-center justify-center font-bold text-xs text-neutral-300">
                              <Package className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="font-semibold text-white text-xs">{p.name}</div>
                              <div className="text-[10px] text-neutral-500 font-mono-code">ID: {p.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 font-mono-code text-xs text-neutral-300">
                          <div>{p.sku}</div>
                          <div className="text-[10px] text-neutral-500">{p.category}</div>
                        </td>
                        <td className="py-4 px-6 font-mono-code font-bold text-sm text-neutral-100 tabular-nums">
                          ${p.price}
                        </td>
                        <td className="py-4 px-6 font-mono-code">
                          {p.inStock ? (
                            <span className="text-neutral-300 text-xs flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
                              {p.stock} units available
                            </span>
                          ) : (
                            <span className="text-neutral-500 text-xs flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-neutral-600" />
                              Out of stock
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6 font-mono-code tabular-nums text-neutral-200">
                          {p.conversationalSales} orders
                        </td>
                        <td className="py-4 px-6 font-mono-code font-semibold text-neutral-300 tabular-nums">
                          {p.conversionRate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Orders Tracking */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl cyber-glass border border-neutral-800 font-mono-code">
                <div className="text-[10px] text-neutral-500 uppercase">Received Orders</div>
                <div className="text-2xl font-bold text-white mt-1">
                  {orders.filter((o) => o.status === 'received').length}
                </div>
              </div>
              <div className="p-4 rounded-xl cyber-glass border border-neutral-800 font-mono-code">
                <div className="text-[10px] text-neutral-500 uppercase">AI Processing / Packaging</div>
                <div className="text-2xl font-bold text-white mt-1">
                  {orders.filter((o) => o.status === 'processing').length}
                </div>
              </div>
              <div className="p-4 rounded-xl cyber-glass border border-neutral-800 font-mono-code">
                <div className="text-[10px] text-neutral-500 uppercase">Dispatched / En Route</div>
                <div className="text-2xl font-bold text-white mt-1">
                  {orders.filter((o) => o.status === 'dispatched' || o.status === 'completed').length}
                </div>
              </div>
            </div>

            {/* Orders Pipeline List - Monochromatic Status Badges */}
            <div className="rounded-2xl border border-neutral-800 overflow-hidden bg-neutral-900/60 shadow-xl">
              <div className="divide-y divide-neutral-800/80">
                {orders.map((order) => {
                  return (
                    <div
                      key={order.id}
                      className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-neutral-800/30 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="h-9 w-9 rounded-md bg-neutral-800 border border-neutral-700 flex items-center justify-center font-mono-code text-xs text-neutral-300 font-bold shrink-0">
                          <ShoppingBag className="h-4 w-4" />
                        </div>

                        <div>
                          <div className="flex items-center gap-3">
                            <span className="font-mono-code font-bold text-sm text-white">
                              {order.orderNumber}
                            </span>
                            <span className="text-xs text-neutral-400 font-body">
                              by {order.customerName}
                            </span>
                            <span className="text-[10px] font-mono-code uppercase px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                              {order.channel}
                            </span>
                          </div>

                          <div className="text-xs text-neutral-400 mt-1 font-body">
                            {order.items.map((it) => `${it.quantity}x ${it.productName}`).join(', ')}
                          </div>

                          <div className="flex items-center gap-3 text-[10px] font-mono-code text-neutral-500 mt-2">
                            <span>{order.createdAt}</span>
                            <span aria-hidden="true">·</span>
                            <span>Payment: {order.paymentStatus.toUpperCase()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="font-mono-code text-base font-bold text-white tabular-nums">
                            ${order.totalAmount}
                          </div>
                          <div className="text-[10px] font-mono-code uppercase px-2 py-0.5 rounded border border-neutral-700 bg-neutral-800 text-neutral-300 mt-1 inline-block">
                            {order.status}
                          </div>
                        </div>

                        {/* Interactive Status Advancer */}
                        {order.status !== 'completed' && (
                          <button
                            onClick={() => advanceOrderStatus(order.id)}
                            className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 hover:text-white border border-neutral-700 text-neutral-300 rounded-lg text-xs font-mono-code transition-colors flex items-center gap-1 cursor-pointer"
                            title="Advance to next logistics state"
                          >
                            <span>Next Step</span>
                            <ChevronRight className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};

