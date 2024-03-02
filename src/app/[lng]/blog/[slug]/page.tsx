import ThemeProvider from '@himalaya-ui/core/use-config/theme-provider';

import { fallbackLng, languages } from '@/i18n/settings';

import BlogLayout from '@/components/blog/blog-layout';
import { createSeoTitle } from '@/lib/seo';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { useMDXComponents } from 'src/components/mdx/mdx-components';
import { getBlogItem, getBlogSlugs } from 'src/lib/rest/get-blog';
import { getThemes } from '../../../../components/theme';
import { Metadata } from 'next';

export const revalidate = 86400;
export const dynamic = 'force-static';
export async function generateStaticParams({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  return await getBlogSlugs(lng);
}

export async function generateMetadata({
  params: { slug },
}: {
  params: {
    slug: string;
  };
}) {
  const item = await getBlogItem(slug);
  return {
    title: createSeoTitle(item?.title),
    authors: {
      name: item?.author,
    },
    openGraph: {
      title: item?.title,
      siteName: process.env.APP_NAME,
      description: item?.description,
      images: [
        {
          url: item?.coverImage.url,
        },
      ],
    },

    description: item?.description,
  } as Metadata;
}

export default async function Page({
  params: { lng, slug },
}: {
  params: {
    lng: string;
    slug: string;
  };
}) {
  if (languages.indexOf(lng) < 0) lng = fallbackLng;

  const themes = getThemes();
  const item = await getBlogItem(slug);

  if (item === undefined) {
    return notFound();
  }

  const components = useMDXComponents({});
  return (
    <ThemeProvider themes={themes} themeType="dark">
      <BlogLayout lng={lng} item={item}>
        <MDXRemote components={components} source={item.content} />
      </BlogLayout>
    </ThemeProvider>
  );
}
