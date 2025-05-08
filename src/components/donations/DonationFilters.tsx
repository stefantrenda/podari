
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MACEDONIAN_CITIES, CATEGORIES } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Search } from 'lucide-react';

interface DonationFiltersProps {
  selectedCity: string | null;
  selectedCategory: string | null;
  searchQuery: string;
  onCityChange: (city: string | null) => void;
  onCategoryChange: (category: string | null) => void;
  onSearchChange: (search: string) => void;
}

const DonationFilters: React.FC<DonationFiltersProps> = ({
  selectedCity,
  selectedCategory,
  searchQuery,
  onCityChange,
  onCategoryChange,
  onSearchChange
}) => {
  return (
    <div className="flex flex-col gap-4 mb-6 w-full">
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Пребарај донации..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        </div>
        
        <div className="flex-1">
          <Select value={selectedCity || ''} onValueChange={(value) => onCityChange(value || null)}>
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
        
        <div className="flex-1">
          <Select value={selectedCategory || ''} onValueChange={(value) => onCategoryChange(value || null)}>
            <SelectTrigger>
              <SelectValue placeholder="Избери категорија" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {(selectedCity || selectedCategory || searchQuery) && (
        <Button 
          variant="outline"
          onClick={() => {
            onCityChange(null);
            onCategoryChange(null);
            onSearchChange('');
          }}
          className="gap-2 self-start"
        >
          <X size={16} /> Ресетирај филтри
        </Button>
      )}
    </div>
  );
};

export default DonationFilters;
