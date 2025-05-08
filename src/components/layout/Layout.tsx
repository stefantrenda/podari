
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, MessageCircle, PlusCircle, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useMessages } from '@/contexts/MessageContext';
import { currentUser } from '@/data/mockData';
import { HeartHandshake  } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { totalUnreadCount } = useMessages();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-mk-red text-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center">
            <span className="text-mk-yellow mr-2"><HeartHandshake  className='size-10' /></span> Добар Сосед
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              <Link to="/about">
                <Button variant="ghost" className="text-white hover:text-mk-yellow">
                  За нас
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="ghost" className="text-white hover:text-mk-yellow">
                  Најави се
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="secondary">
                  Регистрирај се
                </Button>
              </Link>
            </div>
            <div className="md:hidden">
              <span className="text-sm">
                {currentUser.name} | {currentUser.city}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow pb-20 md:pb-0">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 md:hidden">
        <div className="container mx-auto flex justify-around items-center">
          <Link to="/">
            <Button variant={location.pathname === '/' ? "default" : "ghost"} size="sm" className="flex flex-col items-center">
              <Home size={20} />
              <span className="text-xs mt-1">Почетна</span>
            </Button>
          </Link>
          <Link to="/create">
            <Button variant={location.pathname === '/create' ? "default" : "ghost"} size="sm" className="flex flex-col items-center">
              <PlusCircle size={20} />
              <span className="text-xs mt-1">Донирај</span>
            </Button>
          </Link>
          <Link to="/inbox">
            <Button variant={location.pathname === '/inbox' ? "default" : "ghost"} size="sm" className="flex flex-col items-center relative">
              <MessageCircle size={20} />
              {totalUnreadCount > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 w-5 flex items-center justify-center p-0">
                  {totalUnreadCount}
                </Badge>
              )}
              <span className="text-xs mt-1">Пораки</span>
            </Button>
          </Link>
          <Link to="/login">
            <Button variant={location.pathname === '/login' ? "default" : "ghost"} size="sm" className="flex flex-col items-center">
              <User size={20} />
              <span className="text-xs mt-1">Профил</span>
            </Button>
          </Link>
        </div>
      </nav>

      <div className="hidden md:block fixed top-1/2 right-8 transform -translate-y-1/2 space-y-4">
        <div className="flex flex-col gap-4">
          <Link to="/">
            <Button variant={location.pathname === '/' ? "default" : "outline"} size="icon" className="h-12 w-12 rounded-full">
              <Home size={20} />
            </Button>
          </Link>
          
          <Link to="/create">
            <Button variant={location.pathname === '/create' ? "default" : "outline"} size="icon" className="h-12 w-12 rounded-full">
              <PlusCircle size={20} />
            </Button>
          </Link>
          
          <Link to="/inbox">
            <Button variant={location.pathname === '/inbox' ? "default" : "outline"} size="icon" className="h-12 w-12 rounded-full relative">
              <MessageCircle size={20} />
              {totalUnreadCount > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 w-5 flex items-center justify-center p-0">
                  {totalUnreadCount}
                </Badge>
              )}
            </Button>
          </Link>
          
          <Link to="/login">
            <Button variant={location.pathname === '/login' ? "default" : "outline"} size="icon" className="h-12 w-12 rounded-full">
              <User size={20} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Layout;
