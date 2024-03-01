import ThemeProvider from '@himalaya-ui/core/use-config/theme-provider';

import { useTranslation } from '@/i18n/index';
import { fallbackLng, languages } from '@/i18n/settings';

import { AboutUsComponent } from 'src/components/about-us/about-us-component';
import { PageHeader } from 'src/components/layout/page-header';
import { getAboutUSPs } from 'src/lib/rest/get-about-usps';
import { FooterComponent } from '@/components/layout/footer-component';
import { getThemes } from '@/components/theme';
import { createSeoTitle } from '@/lib/seo';
import { FactsComponent } from '@/components/about-us/facts';

export const revalidate = 86400;

export async function generateMetadata({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  const { t } = await useTranslation(lng, 'about-us');
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
  const uspItems = await getAboutUSPs(lng);
  const { t } = await useTranslation(lng, 'about-us');

  return (
    <>
      <ThemeProvider themes={themes} themeType="dark">
        <PageHeader
          title={t('title')}
          description={t('description')}
        ></PageHeader>
        <ThemeProvider themes={themes} themeType="light">
          <AboutUsComponent
            items={uspItems}
            title={t('usps.title')}
          ></AboutUsComponent>
          <FactsComponent lng={lng}></FactsComponent>
        </ThemeProvider>
        <FooterComponent lng={lng}></FooterComponent>
      </ThemeProvider>
    </>
  );
}
