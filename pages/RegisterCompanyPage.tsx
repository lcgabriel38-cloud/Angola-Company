
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import { CompanySector, CompanySize, Company } from '../types';
import { COMPANY_SECTORS, COMPANY_SIZES } from '../constants';
import { registerCompany } from '../services/companyService'; // Mock service

const RegisterCompanyPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sector: CompanySector.TECHNOLOGY,
    size: CompanySize.MICRO,
    website: '',
    email: '',
    phone: '',
    address: '',
    foundedYear: '', 
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'success' | 'error' | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "O nome da empresa é obrigatório.";
    if (!formData.description.trim()) errors.description = "A descrição é obrigatória.";
    if (!formData.email.trim()) errors.email = "O email de contato é obrigatório.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Formato de email inválido.";
    if (formData.foundedYear && (isNaN(Number(formData.foundedYear)) || Number(formData.foundedYear) < 1800 || Number(formData.foundedYear) > new Date().getFullYear())) {
        errors.foundedYear = "Ano de fundação inválido.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setSubmissionStatus(null);
    try {
      const companyDataToSubmit: Omit<Company, 'id' | 'logoUrl'> = {
        ...formData,
        foundedYear: formData.foundedYear ? parseInt(formData.foundedYear, 10) : undefined,
      };
      await registerCompany(companyDataToSubmit);
      setSubmissionStatus('success');
      // Optionally reset form or navigate
      // navigate('/empresas'); 
    } catch (error) {
      console.error('Failed to register company:', error);
      setSubmissionStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  if (submissionStatus === 'success') {
    return (
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl text-center">
        <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <h2 className="text-2xl font-semibold text-dark-green mb-3">Cadastro Enviado!</h2>
        <p className="text-gray-700 mb-6">Obrigado por cadastrar sua empresa. Seu pedido foi enviado para aprovação e será analisado pela nossa equipe. Entraremos em contato em breve.</p>
        <Button onClick={() => navigate('/')} variant="primary">Voltar à Página Inicial</Button>
      </div>
    );
  }


  return (
    <div className="bg-white p-6 md:p-10 rounded-lg shadow-xl max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-dark-green mb-2 text-center">Cadastrar Nova Empresa</h1>
      <p className="text-gray-600 mb-8 text-center">Preencha o formulário abaixo para adicionar sua empresa ao nosso diretório.</p>
      
      {submissionStatus === 'error' && (
         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <p className="font-bold">Erro no Envio</p>
            <p>Ocorreu um problema ao tentar enviar seu cadastro. Por favor, tente novamente mais tarde.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input label="Nome da Empresa" name="name" value={formData.name} onChange={handleChange} error={formErrors.name} required />
        <Textarea label="Descrição da Empresa" name="description" value={formData.description} onChange={handleChange} error={formErrors.description} required />
        
        <div>
          <label htmlFor="sector" className="block text-sm font-medium text-gray-700 mb-1">Setor de Atividade</label>
          <select id="sector" name="sector" value={formData.sector} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-golden-yellow focus:border-golden-yellow sm:text-sm">
            {Object.values(CompanySector).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">Porte da Empresa</label>
          <select id="size" name="size" value={formData.size} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-golden-yellow focus:border-golden-yellow sm:text-sm">
             {Object.values(CompanySize).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <Input label="Website (opcional)" name="website" type="url" value={formData.website} onChange={handleChange} placeholder="https://suaempresa.ao" />
        <Input label="Email de Contato" name="email" type="email" value={formData.email} onChange={handleChange} error={formErrors.email} required />
        <Input label="Telefone (opcional)" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
        <Input label="Endereço (opcional)" name="address" value={formData.address} onChange={handleChange} />
        <Input label="Ano de Fundação (opcional)" name="foundedYear" type="number" value={formData.foundedYear} onChange={handleChange} error={formErrors.foundedYear} placeholder="Ex: 2010" />

        {/* Placeholder for logo upload - actual file upload is complex */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Logo da Empresa (Opcional)</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-dark-green hover:text-golden-yellow focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-golden-yellow">
                            <span>Carregar um arquivo</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" disabled />
                        </label>
                        <p className="pl-1">ou arraste e solte</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF até 10MB (Funcionalidade de upload não implementada)</p>
                </div>
            </div>
        </div>


        <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Enviar Cadastro'}
        </Button>
      </form>
    </div>
  );
};

export default RegisterCompanyPage;
