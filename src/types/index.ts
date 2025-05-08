
export interface User {
  id: string;
  name: string;
  city: string;
  avatar?: string;
}

export interface DonationItem {
  id: string;
  title: string;
  description: string;
  category: string;
  condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
  city: string;
  image?:  string | null;
  createdAt: string;
  userId: string;
  user?: User;
  contactPhone?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  donationItemId?: string;
  donationItem?: DonationItem;
}
