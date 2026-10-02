
import { ForumPost } from '../types';

const mockForumPosts: ForumPost[] = [
  {
    id: '1',
    title: 'Desafios de Logística em Luanda: Como Superar?',
    author: 'João Silva (Transportes Veloz)',
    authorAvatar: 'https://picsum.photos/seed/user1/40/40',
    contentSnippet: 'Gostaria de discutir as dificuldades que enfrentamos com a logística na capital e partilhar possíveis soluções...',
    createdAt: '2024-07-12T10:00:00Z',
    repliesCount: 15,
    lastReplyAt: '2024-07-14T15:30:00Z',
    tags: ['logística', 'Luanda', 'transporte'],
  },
  {
    id: '2',
    title: 'Melhores Práticas para Marketing Digital para Startups',
    author: 'Ana Costa (Marketing Criativo)',
    authorAvatar: 'https://picsum.photos/seed/user2/40/40',
    contentSnippet: 'Quais estratégias de marketing digital têm funcionado para vossas startups? Partilhem dicas e ferramentas!',
    createdAt: '2024-07-10T14:20:00Z',
    repliesCount: 22,
    lastReplyAt: '2024-07-15T09:10:00Z',
    tags: ['marketing digital', 'startups', 'crescimento'],
  },
  {
    id: '3',
    title: 'Fontes de Financiamento para Projetos de Energia Renovável',
    author: 'Carlos Mendes (Energia Limpa Angola)',
    authorAvatar: 'https://picsum.photos/seed/user3/40/40',
    contentSnippet: 'Estou à procura de informações sobre investidores ou fundos para projetos de energia solar em Angola.',
    createdAt: '2024-07-08T08:00:00Z',
    repliesCount: 8,
    tags: ['financiamento', 'energia renovável', 'investimento'],
  },
];

export const getForumPosts = async (): Promise<ForumPost[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockForumPosts);
    }, 600);
  });
};

export const createForumPost = async (postData: {title: string, content: string, author: string}): Promise<ForumPost> => {
   return new Promise((resolve) => {
    setTimeout(() => {
      const newPost : ForumPost = {
        id: String(mockForumPosts.length + 1),
        title: postData.title,
        contentSnippet: postData.content.substring(0,100) + "...",
        fullContent: postData.content,
        author: postData.author,
        authorAvatar: 'https://picsum.photos/seed/newuser/40/40',
        createdAt: new Date().toISOString(),
        repliesCount: 0,
        tags: ['novo']
      };
      mockForumPosts.unshift(newPost); // Add to the beginning of the list
      resolve(newPost);
    }, 700);
  });
}
