
import React from 'react';
import Card from '../components/Card';

// Mock data for demonstration
const pendingApprovals = [
  { id: 'compA', name: 'Nova Empresa XPTO', dateSubmitted: '2024-07-20' },
  { id: 'compB', name: 'Serviços Rápidos Lda', dateSubmitted: '2024-07-19' },
];

const siteStats = {
  totalCompanies: 153,
  activeUsers: 450,
  forumPosts: 78,
};

const AdminDashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-dark-green">Painel Administrativo</h1>
        <p className="text-gray-600">Gestão da plataforma Angola Company.</p>
      </header>

      {/* Stats Overview */}
      <section className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 bg-dark-green text-white">
          <h3 className="text-xl font-semibold text-golden-yellow">Empresas Cadastradas</h3>
          <p className="text-4xl font-bold">{siteStats.totalCompanies}</p>
        </Card>
        <Card className="p-6 bg-golden-yellow text-dark-green">
          <h3 className="text-xl font-semibold">Usuários Ativos</h3>
          <p className="text-4xl font-bold">{siteStats.activeUsers}</p>
        </Card>
        <Card className="p-6 bg-gray-100 text-dark-green">
          <h3 className="text-xl font-semibold">Tópicos no Fórum</h3>
          <p className="text-4xl font-bold">{siteStats.forumPosts}</p>
        </Card>
      </section>

      {/* Pending Company Approvals */}
      <section>
        <h2 className="text-2xl font-semibold text-dark-green mb-4">Empresas Pendentes de Aprovação</h2>
        {pendingApprovals.length > 0 ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {pendingApprovals.map((company) => (
                <li key={company.id} className="p-4 hover:bg-gray-50 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-dark-green">{company.name}</p>
                    <p className="text-sm text-gray-500">Submetido em: {new Date(company.dateSubmitted).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <button className="text-sm bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-md mr-2">Aprovar</button>
                    <button className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md">Rejeitar</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <Card className="p-6 text-center text-gray-600">
            Nenhuma empresa pendente de aprovação no momento.
          </Card>
        )}
      </section>

      {/* Other Admin Sections Placeholder */}
      <section>
        <h2 className="text-2xl font-semibold text-dark-green mb-4">Outras Ferramentas Administrativas</h2>
        <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
                <h3 className="text-lg font-semibold text-dark-green mb-2">Gerenciar Usuários</h3>
                <p className="text-sm text-gray-600">Visualizar e editar perfis de usuários.</p>
                <button className="mt-3 text-sm bg-dark-green text-white py-1 px-3 rounded-md hover:bg-green-700">Acessar</button>
            </Card>
             <Card className="p-6">
                <h3 className="text-lg font-semibold text-dark-green mb-2">Moderação do Fórum</h3>
                <p className="text-sm text-gray-600">Revisar e moderar conteúdo do fórum.</p>
                <button className="mt-3 text-sm bg-dark-green text-white py-1 px-3 rounded-md hover:bg-green-700">Acessar</button>
            </Card>
             <Card className="p-6">
                <h3 className="text-lg font-semibold text-dark-green mb-2">Gestão de Notícias</h3>
                <p className="text-sm text-gray-600">Publicar e editar notícias e oportunidades.</p>
                <button className="mt-3 text-sm bg-dark-green text-white py-1 px-3 rounded-md hover:bg-green-700">Acessar</button>
            </Card>
             <Card className="p-6">
                <h3 className="text-lg font-semibold text-dark-green mb-2">Configurações do Site</h3>
                <p className="text-sm text-gray-600">Ajustar parâmetros gerais da plataforma.</p>
                 <button className="mt-3 text-sm bg-dark-green text-white py-1 px-3 rounded-md hover:bg-green-700">Acessar</button>
            </Card>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboardPage;
