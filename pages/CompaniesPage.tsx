
import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import CompanyCard from '../components/CompanyCard';
import FilterSidebar from '../components/FilterSidebar';
import LoadingSpinner from '../components/LoadingSpinner';
import { Company, CompanySector, CompanySize } from '../types';
import { getCompanies } from '../services/companyService';

const CompaniesPage: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedSector, setSelectedSector] = useState(searchParams.get('sector') || 'Todos');
  const [selectedSize, setSelectedSize] = useState(searchParams.get('size') || 'Todos');

  const fetchFilteredCompanies = useCallback(async () => {
    setIsLoading(true);
    try {
      const filters = {
        searchTerm: searchTerm || undefined,
        sector: selectedSector !== 'Todos' ? (selectedSector as CompanySector) : undefined,
        size: selectedSize !== 'Todos' ? (selectedSize as CompanySize) : undefined,
      };
      const fetchedCompanies = await getCompanies(filters);
      setCompanies(fetchedCompanies);

      // Update URL search params
      const newSearchParams: Record<string, string> = {};
      if (searchTerm) newSearchParams.search = searchTerm;
      if (selectedSector !== 'Todos') newSearchParams.sector = selectedSector;
      if (selectedSize !== 'Todos') newSearchParams.size = selectedSize;
      setSearchParams(newSearchParams);

    } catch (error) {
      console.error('Failed to fetch companies:', error);
      // Handle error state in UI if necessary
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, selectedSector, selectedSize, setSearchParams]); // setSearchParams is stable

  useEffect(() => {
    // Initial fetch based on URL params or defaults
    fetchFilteredCompanies();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount to respect URL params

  const handleApplyFilters = () => {
    fetchFilteredCompanies();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-dark-green">Directório de Empresas Angolanas</h1>
        <p className="text-lg text-gray-600 mt-2">Encontre e conecte-se com empresas de todos os setores e portes.</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-1/4 xl:w-1/5">
          <FilterSidebar
            selectedSector={selectedSector}
            setSelectedSector={setSelectedSector}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onApplyFilters={handleApplyFilters}
          />
        </aside>

        <main className="lg:w-3/4 xl:w-4/5">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner size="lg" />
            </div>
          ) : companies.length > 0 ? (
            <div className="space-y-6">
              {companies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-lg shadow-md">
              <img src="https://picsum.photos/seed/noresults/150/150" alt="No results" className="mx-auto mb-4 rounded-full" />
              <h3 className="text-xl font-semibold text-dark-green mb-2">Nenhum resultado encontrado</h3>
              <p className="text-gray-600">Tente ajustar seus filtros de pesquisa ou procure por termos diferentes.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CompaniesPage;
