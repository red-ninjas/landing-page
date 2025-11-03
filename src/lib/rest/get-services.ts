import { gql } from '@apollo/client';
import { getPlaiceholder } from 'plaiceholder';
import { PlaceholderRender } from '../types/placeholder-render';
import { ServiceItem, ServiceSubItem } from '../types/service-item';
import { connect } from './client';
import { cache } from 'react';
import { delay, isBuildTime } from './helper';

export const getServices = cache(
  async (
    language: string,
    module: 'service' | 'outsourcing' | 'membership' = 'service'
  ): Promise<PlaceholderRender<ServiceItem>[]> => {
    if (isBuildTime()) {
      await delay(200 + Math.random() * 300);
    }
    const { data } = await connect().query({
      query: gql`
    query Services {
      services(locales: ${language}, orderBy: createdAt_ASC, where: {module: ${module}}) {
        createdAt
        updatedAt
        id
        title
        description
        image(forceParentLocale: false, locales:en) {
          url
        }
        serviceSubItems {
          title
          hasContent
          slug
        }
      }
    }
  `,
    });

    const items: PlaceholderRender<ServiceItem>[] = [];
    for (const item of data.services as ServiceItem[]) {
      const fimg = await fetch(item.image.url);
      const fimgb = Buffer.from(await fimg.arrayBuffer());
      const { base64 } = await getPlaiceholder(fimgb);

      items.push({
        ...item,
        placeholder: base64,
      });
    }

    return items;
  }
);

export const getSubServices = cache(
  async (language: string): Promise<ServiceSubItem[]> => {
    if (isBuildTime()) {
      await delay(200 + Math.random() * 300);
    }
    const { data } = await connect().query({
      query: gql`
    query Services {
      serviceSubItems(locales: ${language}, orderBy: createdAt_ASC, where: {hasContent: true}) {
        createdAt
        updatedAt
        id
        title
        slug
      }
    }
  `,
    });

    return data.serviceSubItems;
  }
);

export const getSubServiceSlugs = cache(async (): Promise<string[]> => {
  if (isBuildTime()) {
    await delay(200 + Math.random() * 300);
  }
  const { data } = await connect().query({
    query: gql`
      query Services {
        serviceSubItems(where: { hasContent: true }) {
          slug
          hasContent
        }
      }
    `,
  });

  return data.serviceSubItems.filter((df) => df.hasContent);
});

export const getSubServiceItem = cache(
  async (
    language: string,
    slug: string
  ): Promise<PlaceholderRender<ServiceSubItem>> => {
    if (isBuildTime()) {
      await delay(200 + Math.random() * 300);
    }
    const { data } = await connect().query({
      query: gql`
    query ServiceSubItem {
      serviceSubItem(locales: ${language}, where: { slug: "${slug}"}) {
         createdAt
         updatedAt
         content
         id
         slug
         title
         description
         seoTitle
         image(forceParentLocale: false, locales:en) {
           url
         }
         video(forceParentLocale: false, locales:en) {
           url
         }
       }
     }
   `,
    });

    if (data.serviceSubItem.image) {
      if (isBuildTime()) {
        await delay(200 + Math.random() * 300);
      }
      const fimg = await fetch(data.serviceSubItem.image.url);
      const fimgb = Buffer.from(await fimg.arrayBuffer());
      const { base64 } = await getPlaiceholder(fimgb);

      return {
        ...data.serviceSubItem,
        placeholder: base64,
      };
    } else {
      return data.serviceSubItem;
    }
  }
);
