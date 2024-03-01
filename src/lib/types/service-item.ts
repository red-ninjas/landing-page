export type ServiceSubItem = {
  title: string;
  hasContent: boolean;
  slug?: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  description: string;
  seoTitle: string;
  image?: {
    url: string;
  };
  video?: {
    url: string;
  };
};
export type ServiceItem = {
  title: string;
  image: { url: string };
  description: string;
  serviceSubItems: ServiceSubItem[];
};
