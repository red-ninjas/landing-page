'use server';
import { gql } from '@apollo/client';
import { getPlaiceholder } from 'plaiceholder';
import { readingTime } from 'reading-time-estimator';
import { BlogCategory, BlogItem } from '../types/blog-item';
import { PlaceholderRender } from '../types/placeholder-render';
import { connect } from './client';
import { cache } from 'react';

export const getBlogCategories = cache(
  async (language: string): Promise<BlogCategory[]> => {
    const CATEGORIES_QUERY = gql`
    query Categories {
      categories(where: {language: ${language}}) {
        slug, title
      }
  }`;

    const { data } = await connect().query({
      query: CATEGORIES_QUERY,
    });

    return data.categories as BlogCategory[];
  }
);

export const getBlogItems = cache(
  async (language: string): Promise<PlaceholderRender<BlogItem>[]> => {
    const { data } = await connect().query({
      query: gql`
    query Posts {
      posts(orderBy: updatedAt_DESC, where: { category: { language: ${language} } }) {
        createdAt
        description
        id
        slug
        content
        title
        updatedAt
        category {
          title
          slug
        }
        coverImage {
          url
        }
        author {
          id
          name
          picture {
            url
          }
        }
      }
    }
  `,
    });

    const items: PlaceholderRender<BlogItem>[] = [];

    for (const item of data.posts as BlogItem[]) {
      const fimg = await fetch(item.coverImage.url);
      const fimgb = Buffer.from(await fimg.arrayBuffer());
      const { base64 } = await getPlaiceholder(fimgb);

      items.push({
        ...item,
        readTime: readingTime(item.content, 120).minutes,
        placeholder: base64,
      });
    }

    return items;
  }
);

export const getBlogSlugs = cache(
  async (language: string): Promise<string[]> => {
    const { data } = await connect().query({
      query: gql`
      query Posts {
        posts(where: { category: { language: ${language} } }) {
          slug
        }
      }
    `,
    });
    return data.posts;
  }
);

export const getBlogItem = cache(
  async (slug: string): Promise<PlaceholderRender<BlogItem> | undefined> => {
    const { data } = await connect().query({
      query: gql`
      query Post {
        post(where: {slug: "${slug}"}) {
          createdAt
          description
          id
          content
          slug
          title
          updatedAt
          category {
            title
            slug
          }
          coverImage {
            url
          }
          author {
            id
            name
            picture {
              url(transformation: {image: {resize: {height: 50, fit: crop, width: 50}}})
            }
          }
        }
      }
  `,
    });

    const post = data.post;
    if (post === undefined) {
      return;
    }

    const fimg = await fetch(post.coverImage.url);
    const fimgb = Buffer.from(await fimg.arrayBuffer());
    const { base64 } = await getPlaiceholder(fimgb);

    return {
      ...post,
      readTime: readingTime(post.content, 120).minutes,
      placeholder: base64,
    };
  }
);
