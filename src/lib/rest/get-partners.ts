'use server';
import { getPlaiceholder } from 'plaiceholder';
import type { PartnershipItem } from '../types/partnership-item';
import { PlaceholderRender } from '../types/placeholder-render';
import { gql } from '@apollo/client';
import { connect } from './client';
import { cache } from 'react';

export const getPartnerItems = cache(
  async (): Promise<PlaceholderRender<PartnershipItem>[]> => {
    const { data } = await connect().query({
      query: gql`
        query Posts {
          partners(orderBy: updatedAt_DESC) {
            title
            image {
              url
            }
          }
        }
      `,
    });

    const items: PlaceholderRender<PartnershipItem>[] = [];

    for (const item of data.partners as PartnershipItem[]) {
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
