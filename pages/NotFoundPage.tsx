
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center px-4">
      <img src="https://picsum.photos/seed/404page/300/300" alt="Lost astronaut" className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full mb-8 shadow-xl"/>
      <h1 className="text-6xl font-bold text-dark-green mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-brand-black mb-3">Página Não Encontrada</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Oops! Parece que a página que você está procurando não existe ou foi movida.
      </p>
      <Link to="/">
        <Button variant="primary" size="lg">Voltar à Página Inicial</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
