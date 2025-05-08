
import { DonationItem, User, Conversation, Message } from "@/types";

export const MACEDONIAN_CITIES = [
  "Skopje",
  "Bitola",
  "Kumanovo",
  "Prilep",
  "Tetovo",
  "Veles",
  "Štip",
  "Ohrid",
  "Gostivar",
  "Strumica",
  "Kavadarci",
  "Kočani",
  "Kičevo",
  "Struga",
  "Radoviš",
  "Gevgelija",
  "Debar",
  "Kriva Palanka",
  "Sveti Nikole",
  "Negotino",
  "Delčevo",
  "Vinica",
  "Probištip",
  "Berovo",
  "Kruševo",
  "Makedonski Brod",
  "Demir Kapija",
  "Kratovo",
  "Pehčevo",
  "Demir Hisar"
];

export const CATEGORIES = [
  "Мебел",
  "Облека",
  "Електроника",
  "Кујнски Прибор",
  "Книги",
  "Играчки",
  "Спорт",
  "Алати",
  "Градина",
  "Друго"
];

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Марко Стојановски",
    city: "Skopje",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: "2",
    name: "Ана Петровска",
    city: "Bitola",
    avatar: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: "3",
    name: "Димитар Николовски",
    city: "Ohrid",
    avatar: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: "4",
    name: "Елена Митевска",
    city: "Tetovo",
    avatar: "https://i.pravatar.cc/150?img=4"
  },
  {
    id: "5",
    name: "Горан Георгиевски",
    city: "Strumica",
    avatar: "https://i.pravatar.cc/150?img=5"
  }
];

export const mockDonationItems: DonationItem[] = [
  {
    id: "1",
    title: "Двосед во одлична состојба",
    description: "Двосед користен само 6 месеци, како нов. Се продава поради селидба.",
    category: "Мебел",
    condition: "like-new",
    city: "Skopje",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1770&auto=format&fit=crop",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    userId: "1",
    user: mockUsers[0],
    contactPhone: "070123456"
  },
  {
    id: "2",
    title: "Зимски јакни - машки",
    description: "Три зимски јакни во добра состојба, големина L. Се подаруваат заедно.",
    category: "Облека",
    condition: "good",
    city: "Bitola",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=1740&auto=format&fit=crop",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    userId: "2",
    user: mockUsers[1]
  },
  {
    id: "3",
    title: "Лаптоп Lenovo",
    description: "Лаптоп Lenovo ThinkPad, 8GB RAM, 256GB SSD. Работи одлично.",
    category: "Електроника",
    condition: "good",
    city: "Ohrid",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1771&auto=format&fit=crop",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    userId: "3",
    user: mockUsers[2],
    contactPhone: "071234567"
  },
  {
    id: "4",
    title: "Комплет лонци за готвење",
    description: "Комплет од 5 лонци, малку користени. Се подаруваат поради купување нови.",
    category: "Кујнски Прибор",
    condition: "good",
    city: "Tetovo",
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=1771&auto=format&fit=crop",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    userId: "4",
    user: mockUsers[3]
  },
  {
    id: "5",
    title: "Книги за средно образование",
    description: "Учебници за трета година гимназиско образование во одлична состојба.",
    category: "Книги",
    condition: "like-new",
    city: "Strumica",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    userId: "5",
    user: mockUsers[4],
    contactPhone: "072345678"
  },
  {
    id: "6",
    title: "Детски велосипед",
    description: "Детски велосипед за возраст 6-8 години. Добро сочуван со мали гребнатини.",
    category: "Спорт",
    condition: "good",
    city: "Skopje",
    image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=1770&auto=format&fit=crop",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    userId: "1",
    user: mockUsers[0]
  },
  {
    id: "7",
    title: "Телевизор Samsung 42\"",
    description: "Телевизор Samsung 42\", функционален но со мала линија на екранот. Се подарува.",
    category: "Електроника",
    condition: "fair",
    city: "Bitola",
    image: "https://images.unsplash.com/photo-1461151304267-38535e780c79?q=80&w=1633&auto=format&fit=crop",
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    userId: "2",
    user: mockUsers[1],
    contactPhone: "070234567"
  },
  {
    id: "8",
    title: "Градинарски алати",
    description: "Сет градинарски алати: лопатче, гребло и ножици за кастрење. Малку користени.",
    category: "Градина",
    condition: "good",
    city: "Ohrid",
    image: "https://images.unsplash.com/photo-1617692855027-33b14f061079?q=80&w=1770&auto=format&fit=crop",
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    userId: "3",
    user: mockUsers[2]
  }
];

export const mockMessages: Message[] = [
  {
    id: "1",
    senderId: "2",
    receiverId: "1",
    content: "Здраво! Дали двоседот е сè уште достапен?",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: true
  },
  {
    id: "2",
    senderId: "1",
    receiverId: "2",
    content: "Да, сè уште е достапен. Кога би сакале да го подигнете?",
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    read: true
  },
  {
    id: "3",
    senderId: "2",
    receiverId: "1",
    content: "Дали утре попладне би можеле? Околу 17:00?",
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    read: false
  },
  {
    id: "4",
    senderId: "3",
    receiverId: "1",
    content: "Здраво, ме интересира детскиот велосипед. Дали сè уште го имате?",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    read: true
  },
  {
    id: "5",
    senderId: "1",
    receiverId: "3",
    content: "Да, сè уште го имам. Можете да дојдете да го видите кога ви одговара.",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    read: true
  }
];

export const mockConversations: Conversation[] = [
  {
    id: "1",
    participants: [mockUsers[0], mockUsers[1]],
    lastMessage: mockMessages[2],
    unreadCount: 1,
    donationItemId: "1",
    donationItem: mockDonationItems[0]
  },
  {
    id: "2",
    participants: [mockUsers[0], mockUsers[2]],
    lastMessage: mockMessages[4],
    unreadCount: 0,
    donationItemId: "6",
    donationItem: mockDonationItems[5]
  }
];

// Current user (for development)
export const currentUser: User = mockUsers[0];
