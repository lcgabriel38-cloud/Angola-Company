
import { Company, CompanySector, CompanySize } from '../types';

const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'InovaTech Angola',
    description: 'Soluções tecnológicas inovadoras para o mercado angolano. Foco em software de gestão e consultoria TI.',
    sector: CompanySector.TECHNOLOGY,
    size: CompanySize.MEDIUM,
    logoUrl: 'https://picsum.photos/seed/inovatech/200/200',
    website: 'https://inovatech.ao',
    email: 'contato@inovatech.ao',
    foundedYear: 2015,
    address: 'Luanda, Angola',
  },
  {
    id: '2',
    name: 'AgroValor Sustentável',
    description: 'Produção e distribuição de produtos agrícolas orgânicos, promovendo a sustentabilidade.',
    sector: CompanySector.AGRICULTURE,
    size: CompanySize.SMALL,
    logoUrl: 'https://picsum.photos/seed/agrovalor/200/200',
    website: 'https://agrovalor.ao',
    email: 'info@agrovalor.ao',
    foundedYear: 2018,
    address: 'Huambo, Angola',
  },
  {
    id: '3',
    name: 'ConstroiFuturo Lda.',
    description: 'Empresa de construção civil especializada em infraestruturas e habitação de qualidade.',
    sector: CompanySector.CONSTRUCTION,
    size: CompanySize.LARGE,
    logoUrl: 'https://picsum.photos/seed/constroi/200/200',
    email: 'geral@constroifuturo.ao',
    foundedYear: 2005,
    address: 'Benguela, Angola',
  },
   {
    id: '4',
    name: 'Finanças+',
    description: 'Consultoria financeira e de investimentos para PMEs.',
    sector: CompanySector.FINANCE,
    size: CompanySize.MICRO,
    logoUrl: 'https://picsum.photos/seed/financas/200/200',
    website: 'https://financasplus.ao',
    email: 'consultoria@financasplus.ao',
    foundedYear: 2020,
    address: 'Luanda, Angola',
  },
  {
    id: '5',
    name: 'Turismo Angola Tropical',
    description: 'Agência de viagens especializada em roteiros turísticos por Angola.',
    sector: CompanySector.TOURISM,
    size: CompanySize.SMALL,
    logoUrl: 'https://picsum.photos/seed/turismo/200/200',
    email: 'reservas@turismoangolatropical.ao',
    foundedYear: 2012,
    address: 'Namibe, Angola',
  }
];

export const getCompanies = async (filters?: {
  searchTerm?: string;
  sector?: CompanySector | string;
  size?: CompanySize | string;
}): Promise<Company[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredCompanies = mockCompanies;
      if (filters) {
        if (filters.searchTerm) {
          const term = filters.searchTerm.toLowerCase();
          filteredCompanies = filteredCompanies.filter(
            (c) =>
              c.name.toLowerCase().includes(term) ||
              c.description.toLowerCase().includes(term)
          );
        }
        if (filters.sector && filters.sector !== "Todos") {
          filteredCompanies = filteredCompanies.filter(
            (c) => c.sector === filters.sector
          );
        }
        if (filters.size && filters.size !== "Todos") {
          filteredCompanies = filteredCompanies.filter(
            (c) => c.size === filters.size
          );
        }
      }
      resolve(filteredCompanies);
    }, 500); // Simulate API delay
  });
};

export const getCompanyById = async (id: string): Promise<Company | undefined> => {
   return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCompanies.find(c => c.id === id));
    }, 300);
  });
}

export const registerCompany = async (companyData: Omit<Company, 'id' | 'logoUrl'>): Promise<Company> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newCompany: Company = {
        ...companyData,
        id: String(mockCompanies.length + 1), // simple id generation
        logoUrl: 'https://picsum.photos/seed/newcompany/200/200' // placeholder logo
      };
      // In a real app, this would send to a backend for manual approval.
      // We don't add to mockCompanies here to simulate manual approval.
      console.log("Company registered (pending approval):", newCompany);
      resolve(newCompany);
    }, 1000);
  });
};
