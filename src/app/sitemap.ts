import { languages } from '@/i18n/settings';
import { getBlogItems } from '@/lib/rest/get-blog';
import { getPortfolioItems } from '@/lib/rest/get-portfolio';
import { getSubServices } from '@/lib/rest/get-services';
import moment from 'moment';
import { MetadataRoute } from 'next';

export const revalidate = 2592000; // every hour

export interface Url {
  url: string;
  lastModified?: string | Date;
  changeFrequency?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  priority?: number;
}
const defaultUrls: Array<Url> = [
  {
    url: '/',
    priority: 1.0,
  },
  {
    url: '/about-us',
    priority: 0.8,
  },
  {
    url: '/blog',
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    url: '/case-studies',
    priority: 0.8,
  },
  {
    url: '/contact',
    priority: 0.3,
  },
  {
    url: '/outsourcing',
    priority: 0.8,
  },
  {
    url: '/services',
    priority: 0.8,
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteMap: MetadataRoute.Sitemap = [
    {
      url: `https://${process.env.DOMAIN}/`,
      priority: 1.0,
    },
  ];
  for (const lang of languages) {
    for (const url of defaultUrls) {
      siteMap.push({
        url: `https://${process.env.DOMAIN}/${lang}${url.url}`,
        lastModified: url.lastModified ?? new Date(),
        changeFrequency: url.changeFrequency,
        priority: url.priority,
      });
    }

    const posts = await getBlogItems(lang);
    for (const post of posts) {
      siteMap.push({
        url: `https://${process.env.DOMAIN}/${lang}/blog/${post.slug}`,
        lastModified: moment(post.updatedAt).toDate(),
        priority: 0.9,
      });
    }

    const portfolioItems = await getPortfolioItems(lang);
    for (const portfolio of portfolioItems.filter((df) => df.isAvaiable)) {
      siteMap.push({
        url: `https://${process.env.DOMAIN}/${lang}/case-studies/${portfolio.slug}`,
        lastModified: moment(portfolio.updatedAt).toDate(),
        priority: 0.7,
      });
    }

    const subServices = await getSubServices(lang);
    for (const subService of subServices) {
      siteMap.push({
        url: `https://${process.env.DOMAIN}/${lang}/services/${subService.slug}`,
        lastModified: moment(subService.updatedAt).toDate(),
        priority: 0.7,
      });
    }
  }

  return siteMap;
}
