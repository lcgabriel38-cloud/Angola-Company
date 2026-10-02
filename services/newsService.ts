
import { NewsArticle } from '../types';

const mockNews: NewsArticle[] = [
  {
    id: '1',
    title: 'Angola Lança Novo Programa de Apoio a PMEs',
    summary: 'O governo angolano anunciou um novo fundo destinado a impulsionar o crescimento de pequenas e médias empresas em setores chave.',
    content: 'Detalhes completos sobre o programa, critérios de elegibilidade e como se candidatar...',
    imageUrl: 'https://picsum.photos/seed/news1/600/400',
    publishDate: '2024-07-15',
    author: 'Ministério da Economia',
    category: 'Oportunidades',
  },
  {
    id: '2',
    title: 'Setor Tecnológico em Angola Vê Crescimento Recorde',
    summary: 'Startups de tecnologia em Angola estão atraindo investimento e expandindo suas operações, marcando um período de forte crescimento.',
    content: 'Análise do crescimento, entrevistas com fundadores e perspectivas para o futuro...',
    imageUrl: 'https://picsum.photos/seed/news2/600/400',
    publishDate: '2024-07-10',
    author: 'Revista Negócios Angola',
    category: 'Mercado',
  },
  {
    id: '3',
    title: 'Oportunidade de Exportação para Produtos Agrícolas Angolanos',
    summary: 'Novos acordos comerciais abrem portas para exportadores de café e frutas tropicais.',
    content: 'Informações sobre os mercados de destino, requisitos e apoios disponíveis.',
    imageUrl: 'https://picsum.photos/seed/news3/600/400',
    publishDate: '2024-07-05',
    category: 'Oportunidades',
  },
];

export const getNewsArticles = async (): Promise<NewsArticle[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockNews);
    }, 400);
  });
};

export const getNewsArticleById = async (id: string): Promise<NewsArticle | undefined> => {
   return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockNews.find(n => n.id === id));
    }, 200);
  });
}
