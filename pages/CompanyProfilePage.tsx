
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Company, CompanySector, CompanySize } from '../types';
import { getCompanyById } // Assuming a function to get company data by user or ID
    from '../services/companyService'; 
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import Card from '../components/Card';

const CompanyProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [companyData, setCompanyData] = useState<Partial<Company>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchCompanyData = async () => {
      if (user && user.companyId) { // Assume user object has companyId if representative
        setIsLoading(true);
        try {
          const data = await getCompanyById(user.companyId); // Or fetch based on logged-in user
          if (data) {
            setCompanyData(data);
          } else {
            // Company not found or new company for this user
            setCompanyData({ name: user.name }); // Pre-fill with user name if possible
          }
        } catch (error) {
          console.error("Failed to fetch company data", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        // Mock data if no user.companyId is available (e.g., direct access for demo)
        // Or redirect if not authenticated/authorized for a company
        const mockCompany = {
            id: '1', name: 'InovaTech Angola (Exemplo)', 
            description: 'Soluções tecnológicas inovadoras para o mercado angolano.',
            sector: CompanySector.TECHNOLOGY, size: CompanySize.MEDIUM,
            website: 'https://inovatech.ao', email: 'contato@inovatech.ao',
            foundedYear: 2015, address: 'Luanda, Angola',
            logoUrl: 'https://picsum.photos/seed/inovatech/200/200'
        };
        setCompanyData(mockCompany);
        setIsLoading(false);
        // setIsEditing(true); // Start in edit mode for demo if no real data
      }
    };

    fetchCompanyData();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setCompanyData({ ...companyData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Saving company data:", companyData);
    // Simulate API call to save data
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsEditing(false);
    // Add success/error message
  };

  if (isLoading && !Object.keys(companyData).length) {
    return <div className="flex justify-center items-center h-64"><LoadingSpinner size="lg" /></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-dark-green">Perfil da Empresa</h1>
        {!isEditing && (
            <Button variant="primary" onClick={() => setIsEditing(true)}>Editar Perfil</Button>
        )}
      </header>

      <Card className="p-6 md:p-8">
        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Input label="Nome da Empresa" name="name" value={companyData.name || ''} onChange={handleChange} required />
              <Input label="Email de Contato" name="email" type="email" value={companyData.email || ''} onChange={handleChange} required />
            </div>
            <Textarea label="Descrição" name="description" value={companyData.description || ''} onChange={handleChange} rows={4} />
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="sector" className="block text-sm font-medium text-gray-700 mb-1">Setor</label>
                    <select name="sector" value={companyData.sector || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-golden-yellow focus:border-golden-yellow sm:text-sm">
                        {Object.values(CompanySector).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                 <div>
                    <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">Porte</label>
                    <select name="size" value={companyData.size || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-golden-yellow focus:border-golden-yellow sm:text-sm">
                        {Object.values(CompanySize).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                <Input label="Website" name="website" type="url" value={companyData.website || ''} onChange={handleChange} />
                <Input label="Telefone" name="phone" type="tel" value={companyData.phone || ''} onChange={handleChange} />
            </div>
             <Input label="Endereço" name="address" value={companyData.address || ''} onChange={handleChange} />
             <Input label="Ano de Fundação" name="foundedYear" type="number" value={companyData.foundedYear || ''} onChange={handleChange} />
            
            {/* Placeholder for logo editing */}
            <div className="text-sm text-gray-500 italic">Funcionalidade de upload de logo será adicionada futuramente.</div>

            <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsEditing(false)} disabled={isLoading}>Cancelar</Button>
                <Button type="submit" variant="primary" disabled={isLoading}>
                    {isLoading ? "Salvando..." : "Salvar Alterações"}
                </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
             <div className="flex items-center space-x-4 mb-6">
                <img src={companyData.logoUrl || 'https://picsum.photos/seed/profile/100/100'} alt="Logo" className="w-24 h-24 rounded-full object-cover border-2 border-golden-yellow" />
                <div>
                    <h2 className="text-2xl font-semibold text-dark-green">{companyData.name || 'Nome da Empresa'}</h2>
                    <p className="text-sm text-golden-yellow bg-dark-green inline-block px-2 py-0.5 rounded">{companyData.sector}</p>
                </div>
            </div>
            <p><strong>Descrição:</strong> {companyData.description || 'N/A'}</p>
            <p><strong>Email:</strong> {companyData.email || 'N/A'}</p>
            <p><strong>Telefone:</strong> {companyData.phone || 'N/A'}</p>
            <p><strong>Website:</strong> <a href={companyData.website} target="_blank" rel="noopener noreferrer" className="text-dark-green hover:text-golden-yellow">{companyData.website || 'N/A'}</a></p>
            <p><strong>Endereço:</strong> {companyData.address || 'N/A'}</p>
            <p><strong>Porte:</strong> {companyData.size || 'N/A'}</p>
            <p><strong>Ano de Fundação:</strong> {companyData.foundedYear || 'N/A'}</p>
            {/* Display other company details */}
          </div>
        )}
      </Card>
    </div>
  );
};

export default CompanyProfilePage;
