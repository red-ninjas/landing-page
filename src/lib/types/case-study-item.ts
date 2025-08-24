export type CaseStudyItem = {
  projectName: string;
  description: string;
  slug: string;
  isAvaiable: boolean;
  createdAt: string;
  updatedAt: string;
  picture: {
    url: string;
  };
  url?:string;
};

export type CaseStudyViewItem = {
  projectName: string;
  content: string;
  title: string;
  slug: string;
  gradientStart?: { hex: string };
  gradientEnd?: { hex: string };
  description: string;
  createdAt: string;
  updatedAt: string;
  headerPicture: {
    url: string;
  };
};
