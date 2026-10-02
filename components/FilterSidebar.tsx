
import React from 'react';
import { CompanySector, CompanySize } from '../types';
import { COMPANY_SECTORS, COMPANY_SIZES } from '../constants';

interface FilterSidebarProps {
  selectedSector: string;
  setSelectedSector: (sector: string) => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onApplyFilters: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedSector,
  setSelectedSector,
  selectedSize,
  setSelectedSize,
  searchTerm,
  setSearchTerm,
  onApplyFilters,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-6 w-full lg:w-72">
      <h3 className="text-xl font-semibold text-dark-green border-b pb-2">Filtros</h3>
      
      <div>
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
          Pesquisar por Nome/Descrição
        </label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Ex: InovaTech, Agricultura"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-golden-yellow focus:border-golden-yellow sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="sector" className="block text-sm font-medium text-gray-700 mb-1">
          Setor de Atividade
        </label>
        <select
          id="sector"
          value={selectedSector}
          onChange={(e) => setSelectedSector(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-golden-yellow focus:border-golden-yellow sm:text-sm"
        >
          <option value="Todos">Todos os Setores</option>
          {Object.values(CompanySector).map((sector) => (
            <option key={sector} value={sector}>
              {sector}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
          Porte da Empresa
        </label>
        <select
          id="size"
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-golden-yellow focus:border-golden-yellow sm:text-sm"
        >
          <option value="Todos">Todos os Portes</option>
          {Object.values(CompanySize).map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      
      <button
        onClick={onApplyFilters}
        className="w-full bg-golden-yellow text-dark-green font-semibold py-2 px-4 rounded-md hover:bg-yellow-400 transition-colors focus:outline-none focus:ring-2 focus:ring-golden-yellow focus:ring-offset-2"
      >
        Aplicar Filtros
      </button>
    </div>
  );
};

export default FilterSidebar;
