
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MACEDONIAN_CITIES } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const { toast } = useToast();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [city, setCity] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Грешка",
        description: "Лозинките не се совпаѓаат",
        variant: "destructive",
      });
      return;
    }

    if (!name || !email || !city || !password) {
      toast({
        title: "Грешка",
        description: "Пополнете ги сите полиња",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch(`/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          city,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Регистрацијата не беше успешна");
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      toast({
        title: "Успешна регистрација",
        description: "Добредојдовте во Добри Сосед!",
      });

      navigate('/');

    } catch (err: any) {
      toast({
        title: "Грешка",
        description: err.message || "Настана проблем при регистрацијата.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="page-container max-w-md mx-auto">
        <h1 className="section-title text-center">Регистрирај се</h1>
        
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Име и презиме</Label>
            <Input 
              id="name" 
              type="text" 
              placeholder="Вашето име" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Е-пошта</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="вашата@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="city">Град</Label>
            <Select value={city} onValueChange={setCity} required>
              <SelectTrigger>
                <SelectValue placeholder="Избери град" />
              </SelectTrigger>
              <SelectContent>
                {MACEDONIAN_CITIES.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Лозинка</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Потврди лозинка</Label>
            <Input 
              id="confirmPassword" 
              type="password" 
              placeholder="••••••••" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          
          <Button type="submit" className="w-full">
            Регистрирај се
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p>
            Веќе имаш профил?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Најави се
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
