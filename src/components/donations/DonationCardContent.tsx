import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { MapPin, Calendar, MessageSquare, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export interface DonationItem {
  id: string;
  title: string;
  description: string;
  images: string[];
  location: string;
  postedAt: Date;
  phoneNumber?: string;
  userId: string;
  userName: string;
}

interface DonationCardProps {
  donation: DonationItem;
  isLoggedIn?: boolean;
}

const DonationCardContent: React.FC<DonationCardProps> = ({ donation, isLoggedIn = false }) => {
  const navigate = useNavigate();
  
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    }
  };
  
  const handleMessageClick = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    navigate(`/messages/${donation.userId}`);
  };
  
  const handleFavoriteClick = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    // Add favorite logic here
    console.log(`Adding donation ${donation.id} to favorites`);
  };

  return (
    <Card className="overflow-hidden card-hover h-full flex flex-col">
      <div className="relative">
        <Carousel>
          <CarouselContent>
            {donation.images.map((image, index) => (
              <CarouselItem key={index}>
                <div 
                  className="aspect-square w-full bg-gray-100 bg-center bg-cover"
                  style={{ backgroundImage: `url(${image})` }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
      
      <CardContent className="p-4 flex-grow">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{donation.title}</h3>
        
        <p className="text-gray-600 mb-3 text-sm line-clamp-2">{donation.description}</p>
        
        <div className="flex items-center text-gray-500 text-sm mb-1">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span>{donation.location}</span>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm">
          <Calendar className="h-3.5 w-3.5 mr-1" />
          <span>{formatDate(donation.postedAt)}</span>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between p-4 pt-0 border-t">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center"
          onClick={handleMessageClick}
        >
          <MessageSquare className="h-4 w-4 mr-1" />
          <span>Message</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center"
          onClick={handleFavoriteClick}
        >
          <Heart className="h-4 w-4 mr-1" />
          <span>Save</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DonationCardContent;
