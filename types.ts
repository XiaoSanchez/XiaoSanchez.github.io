export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  links: {
    pdf?: string;
    arxiv?: string;
    code?: string;
    data?: string;
    video?: string;
    website?: string;
  };
  takeaway: string;
  featured?: boolean;
}

export interface NewsItem {
  id: string;
  date: string;
  content: string;
}

export interface ResearchInterest {
  title: string;
  description: string;
}

export type ImageSize = '1K' | '2K' | '4K';
export type AspectRatio = '16:9' | '9:16';