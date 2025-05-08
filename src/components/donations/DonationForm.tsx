
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MACEDONIAN_CITIES, CATEGORIES, currentUser } from '@/data/mockData';
import { useDonations } from '@/contexts/DonationContext';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';

const DonationForm: React.FC = () => {
  const navigate = useNavigate();
  const { addDonation } = useDonations();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [city, setCity] = useState(currentUser.city);
  const [image, setImage] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !category || !condition || !city) {
      toast({
        title: "Грешка",
        description: "Ве молиме пополнете ги потребните полиња",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Add the new donation
    addDonation({
      title,
      description,
      category,
      condition: condition as any,
      city,
      image: image || undefined,
      userId: currentUser.id,
      user: currentUser,
      contactPhone: phone || undefined
    });
    
    // Navigate to home page
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Донирај предмет</CardTitle>
        <CardDescription>
          Пополнете ги деталите за предметот кој сакате да го донирате
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Наслов *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="На пример: 'Двосед во одлична состојба'"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Опис *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Опишете го предметот, состојбата, причина за донација..."
              rows={4}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Категорија *</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Избери категорија" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="condition">Состојба *</Label>
              <Select value={condition} onValueChange={setCondition} required>
                <SelectTrigger id="condition">
                  <SelectValue placeholder="Избери состојба" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">Ново</SelectItem>
                  <SelectItem value="like-new">Како ново</SelectItem>
                  <SelectItem value="good">Добро</SelectItem>
                  <SelectItem value="fair">Задоволително</SelectItem>
                  <SelectItem value="poor">Лошо</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="city">Град *</Label>
            <Select value={city} onValueChange={setCity} required>
              <SelectTrigger id="city">
                <SelectValue placeholder="Избери град" />
              </SelectTrigger>
              <SelectContent>
                {MACEDONIAN_CITIES.map(c => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <Label htmlFor="image">Слика URL (опционално)</Label>
            <Input
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Внесете URL до слика"
            />
            <p className="text-xs text-muted-foreground">
              За подобра прегледност, додадете слика од предметот.
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Телефон за контакт (опционално)</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="На пример: 07X XXX XXX"
              type="tel"
            />
            <p className="text-xs text-muted-foreground">
              Оваа информација ќе биде јавно видлива.
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/')}
          >
            Откажи
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Се објавува...' : 'Објави донација'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default DonationForm;
