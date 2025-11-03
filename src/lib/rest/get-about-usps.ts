import { gql } from '@apollo/client';
import { getPlaiceholder } from 'plaiceholder';
import { PlaceholderRender } from '../types/placeholder-render';
import { UspItem } from '../types/usp-item';
import { connect } from './client';
import { cache } from 'react';
import { delay, isBuildTime } from './helper';

export const getAboutUSPs = cache(
  async (
    language: string,
    module: 'outsourcing' | 'about' | 'membership' = 'about'
  ): Promise<PlaceholderRender<UspItem>[]> => {
    if (isBuildTime()) {
      await delay(200 + Math.random() * 300);
    }
    const { data } = await connect().query({
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
        if (isBuildTime()) {
          await delay(200 + Math.random() * 300);
        }
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
