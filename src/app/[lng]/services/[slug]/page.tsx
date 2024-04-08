import { fallbackLng, languages } from '@/i18n/settings';

import { useMDXComponents } from '@/components/mdx/mdx-components';
import ServiceLayout from '@/components/services/service-layout';
import { getSubServiceItem, getSubServiceSlugs } from '@/lib/rest/get-services';
import { createSeoTitle } from '@/lib/seo';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';

export const revalidate = 86400;

export async function generateStaticParams() {
  return await getSubServiceSlugs();
}

export async function generateMetadata({
  params: { lng, slug },
}: {
  params: {
    slug: string;
    lng: string;
  };
}) {
  const item = await getSubServiceItem(lng, slug);
  return {
    title: createSeoTitle(item?.seoTitle),
    openGraph: {
      title: item?.seoTitle,
      siteName: process.env.APP_NAME,
      description: item?.description,
      images: [
        {
          url: item?.image?.url,
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

  const item = await getSubServiceItem(lng, slug);

  if (item === undefined) {
    return notFound();
  }
  const components = useMDXComponents({});

  return (
    <ServiceLayout lng={lng} item={item}>
      <MDXRemote components={components} source={item.content} />
    </ServiceLayout>
  );
}
