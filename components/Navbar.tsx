
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { NAV_LINKS, TAGLINE } from '../constants';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-dark-green shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Logo />
          <div className="hidden md:flex items-center space-x-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-golden-yellow hover:text-dark-green transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                {user?.role === 'admin' && (
                   <Link to="/painel-admin" className="px-3 py-2 rounded-md text-sm font-medium text-white bg-golden-yellow hover:bg-opacity-80 transition-colors">Admin</Link>
                )}
                 {user?.role === 'company_representative' && (
                   <Link to="/perfil-empresa" className="px-3 py-2 rounded-md text-sm font-medium text-white bg-golden-yellow hover:bg-opacity-80 transition-colors">Meu Perfil</Link>
                )}
                <button
                  onClick={handleLogout}
                  className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-dark-green bg-golden-yellow hover:bg-opacity-80 transition-colors"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-dark-green bg-golden-yellow hover:bg-opacity-80 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-golden-yellow focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Abrir menu principal</span>
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-golden-yellow hover:text-dark-green transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated ? (
                 <>
                  {user?.role === 'admin' && (
                     <Link to="/painel-admin" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-dark-green bg-golden-yellow hover:bg-opacity-80 transition-colors">Admin</Link>
                  )}
                  {user?.role === 'company_representative' && (
                     <Link to="/perfil-empresa" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-dark-green bg-golden-yellow hover:bg-opacity-80 transition-colors">Meu Perfil</Link>
                  )}
                  <button
                    onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-dark-green bg-golden-yellow hover:bg-opacity-80 transition-colors"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-dark-green bg-golden-yellow hover:bg-opacity-80 transition-colors"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
       <div className="bg-golden-yellow text-center py-1">
        <p className="text-sm font-semibold text-dark-green">{TAGLINE}</p>
      </div>
    </nav>
  );
};

export default Navbar;
