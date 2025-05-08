
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useDonations } from '@/contexts/DonationContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Phone, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';
import { mk } from 'date-fns/locale';
import { useSocket } from '@/contexts/SocketContext';
import { currentUser } from '@/data/mockData';
import { toast } from '@/components/ui/use-toast';

const DonationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getDonationById } = useDonations();
  const { sendMessage } = useSocket();
  
  const [message, setMessage] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const donation = getDonationById(id || '');
  
  if (!donation) {
    return (
      <Layout>
        <div className="page-container text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Донацијата не е пронајдена</h1>
          <Link to="/">
            <Button>Назад кон почетна</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  const isOwnDonation = donation.userId === currentUser.id;
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    sendMessage(donation.userId, message, donation.id);
    
    toast({
      title: "Пораката е испратена",
      description: "Погледнете го вашиот инбокс за разговорот"
    });
    
    setMessage('');
    setIsDialogOpen(false);
    
    setTimeout(() => {
      navigate('/inbox');
    }, 1500);
  };
  
  const getConditionLabel = (condition: string) => {
    const conditions: Record<string, string> = {
      'new': 'Ново',
      'like-new': 'Како ново',
      'good': 'Добро',
      'fair': 'Задоволително',
      'poor': 'Лошо'
    };
    return conditions[condition] || condition;
  };
  
  return (
    <Layout>
      <div className="page-container">
        <Link to="/" className="inline-flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground">
          <ArrowLeft size={16} />
          <span>Назад</span>
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative">
            {donation.image ? (
              <img 
                src={donation.image} 
                alt={donation.title} 
                className="w-full rounded-lg object-cover aspect-square md:aspect-auto" 
              />
            ) : (
              <div className="w-full rounded-lg bg-muted flex items-center justify-center aspect-square md:aspect-auto min-h-[300px]">
                <p className="text-muted-foreground">Нема слика</p>
              </div>
            )}
            
            <div className="absolute top-4 left-4">
              <Badge variant="secondary">{donation.category}</Badge>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{donation.title}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <span>{donation.city}</span>
                <span>•</span>
                <span>
                  {format(new Date(donation.createdAt), 'dd MMMM yyyy', { locale: mk })}
                </span>
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Опис</h3>
                <p className="text-muted-foreground whitespace-pre-line">{donation.description}</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{getConditionLabel(donation.condition)}</Badge>
              </div>
              
              {donation.user && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Донатор</h3>
                  <div className="flex items-center">
                    {donation.user.avatar ? (
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                        <img 
                          src={donation.user.avatar} 
                          alt={donation.user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mr-3">
                        {donation.user.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{donation.user.name}</p>
                      <p className="text-sm text-muted-foreground">{donation.user.city}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col sm:flex-row gap-3">
              {donation.contactPhone && (
                <Button variant="outline" className="w-full sm:w-auto gap-2">
                  <Phone size={16} />
                  <a href={`tel:${donation.contactPhone}`}>
                    {donation.contactPhone}
                  </a>
                </Button>
              )}
              
              {!isOwnDonation && (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full sm:w-auto gap-2">
                      <MessageCircle size={16} />
                      Испрати порака
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Испрати порака</DialogTitle>
                      <DialogDescription>
                        Испратете порака до донаторот во врска со "{donation.title}"
                      </DialogDescription>
                    </DialogHeader>
                    
                    <form onSubmit={handleSendMessage} className="space-y-4">
                      <Textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Здраво! Ме интересира оваа донација..."
                        required
                        rows={4}
                      />
                      
                      <div className="flex justify-end gap-3">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setIsDialogOpen(false)}
                        >
                          Откажи
                        </Button>
                        <Button type="submit">Испрати</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default DonationDetails;
