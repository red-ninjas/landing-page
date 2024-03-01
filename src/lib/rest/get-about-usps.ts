import { gql } from '@apollo/client';
import { getPlaiceholder } from 'plaiceholder';
import { PlaceholderRender } from '../types/placeholder-render';
import { UspItem } from '../types/usp-item';
import { HYGRAPH_CLIENT } from './client';
import { cache } from 'react';

export const getAboutUSPs = cache(
  async (
    language: string,
    module: 'outsourcing' | 'about' = 'about'
  ): Promise<PlaceholderRender<UspItem>[]> => {
    const { data } = await HYGRAPH_CLIENT.query({
      query: gql`
    query Usps {
      usps(locales: ${language}, orderBy: createdAt_ASC, where: {module: ${module}}) {
        createdAt
        updatedAt
        id
        title
        description
        image(forceParentLocale: false, locales:en) {
          url
        }
      }
    }
  `,
    });

    const items: PlaceholderRender<UspItem>[] = [];
    for (const item of data.usps as UspItem[]) {
      if (item.image) {
        const fimg = await fetch(item.image.url);
        const fimgb = Buffer.from(await fimg.arrayBuffer());
        const { base64 } = await getPlaiceholder(fimgb);

        items.push({
          ...item,
          placeholder: base64,
        });
      } else {
        items.push(item);
      }
    }

    return items;
  }
);
