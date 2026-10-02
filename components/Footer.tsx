
import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-green text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-golden-yellow mb-4">Angola Company</h3>
            <p className="text-sm">Conectando Empresas. Construindo o Futuro.</p>
            <p className="text-sm mt-2">Plataforma digital para o ecossistema empresarial angolano.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-golden-yellow mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              {NAV_LINKS.slice(0, 5).map(link => ( // Show first 5 links
                <li key={link.path}>
                  <Link to={link.path} className="text-sm hover:text-golden-yellow transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-golden-yellow mb-4">Siga-nos</h3>
            <div className="flex space-x-4">
              {/* Replace with actual links and icons */}
              <a href="#" className="hover:text-golden-yellow transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-golden-yellow transition-colors">WhatsApp</a>
              <a href="#" className="hover:text-golden-yellow transition-colors">Facebook</a>
            </div>
            <h3 className="text-xl font-semibold text-golden-yellow mt-6 mb-4">Área de Anúncios</h3>
            <p className="text-sm italic">Espaço reservado para futuros anúncios e parcerias.</p>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-sm">
          <p>&copy; {currentYear} Angola Company. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
