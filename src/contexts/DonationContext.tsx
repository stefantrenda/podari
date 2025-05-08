
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { DonationItem } from '@/types';
import { toast } from '@/components/ui/use-toast';

interface DonationContextType {
  donations: DonationItem[];
  filteredDonations: DonationItem[];
  loading: boolean;
  error: string | null;
  selectedCity: string | null;
  selectedCategory: string | null;
  searchQuery: string;
  currentPage: number;
  totalPages: number;
  filterByCity: (city: string | null) => void;
  filterByCategory: (category: string | null) => void;
  filterBySearch: (query: string) => void;
  getDonationById: (id: string) => DonationItem | undefined;
  addDonation: (donation: Omit<DonationItem, 'id' | 'createdAt'>) => void;
  setPage: (page: number) => void;
}

const DonationContext = createContext<DonationContextType | undefined>(undefined);

export const DonationProvider = ({ children }: { children: ReactNode }) => {
  const [donations, setDonations] = useState<DonationItem[]>([]);
  const [filteredDonations, setFilteredDonations] = useState<DonationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [apiIntegrated, setApiIntegrated] = useState(true);

  // Check if backend is connected
  useEffect(() => {
    const checkBackendConnection = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_HOST+'/api/donations');
        if (response.ok) {
          setApiIntegrated(true);
        } else {
          console.log('Using mock data - backend not available');
          setApiIntegrated(false);
        }
      } catch (error) {
        console.log('Using mock data - backend not available');
        setApiIntegrated(false);
      }
    };
    
    checkBackendConnection();
  }, []);

  const fetchDonations = async () => {
    setLoading(true);

    try {
      if (apiIntegrated) {
        // Build query parameters
        const params = new URLSearchParams();
        params.append('page', currentPage.toString());
        params.append('limit', '8');

        if (selectedCity) {
          params.append('city', selectedCity);
        }

        if (selectedCategory) {
          params.append('category', selectedCategory);
        }

        if (searchQuery) {
          params.append('search', searchQuery);
        }

        // Fetch from API
        const response = await fetch(import.meta.env.VITE_HOST+`/api/donations?${params}`);
        const data = await response.json();

        setDonations(data.donations);
        setFilteredDonations(data.donations);
        setTotalPages(data.pagination.pages);
      } else {
        setError('Backend not available. Please check your server.');
        setDonations([]);
        setFilteredDonations([]);
      }

      setLoading(false);
    } catch (err) {
      console.error('Error fetching donations:', err);
      setError('Failed to fetch donations');

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, [selectedCity, selectedCategory, searchQuery, currentPage, apiIntegrated]);

  const filterByCity = (city: string | null) => {
    setSelectedCity(city);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const filterByCategory = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when filter changes
  };
  
  const filterBySearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when filter changes
  };
  
  const setPage = (page: number) => {
    setCurrentPage(page);
  };

  const getDonationById = (id: string): DonationItem | undefined => {
    return donations.find(item => item.id === id);
  };

  const addDonation = async (donation: Omit<DonationItem, 'id' | 'createdAt'>) => {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      const CONDITION_MAP = {
        'new': 'Ново',
        'like-new': 'Како ново',
        'good': 'Добра',
        'fair': 'Користено',
        'poor': 'Лошо'
      };

      const response = await fetch(import.meta.env.VITE_HOST + '/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...donation,
          userId: user.id,
          condition: CONDITION_MAP[donation.condition as keyof typeof CONDITION_MAP],
          images: donation.image ? [donation.image] : [],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create donation');
      }

      await fetchDonations()

      const newDonation = await response.json();
      setDonations(prev => [newDonation, ...prev]);

      toast({
        title: "Успешно додадено",
        description: "Вашата донација е објавена.",
      });
    } catch (error) {
      console.error('Error adding donation:', error);
      toast({
        title: "Грешка",
        description: "Неуспешно додавање на донацијата. Обидете се повторно.",
        variant: "destructive",
      });
    }
  };


  const value = {
    donations,
    filteredDonations,
    loading,
    error,
    selectedCity,
    selectedCategory,
    searchQuery,
    currentPage,
    totalPages,
    filterByCity,
    filterByCategory,
    filterBySearch,
    getDonationById,
    addDonation,
    setPage
  };

  return (
    <DonationContext.Provider value={value}>
      {children}
    </DonationContext.Provider>
  );
};

export const useDonations = () => {
  const context = useContext(DonationContext);
  if (context === undefined) {
    throw new Error('useDonations must be used within a DonationProvider');
  }
  return context;
};
