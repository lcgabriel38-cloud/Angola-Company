
export enum CompanySize {
  MICRO = "Micro",
  SMALL = "Pequena",
  MEDIUM = "Média",
  LARGE = "Grande",
}

export enum CompanySector {
  TECHNOLOGY = "Tecnologia",
  AGRICULTURE = "Agricultura",
  FINANCE = "Finanças",
  HEALTH = "Saúde",
  EDUCATION = "Educação",
  CONSTRUCTION = "Construção",
  TOURISM = "Turismo",
  COMMERCE = "Comércio",
  INDUSTRY = "Indústria",
  OTHER = "Outro",
}

export interface Company {
  id: string;
  name: string;
  description: string;
  sector: CompanySector;
  size: CompanySize;
  logoUrl?: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  foundedYear?: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl?: string;
  publishDate: string;
  author?: string;
  category?: string; // e.g., "Oportunidades", "Mercado"
}

export interface ForumPost {
  id: string;
  title: string;
  author: string; // User ID or name
  authorAvatar?: string;
  contentSnippet: string;
  fullContent?: string;
  createdAt: string;
  repliesCount: number;
  lastReplyAt?: string;
  tags?: string[];
}

export interface UserProfile {
  id: string;
  companyId?: string; // If user is associated with a company
  email: string;
  name: string;
  role: 'admin' | 'company_representative' | 'user';
}
