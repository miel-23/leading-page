export type ThemeMode = 'dark' | 'light';

export type NavigationSection = 
  | 'home'
  | 'how-it-works'
  | 'automate'
  | 'demo'
  | 'cta'
  | 'platform'
  | 'ai-automation'
  | 'conversations'
  | 'products'
  | 'about'
  | 'customers'
  | 'reservations'
  | 'workflows';

export interface ChatMessage {
  id: string;
  sender: 'customer' | 'bot' | 'agent';
  text: string;
  timestamp: string;
  channel?: 'messenger' | 'whatsapp' | 'instagram' | 'web';
  intent?: string;
  confidence?: number;
  actionPayload?: {
    type: 'product_card' | 'reservation_confirmation' | 'order_summary';
    title?: string;
    details?: string;
    price?: number;
    status?: string;
  };
}

export interface ConversationThread {
  id: string;
  customerName: string;
  customerAvatar: string;
  channel: 'messenger' | 'whatsapp' | 'instagram' | 'web';
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  sentiment: 'positive' | 'neutral' | 'curious' | 'urgent';
  status: 'automated' | 'agent_needed' | 'resolved';
  tags: string[];
  totalOrders: number;
  spentTotal: number;
  messages: ChatMessage[];
}

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  preferredChannel: 'messenger' | 'whatsapp' | 'instagram';
  totalSpend: number;
  orderCount: number;
  reservationCount: number;
  lastActive: string;
  tags: string[];
  status: 'active' | 'vip' | 'lead';
}

export interface ProductItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  inStock: boolean;
  conversionRate: string;
  conversationalSales: number;
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  customerName: string;
  channel: 'messenger' | 'whatsapp' | 'instagram' | 'web';
  items: { productName: string; quantity: number; price: number }[];
  totalAmount: number;
  status: 'received' | 'processing' | 'dispatched' | 'completed';
  createdAt: string;
  paymentStatus: 'paid' | 'pending';
}

export interface ReservationRecord {
  id: string;
  code: string;
  guestName: string;
  guestsCount: number;
  date: string;
  timeSlot: string;
  channel: 'messenger' | 'whatsapp' | 'instagram';
  status: 'confirmed' | 'pending' | 'seated' | 'cancelled';
  specialNotes?: string;
  automatedNotificationSent: boolean;
}

export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'condition' | 'action' | 'ai_reasoning';
  title: string;
  description: string;
  icon: string;
  status: 'idle' | 'running' | 'success' | 'warning';
  config: Record<string, string>;
}
