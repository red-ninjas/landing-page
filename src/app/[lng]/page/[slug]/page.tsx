import ThemeProvider from '@himalaya-ui/core/use-config/theme-provider';

import { fallbackLng, languages } from '@/i18n/settings';

import PageLayout from '@/components/page/page-layout';
import { getPage, getPagesSlugs } from '@/lib/rest/get-page';
import { createSeoTitle } from '@/lib/seo';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { useMDXComponents } from 'src/components/mdx/mdx-components';
import { getThemes } from '../../../../components/theme';

export const revalidate = 86400;

export async function generateStaticParams() {
  return await getPagesSlugs();
}

export async function generateMetadata({
  params: { lng, slug },
}: {
  params: {
    lng: string;
    slug: string;
  };
}) {
  const item = await getPage(lng, slug);

  return {
    title: createSeoTitle(item?.title),
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
  const item = await getPage(lng, slug);

  if (item === undefined) {
    return notFound();
  }

  const components = useMDXComponents({});
  return (
    <ThemeProvider themes={themes} themeType="dark">
      <PageLayout lng={lng} item={item}>
        <MDXRemote components={components} source={item.content} />
      </PageLayout>
    </ThemeProvider>
  );
}
