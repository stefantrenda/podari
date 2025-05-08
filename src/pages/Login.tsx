
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { toast } = useToast();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Грешка",
        description: "Внесете валидни податоци",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Најавувањето не беше успешно");
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      toast({
        title: "Успешно најавување",
        description: `Добредојдовте назад, ${data.user.name}!`,
      });

      navigate('/');

    } catch (err: any) {
      toast({
        title: "Грешка",
        description: err.message || "Настана проблем при најавувањето.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="page-container max-w-md mx-auto">
        <h1 className="section-title text-center">Најавување</h1>
        
        <form onSubmit={handleLogin} className="space-y-6">
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
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Лозинка</Label>
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                Заборавена лозинка?
              </Link>
            </div>
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <Button type="submit" className="w-full">
            Најави се
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p>
            Немаш профил?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Регистрирај се
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
