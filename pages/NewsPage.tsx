
import React, { useState, useEffect } from 'react';
import { NewsArticle } from '../types';
import { getNewsArticles } from '../services/newsService';
import NewsCard from '../components/NewsCard';
import LoadingSpinner from '../components/LoadingSpinner';

const NewsPage: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>("Todos");

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const fetchedArticles = await getNewsArticles();
        setArticles(fetchedArticles);
      } catch (error) {
        console.error('Failed to fetch news articles:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const categories = ["Todos", ...new Set(articles.map(a => a.category).filter(Boolean) as string[])];

  const filteredArticles = articles.filter(article => 
    filterCategory === "Todos" || article.category === filterCategory
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-dark-green">Notícias e Oportunidades</h1>
        <p className="text-lg text-gray-600 mt-2">Mantenha-se atualizado com as últimas novidades do mercado angolano.</p>
      </header>
      
      <div className="mb-6 flex justify-center">
        <div className="inline-flex rounded-md shadow-sm bg-white p-1" role="group">
          {categories.map(category => (
            <button
              key={category}
              type="button"
              onClick={() => setFilterCategory(category)}
              className={`px-4 py-2 text-sm font-medium border border-gray-200
                ${filterCategory === category 
                  ? 'bg-dark-green text-white z-10 ring-2 ring-golden-yellow' 
                  : 'text-gray-900 hover:bg-gray-50 hover:text-dark-green'}
                ${category === categories[0] ? 'rounded-l-lg' : ''}
                ${category === categories[categories.length - 1] ? 'rounded-r-lg' : ''}
                focus:z-10 focus:ring-2 focus:ring-golden-yellow transition-colors`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>


      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      ) : filteredArticles.length > 0 ? (
        <div className="space-y-8">
          {filteredArticles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
         <div className="text-center py-10 bg-white rounded-lg shadow-md">
           <img src="https://picsum.photos/seed/nonews/150/150" alt="No news" className="mx-auto mb-4 rounded-full" />
           <h3 className="text-xl font-semibold text-dark-green mb-2">Nenhuma notícia encontrada.</h3>
           <p className="text-gray-600">Verifique novamente mais tarde ou ajuste os filtros.</p>
        </div>
      )}
    </div>
  );
};

export default NewsPage;
