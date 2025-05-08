
import React from 'react';
import { useMessages } from '@/contexts/MessageContext';
import { currentUser } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { formatDistance } from 'date-fns';
import { mk } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';

const ConversationList: React.FC = () => {
  const { conversations, activeConversationId, setActiveConversationId } = useMessages();
  
  if (conversations.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-muted-foreground">Немате пораки</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-1 overflow-auto max-h-[calc(100vh-200px)]">
      {conversations.map((conversation) => {
        const otherParticipant = conversation.participants.find(p => p.id !== currentUser.id);
        const lastMessage = conversation.lastMessage;
        
        return (
          <Button
            key={conversation.id}
            variant={activeConversationId === conversation.id ? "secondary" : "ghost"}
            className={`w-full justify-start px-3 py-6 h-auto ${conversation.unreadCount > 0 ? 'font-medium' : ''}`}
            onClick={() => setActiveConversationId(conversation.id)}
          >
            <div className="flex items-center w-full">
              {otherParticipant?.avatar ? (
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img
                    src={otherParticipant.avatar}
                    alt={otherParticipant.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mr-3">
                  {otherParticipant?.name.charAt(0)}
                </div>
              )}
              
              <div className="flex-1 overflow-hidden text-left">
                <div className="flex justify-between items-center">
                  <p className="font-medium truncate">{otherParticipant?.name}</p>
                  {lastMessage && (
                    <span className="text-xs text-muted-foreground">
                      {formatDistance(new Date(lastMessage.timestamp), new Date(), {
                        addSuffix: false,
                        locale: mk,
                      })}
                    </span>
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground truncate">
                    {lastMessage?.content || 'Нема пораки'}
                  </p>
                  
                  {conversation.unreadCount > 0 && (
                    <Badge variant="secondary" className="ml-2 h-5 min-w-5 px-1">
                      {conversation.unreadCount}
                    </Badge>
                  )}
                </div>
                
                {conversation.donationItem && (
                  <p className="text-xs text-muted-foreground truncate mt-1">
                    Re: {conversation.donationItem.title}
                  </p>
                )}
              </div>
            </div>
          </Button>
        );
      })}
    </div>
  );
};

export default ConversationList;
