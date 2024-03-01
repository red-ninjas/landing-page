export type BlogCategory = {
  title: string;
  slug: string;
};

export type BlogItem = {
  readTime: number;
  author: {
    name: string;
    picture: {
      url: string;
    };
  };
  title: string;
  description: string;
  coverImage: {
    url: string;
  };
  content: string;
  category: BlogCategory;
  createdAt: string;
  updatedAt: string;
  slug: string;
};
