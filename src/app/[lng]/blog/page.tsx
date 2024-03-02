import ThemeProvider from '@himalaya-ui/core/use-config/theme-provider';

import { useTranslation } from '@/i18n/index';
import { fallbackLng, languages } from '@/i18n/settings';

import { PageHeader } from 'src/components/layout/page-header';
import { FooterComponent } from '@/components/layout/footer-component';
import { getThemes } from '@/components/theme';
import { getBlogCategories, getBlogItems } from 'src/lib/rest/get-blog';
import BlogOverviewComponent from 'src/components/blog/blog-overview.component';
import { createSeoTitle } from '@/lib/seo';

export const revalidate = 86400;
export const dynamic = 'force-static';
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

  const themes = getThemes();
  const { t } = await useTranslation(lng, 'blog');
  const categories = await getBlogCategories(lng);
  const items = await getBlogItems(lng);

  return (
    <>
      <ThemeProvider themes={themes} themeType="dark">
        <PageHeader
          title={t('title')}
          description={t('description')}
        ></PageHeader>
        <ThemeProvider themes={themes} themeType="light">
          <BlogOverviewComponent
            lng={lng}
            items={items}
            categories={categories}
          ></BlogOverviewComponent>
        </ThemeProvider>
        <FooterComponent lng={lng}></FooterComponent>
      </ThemeProvider>
    </>
  );
}
