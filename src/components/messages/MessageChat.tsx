
import React, { useState, useRef, useEffect } from 'react';
import { useMessages } from '@/contexts/MessageContext';
import { currentUser } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendIcon } from 'lucide-react';
import { format } from 'date-fns';
import { mk } from 'date-fns/locale';

interface MessageChatProps {
  conversationId: string;
}

const MessageChat: React.FC<MessageChatProps> = ({ conversationId }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { 
    getMessagesForConversation, 
    sendMessage, 
    getConversation,
    markConversationAsRead
  } = useMessages();
  
  const messages = getMessagesForConversation(conversationId);
  const conversation = getConversation(conversationId);
  
  // Auto scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Mark messages as read when viewing conversation
  useEffect(() => {
    markConversationAsRead(conversationId);
  }, [conversationId, markConversationAsRead]);
  
  const otherParticipant = conversation?.participants.find(p => p.id !== currentUser.id);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !otherParticipant) return;
    
    sendMessage(otherParticipant.id, newMessage, conversation?.donationItemId);
    setNewMessage('');
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b">
        <div className="flex items-center">
          {otherParticipant?.avatar ? (
            <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
              <img
                src={otherParticipant.avatar}
                alt={otherParticipant.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center mr-2">
              {otherParticipant?.name.charAt(0)}
            </div>
          )}
          <div>
            <h3 className="font-medium">{otherParticipant?.name}</h3>
            <p className="text-xs text-muted-foreground">{otherParticipant?.city}</p>
          </div>
        </div>
        
        {conversation?.donationItem && (
          <div className="mt-2 p-2 bg-muted rounded text-sm">
            <span className="font-medium">Разговор за: </span>
            {conversation.donationItem.title}
          </div>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground text-sm py-8">
            Нема пораки. Започнете разговор!
          </div>
        ) : (
          messages.map((message) => {
            const isCurrentUser = message.senderId === currentUser.id;
            return (
              <div
                key={message.id}
                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 ${
                    isCurrentUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="break-words">{message.content}</p>
                  <p className={`text-xs ${isCurrentUser ? 'text-primary-foreground/80' : 'text-muted-foreground'} text-right mt-1`}>
                    {format(new Date(message.timestamp), 'HH:mm', { locale: mk })}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="p-3 border-t flex gap-2">
        <Input
          placeholder="Напиши порака..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <SendIcon className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default MessageChat;
