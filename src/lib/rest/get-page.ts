import { gql } from '@apollo/client';
import { PageItem } from '../types/page-item';
import { connect } from './client';
import { cache } from 'react';
import { isBuildTime, delay } from './helper';
export const getPage = cache(
  async (language: string, slug: string): Promise<PageItem | undefined> => {
    if (isBuildTime()) {
      await delay(200 + Math.random() * 300);
    }

    const { data } = await connect().query({
      query: gql`
      query Pages {
        page(locales: ${language}, where: { slug: "${slug}"}) {
          createdAt
          content
          slug
          title
          updatedAt
        }
      }`,
    });

    const post = data.page;
    if (post === undefined) {
      return;
    }

    return post;
  }
);

export const getPagesSlugs = cache(async (): Promise<string[]> => {
  if (isBuildTime()) {
    await delay(200 + Math.random() * 300);
  }
  const { data } = await connect().query({
    query: gql`
      query Pages {
        pages {
          slug
        }
      }
    `,
  });
  return data.pages;
});
