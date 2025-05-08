
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Message, Conversation } from '@/types';
import { mockMessages, mockConversations, currentUser } from '@/data/mockData';
import { useSocket } from './SocketContext';

interface MessageContextType {
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  sendMessage: (receiverId: string, content: string, donationItemId?: string) => void;
  getMessagesForConversation: (conversationId: string) => Message[];
  getConversation: (conversationId: string) => Conversation | undefined;
  markConversationAsRead: (conversationId: string) => void;
  totalUnreadCount: number;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [totalUnreadCount, setTotalUnreadCount] = useState(0);
  const { socket, sendMessage: socketSendMessage } = useSocket();

  // Initialize with mock data
  useEffect(() => {
    setConversations(mockConversations);
    
    // Group messages by conversation
    const messagesByConversation: Record<string, Message[]> = {};
    
    mockMessages.forEach(message => {
      const conversationId = mockConversations.find(
        conv => conv.participants.some(p => p.id === message.senderId) && 
        conv.participants.some(p => p.id === message.receiverId)
      )?.id;
      
      if (conversationId) {
        if (!messagesByConversation[conversationId]) {
          messagesByConversation[conversationId] = [];
        }
        messagesByConversation[conversationId].push(message);
      }
    });
    
    // Sort messages by timestamp
    Object.keys(messagesByConversation).forEach(convId => {
      messagesByConversation[convId].sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
    });
    
    setMessages(messagesByConversation);
    
    // Calculate total unread count
    calculateUnreadCount();
  }, []);

  // Listen for new messages (mock implementation)
  useEffect(() => {
    // Use a custom event for our mock implementation
    const handleNewMessage = (event: any) => {
      const newMessage: Message = event.detail;
      
      // Find the conversation this message belongs to
      let conversationId = conversations.find(
        conv => conv.participants.some(p => p.id === newMessage.senderId) && 
        conv.participants.some(p => p.id === newMessage.receiverId)
      )?.id;
      
      if (conversationId) {
        // Update messages for this conversation
        setMessages(prev => {
          const updated = { ...prev };
          if (!updated[conversationId!]) {
            updated[conversationId!] = [];
          }
          updated[conversationId!] = [...updated[conversationId!], newMessage];
          return updated;
        });
        
        // Update conversation with last message
        setConversations(prev => {
          return prev.map(conv => {
            if (conv.id === conversationId) {
              return {
                ...conv,
                lastMessage: newMessage,
                unreadCount: conv.unreadCount + (newMessage.receiverId === currentUser.id && !newMessage.read ? 1 : 0)
              };
            }
            return conv;
          });
        });
        
        // Update unread count
        calculateUnreadCount();
      }
    };

    document.addEventListener('mock_message', handleNewMessage);
    
    return () => {
      document.removeEventListener('mock_message', handleNewMessage);
    };
  }, [conversations]);

  const calculateUnreadCount = () => {
    const count = conversations.reduce((total, conv) => total + conv.unreadCount, 0);
    setTotalUnreadCount(count);
  };

  const getMessagesForConversation = (conversationId: string): Message[] => {
    return messages[conversationId] || [];
  };

  const getConversation = (conversationId: string): Conversation | undefined => {
    return conversations.find(conv => conv.id === conversationId);
  };

  const markConversationAsRead = (conversationId: string) => {
    setConversations(prev => 
      prev.map(conv => {
        if (conv.id === conversationId) {
          return { ...conv, unreadCount: 0 };
        }
        return conv;
      })
    );
    
    // Also mark all messages in this conversation as read
    setMessages(prev => {
      const updated = { ...prev };
      if (updated[conversationId]) {
        updated[conversationId] = updated[conversationId].map(msg => {
          if (msg.receiverId === currentUser.id && !msg.read) {
            return { ...msg, read: true };
          }
          return msg;
        });
      }
      return updated;
    });
    
    // Update total unread count
    calculateUnreadCount();
  };

  const sendMessageHandler = (receiverId: string, content: string, donationItemId?: string) => {
    if (!content.trim()) return;
    
    // Use the socket to send the message
    socketSendMessage(receiverId, content, donationItemId);
  };

  const value = {
    conversations,
    messages,
    activeConversationId,
    setActiveConversationId,
    sendMessage: sendMessageHandler,
    getMessagesForConversation,
    getConversation,
    markConversationAsRead,
    totalUnreadCount
  };

  return (
    <MessageContext.Provider value={value}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};
