
import React from 'react';
import { Company } from '../types';
import Card from './Card';
import { Link } from 'react-router-dom';

interface CompanyCardProps {
  company: Company;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  return (
    <Card className="flex flex-col md:flex-row items-start">
      <img
        src={company.logoUrl || `https://picsum.photos/seed/${company.id}/200/200`}
        alt={`${company.name} logo`}
        className="w-full md:w-40 h-40 object-contain p-4 rounded-lg md:rounded-l-lg md:rounded-r-none"
      />
      <div className="p-6 flex-grow">
        <h3 className="text-2xl font-bold text-dark-green mb-1">{company.name}</h3>
        <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-golden-yellow bg-dark-green">
                {company.sector}
            </span>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-dark-green bg-golden-yellow">
                {company.size}
            </span>
            {company.foundedYear && (
                 <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-700 bg-gray-200">
                    Fundada em {company.foundedYear}
                </span>
            )}
        </div>
        <p className="text-gray-700 mb-3 text-sm leading-relaxed line-clamp-3">{company.description}</p>
        
        {company.address && <p className="text-sm text-gray-600 mb-1"><strong>Endereço:</strong> {company.address}</p>}
        {company.email && <p className="text-sm text-gray-600 mb-1"><strong>Email:</strong> <a href={`mailto:${company.email}`} className="text-dark-green hover:text-golden-yellow">{company.email}</a></p>}
        {company.phone && <p className="text-sm text-gray-600 mb-1"><strong>Telefone:</strong> {company.phone}</p>}
        {company.website && (
          <div className="mt-4">
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-golden-yellow text-dark-green font-semibold px-4 py-2 rounded-md hover:bg-yellow-400 transition-colors text-sm"
            >
              Visitar Website &rarr;
            </a>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CompanyCard;
