export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  media: { type: 'image' | 'video'; url: string }[];
  status: 'active' | 'draft';
  author: string;
  category: string;
  publishedAt: any;
  createdAt: any;
}
