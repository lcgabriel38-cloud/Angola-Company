
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { Company, NewsArticle } from '../types';
import { getCompanies } from '../services/companyService';
import { getNewsArticles } from '../services/newsService';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import { TAGLINE } from '../constants';

const CompanyCardSmall: React.FC<{ company: Company }> = ({ company }) => (
  <Card className="h-full flex flex-col">
    <img src={company.logoUrl || `https://picsum.photos/seed/${company.id}/300/200`} alt={company.name} className="w-full h-32 object-cover"/>
    <div className="p-4 flex-grow">
      <h3 className="text-lg font-semibold text-dark-green mb-1">{company.name}</h3>
      <p className="text-xs text-golden-yellow bg-dark-green inline-block px-2 py-0.5 rounded mb-2">{company.sector}</p>
      <p className="text-sm text-gray-600 line-clamp-2">{company.description}</p>
    </div>
    <div className="p-4 border-t border-gray-200">
        <Link to={`/empresas?search=${encodeURIComponent(company.name)}`} className="text-sm text-dark-green hover:text-golden-yellow font-medium">
            Ver Detalhes &rarr;
        </Link>
    </div>
  </Card>
);

const NewsCardSmall: React.FC<{ article: NewsArticle }> = ({ article }) => (
  <Card className="h-full flex flex-col">
    {article.imageUrl && <img src={article.imageUrl} alt={article.title} className="w-full h-32 object-cover"/>}
    <div className="p-4 flex-grow">
      <h3 className="text-lg font-semibold text-dark-green mb-1 line-clamp-2">{article.title}</h3>
      <p className="text-xs text-gray-500 mb-2">{new Date(article.publishDate).toLocaleDateString()}</p>
      <p className="text-sm text-gray-600 line-clamp-3">{article.summary}</p>
    </div>
     <div className="p-4 border-t border-gray-200">
        <Link to={`/noticias`} className="text-sm text-dark-green hover:text-golden-yellow font-medium"> {/* Assuming no detail page for now */}
            Ler Mais &rarr;
        </Link>
    </div>
  </Card>
);


const HomePage: React.FC = () => {
  const [featuredCompanies, setFeaturedCompanies] = useState<Company[]>([]);
  const [latestNews, setLatestNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [companies, news] = await Promise.all([
          getCompanies(),
          getNewsArticles(),
        ]);
        setFeaturedCompanies(companies.slice(0, 3)); // Take first 3 as featured
        setLatestNews(news.slice(0, 3)); // Take first 3 as latest
      } catch (error) {
        console.error("Failed to fetch homepage data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-dark-green text-white py-20 rounded-lg shadow-xl">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in-down">Bem-vindo à Angola Company</h1>
          <p className="text-2xl mb-8 text-golden-yellow animate-fade-in-up">{TAGLINE}</p>
          <div className="space-x-4 animate-fade-in-up animation-delay-500">
            <Link to="/empresas">
              <Button variant="primary" size="lg">Explorar Empresas</Button>
            </Link>
            <Link to="/cadastrar-empresa">
              <Button variant="outline" size="lg" className="border-golden-yellow text-golden-yellow hover:bg-golden-yellow hover:text-dark-green">
                Cadastrar sua Empresa
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Companies Section */}
      <section>
        <h2 className="text-3xl font-semibold text-center mb-8 text-dark-green">Empresas em Destaque</h2>
        {loading ? <LoadingSpinner /> : (
          <div className="grid md:grid-cols-3 gap-6">
            {featuredCompanies.map(company => (
              <CompanyCardSmall key={company.id} company={company} />
            ))}
          </div>
        )}
         {featuredCompanies.length === 0 && !loading && <p className="text-center text-gray-600">Nenhuma empresa em destaque no momento.</p>}
      </section>

      {/* Latest News Section */}
      <section>
        <h2 className="text-3xl font-semibold text-center mb-8 text-dark-green">Notícias e Oportunidades</h2>
         {loading ? <LoadingSpinner /> : (
          <div className="grid md:grid-cols-3 gap-6">
            {latestNews.map(article => (
              <NewsCardSmall key={article.id} article={article} />
            ))}
          </div>
        )}
        {latestNews.length === 0 && !loading && <p className="text-center text-gray-600">Nenhuma notícia recente.</p>}
      </section>

      {/* Call to Action Section */}
      <section className="bg-golden-yellow text-dark-green py-16 rounded-lg shadow-lg">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Junte-se à Nossa Rede!</h2>
          <p className="text-lg mb-8">Conecte-se, colabore e cresça com a maior comunidade empresarial de Angola.</p>
          <Link to="/forum">
            <Button variant="secondary" size="lg">Visite o Fórum Empresarial</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
