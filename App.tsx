
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import CompaniesPage from './pages/CompaniesPage';
import RegisterCompanyPage from './pages/RegisterCompanyPage';
import BusinessForumPage from './pages/BusinessForumPage';
import NewsPage from './pages/NewsPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import CompanyProfilePage from './pages/CompanyProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import { useAuth } from './contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-gray-50 text-brand-black">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sobre-nos" element={<AboutUsPage />} />
            <Route path="/empresas" element={<CompaniesPage />} />
            <Route path="/cadastrar-empresa" element={<RegisterCompanyPage />} />
            <Route path="/forum" element={<BusinessForumPage />} />
            <Route path="/noticias" element={<NewsPage />} />
            <Route path="/contato" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/painel-admin" 
              element={
                <ProtectedRoute>
                  <AdminDashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/perfil-empresa" 
              element={
                <ProtectedRoute>
                  <CompanyProfilePage />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
