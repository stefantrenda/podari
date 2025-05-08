
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useMessages } from '@/contexts/MessageContext';
import ConversationList from '@/components/messages/ConversationList';
import MessageChat from '@/components/messages/MessageChat';

const Inbox: React.FC = () => {
  const { activeConversationId, conversations } = useMessages();
  const [isMobileListVisible, setIsMobileListVisible] = useState(!activeConversationId);
  
  const handleConversationSelect = (id: string) => {
    setIsMobileListVisible(false);
  };
  
  return (
    <Layout>
      <div className="page-container h-[calc(100vh-200px)]">
        <h1 className="section-title">Пораки</h1>
        
        {conversations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl">Нема разговори</p>
            <p className="text-muted-foreground mt-2">
              Пораките ќе се појават овде откако ќе комуницирате со донатор или заинтересирано лице
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 h-full">
            <div className={`md:block ${isMobileListVisible ? 'block' : 'hidden'}`}>
              <ConversationList />
            </div>
            
            <div className={`md:col-span-2 lg:col-span-3 h-full ${isMobileListVisible ? 'hidden' : 'block'}`}>
              {activeConversationId ? (
                <div className="h-full border rounded-lg overflow-hidden">
                  <MessageChat conversationId={activeConversationId} />
                </div>
              ) : (
                <div className="h-full flex items-center justify-center border rounded-lg">
                  <div className="text-center">
                    <p className="text-muted-foreground">
                      Изберете разговор за да ги видите пораките
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Inbox;
