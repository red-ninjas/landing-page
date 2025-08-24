import { fallbackLng, languages } from '@/i18n/settings';

import { getCaseStudieSlugs, getPortfolioItem } from '@/lib/rest/get-portfolio';
import { notFound } from 'next/navigation';
import { createSeoTitle } from '@/lib/seo';
import { Metadata } from 'next';
import PortfolioLayout from '@/components/case-studies/portfolio-layout';
import { useMDXComponents } from '@/components/mdx/mdx-components';
import { MDXRemote } from 'next-mdx-remote/rsc';

export const revalidate = 2592000;

export async function generateStaticParams() {
  return await getCaseStudieSlugs();
}

export async function generateMetadata({
  params: { lng, slug },
}: {
  params: {
    slug: string;
    lng: string;
  };
}) {
  const item = await getPortfolioItem(lng, slug);
  return {
    title: createSeoTitle(item?.title),
    openGraph: {
      title: item?.title,
      siteName: process.env.APP_NAME,
      description: item?.description,
      images: [
        {
          url: item?.headerPicture.url,
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

  const item = await getPortfolioItem(lng, slug);

  if (item === undefined) {
    return notFound();
  }
  const components = useMDXComponents({});

  return (
    <PortfolioLayout lng={lng} item={item}>
      <MDXRemote components={components} source={item.content} />
    </PortfolioLayout>
  );
}
