
import React from 'react';
import { NewsArticle } from '../types';
import Card from './Card'; // Assuming a generic Card component exists
import { Link } from 'react-router-dom';

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  return (
    <Card className="flex flex-col md:flex-row overflow-hidden group">
      {article.imageUrl && (
        <div className="md:w-1/3 overflow-hidden">
          <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-48 md:h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className={`p-6 ${article.imageUrl ? 'md:w-2/3' : 'w-full'}`}>
        <h3 className="text-xl font-bold text-dark-green mb-2 group-hover:text-golden-yellow transition-colors">{article.title}</h3>
        <p className="text-xs text-gray-500 mb-1">
          {article.author && `Por ${article.author} em `} 
          {new Date(article.publishDate).toLocaleDateString()}
          {article.category && <span className="ml-2 py-0.5 px-1.5 bg-golden-yellow text-dark-green rounded text-xs font-medium">{article.category}</span>}
        </p>
        <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-4">{article.summary}</p>
        {/* For now, no individual news detail page, so link might go to top of news or be disabled */}
        <Link 
            to={`/noticias#${article.id}`} // Simple anchor link for now
            className="text-sm font-semibold text-dark-green hover:text-golden-yellow transition-colors"
        >
          Ler mais &rarr;
        </Link>
      </div>
    </Card>
  );
};

export default NewsCard;
