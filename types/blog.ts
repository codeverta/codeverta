export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  slug: string;
}

export interface CreateBlogPost {
  title: string;
  description: string;
  content: string;
  tags: string[];
  imageUrl?: string;
  published: boolean;
}