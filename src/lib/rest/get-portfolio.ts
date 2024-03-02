'use server';
import { getPlaiceholder } from 'plaiceholder';

import { gql } from '@apollo/client';
import type {
  CaseStudyItem,
  CaseStudyViewItem,
} from '../types/case-study-item';
import { PlaceholderRender } from '../types/placeholder-render';
import { connect } from './client';
import { cache } from 'react';

export const getCaseStudieSlugs = cache(async (): Promise<string[]> => {
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
    const { data } = await connect().query({
      query: gql`
    query CaseStudies {
      caseStudies(locales: ${language}, first: ${amount}, orderBy: updatedAt_DESC) {
        createdAt
        updatedAt
        id
        slug
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
    const { data } = await connect().query({
      query: gql`
    query CaseStudies {
       caseStudy(locales: ${language}, where: { slug: "${slug}"}) {
         createdAt
         updatedAt
         content
         id
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
