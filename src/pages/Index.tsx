
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import DonationCard from '@/components/donations/DonationCard';
import DonationFilters from '@/components/donations/DonationFilters';
import { useDonations } from '@/contexts/DonationContext';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Index: React.FC = () => {
  const { 
    filteredDonations, 
    loading, 
    selectedCity, 
    selectedCategory,
    searchQuery, 
    filterByCity, 
    filterByCategory,
    filterBySearch,
    currentPage,
    totalPages,
    setPage
  } = useDonations();

  return (
    <Layout>
      <div className="page-container">
        <div className="flex justify-between items-center mb-6">
          <h1 className="section-title">Достапни донации</h1>
          <Link to="/create">
            <Button className="hidden md:flex gap-2">
              <PlusCircle size={18} /> Донирај нешто
            </Button>
          </Link>
        </div>
        
        <DonationFilters
          selectedCity={selectedCity}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          onCityChange={filterByCity}
          onCategoryChange={filterByCategory}
          onSearchChange={filterBySearch}
        />
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="donation-card animate-pulse-slow">
                <div className="w-full aspect-square bg-muted"></div>
                <div className="p-3">
                  <div className="h-6 bg-muted mb-2 w-3/4"></div>
                  <div className="h-4 bg-muted mb-2 w-1/2"></div>
                  <div className="h-4 bg-muted w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredDonations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl mb-4">Нема достапни донации</p>
            {selectedCity || selectedCategory || searchQuery ? (
              <Button 
                variant="outline" 
                onClick={() => {
                  filterByCity(null);
                  filterByCategory(null);
                  filterBySearch('');
                }}
              >
                Исчисти филтри
              </Button>
            ) : (
              <Link to="/create">
                <Button>Донирај нешто</Button>
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredDonations.map(donation => (
                <DonationCard key={donation.id} donation={donation} />
              ))}
            </div>
            
            {totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setPage(Math.max(currentPage - 1, 1))} 
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink 
                        onClick={() => setPage(page)} 
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setPage(Math.min(currentPage + 1, totalPages))} 
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Index;
