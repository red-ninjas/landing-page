import { gql } from '@apollo/client';
import { PageItem } from '../types/page-item';
import { HYGRAPH_CLIENT } from './client';

export const getPage = async (
  language: string,
  slug: string
): Promise<PageItem | undefined> => {
  const { data } = await HYGRAPH_CLIENT.query({
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
};

export const getPagesSlugs = async (): Promise<string[]> => {
  const { data } = await HYGRAPH_CLIENT.query({
    query: gql`
      query Pages {
        pages {
          slug
        }
      }
    `,
  });
  return data.pages;
};
