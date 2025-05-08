
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  sendMessage: (recipientId: string, messageContent: string) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // When we have a backend server, we'll connect to it
    // For now, we'll just mock the connection
    // const newSocket = io('http://localhost:5000');
    
    const mockConnect = setTimeout(() => {
      console.log('Mocking socket connection');
      setIsConnected(true);
    }, 1000);
    
    return () => {
      clearTimeout(mockConnect);
      // When we have a real socket: 
      // socket?.disconnect();
    };
  }, []);

  const sendMessage = (recipientId: string, messageContent: string) => {
    console.log(`Mock sending message to ${recipientId}: ${messageContent}`);
    // When we have a real socket:
    // socket?.emit('private-message', { recipientId, content: messageContent });
    
    // For now, we'll just log the message
    return {
      id: `mock-${Date.now()}`,
      senderId: 'current-user',
      recipientId,
      content: messageContent,
      timestamp: new Date().toISOString(),
      read: false
    };
  };

  return (
    <SocketContext.Provider value={{ socket, isConnected, sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
