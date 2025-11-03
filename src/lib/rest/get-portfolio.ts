import { getPlaiceholder } from 'plaiceholder';

import { gql } from '@apollo/client';
import type {
  CaseStudyItem,
  CaseStudyViewItem,
} from '../types/case-study-item';
import { PlaceholderRender } from '../types/placeholder-render';
import { connect } from './client';
import { cache } from 'react';
import { delay, isBuildTime } from './helper';

export const getCaseStudieSlugs = cache(async (): Promise<string[]> => {
  if (isBuildTime()) {
    await delay(200 + Math.random() * 300);
  }
  const { data } = await connect().query({
    query: gql`
      query CaseStudies {
        caseStudies(where: { isAvaiable: true }) {
          slug
        }
      }
    `,
  });
  return data.caseStudies;
});

export const getPortfolioItems = cache(
  async (
    language: string,
    amount: number | undefined = 9999
  ): Promise<PlaceholderRender<CaseStudyItem>[]> => {
    if (isBuildTime()) {
      await delay(200 + Math.random() * 300);
    }
    const { data } = await connect().query({
      query: gql`
    query CaseStudies {
      caseStudies(locales: ${language}, first: ${amount}, orderBy: order_ASC) {
        createdAt
        updatedAt
        id
        slug
        url
        description
        projectName
        isAvaiable
        picture(forceParentLocale: false, locales:en) {
          url
        }
      }
    }
  `,
    });

    const items: PlaceholderRender<CaseStudyItem>[] = [];

    for (const item of data.caseStudies as CaseStudyItem[]) {
      const fimg = await fetch(item.picture.url);
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

export const getPortfolioItem = cache(
  async (
    language: string,
    slug: string
  ): Promise<PlaceholderRender<CaseStudyViewItem>> => {
    if (isBuildTime()) {
      await delay(200 + Math.random() * 300);
    }
    const { data } = await connect().query({
      query: gql`
    query CaseStudies {
       caseStudy(locales: ${language}, where: { slug: "${slug}"}) {
         createdAt
         updatedAt
         content
         gradientStart {
          hex
         }
          gradientEnd {
           hex
         }
         id
         url
         slug
         description
         projectName
         title
         isAvaiable
         headerPicture(forceParentLocale: false, locales:en) {
           url
         }
       }
     }
   `,
    });

    const fimg = await fetch(data.caseStudy.headerPicture.url);
    const fimgb = Buffer.from(await fimg.arrayBuffer());
    const { base64 } = await getPlaiceholder(fimgb);

    return {
      ...data.caseStudy,
      placeholder: base64,
    };
  }
);
