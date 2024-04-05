import { useTranslation } from '@/i18n/index';
import { fallbackLng, languages } from '@/i18n/settings';

import { PageHeader } from 'src/components/layout/page-header';
import { FooterComponent } from '@/components/layout/footer-component';
import { getBlogCategories, getBlogItems } from 'src/lib/rest/get-blog';
import BlogOverviewComponent from 'src/components/blog/blog-overview.component';
import { createSeoTitle } from '@/lib/seo';
import LightThemeWrapper from '@/components/layout/light-mode-wrapper';

export const revalidate = 30;

export async function generateMetadata({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  const { t } = await useTranslation(lng, 'blog');
  return {
    title: createSeoTitle(t('seo.title')),
    description: t('seo.description'),
  };
}

export default async function Page({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  if (languages.indexOf(lng) < 0) lng = fallbackLng;

  const { t } = await useTranslation(lng, 'blog');
  const categories = await getBlogCategories(lng);
  const items = await getBlogItems(lng);

  return (
    <>
      <PageHeader
        title={t('title')}
        description={t('description')}
      ></PageHeader>
      <LightThemeWrapper>
        <BlogOverviewComponent
          lng={lng}
          items={items}
          categories={categories}
        ></BlogOverviewComponent>
      </LightThemeWrapper>
      <FooterComponent lng={lng}></FooterComponent>
    </>
  );
}
