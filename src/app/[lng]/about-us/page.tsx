import { useTranslation } from '@/i18n/index';
import { fallbackLng, languages } from '@/i18n/settings';

import { AboutUsComponent } from 'src/components/about-us/about-us-component';
import { PageHeader } from 'src/components/layout/page-header';
import { getAboutUSPs } from 'src/lib/rest/get-about-usps';
import { FooterComponent } from '@/components/layout/footer-component';
import { createSeoTitle } from '@/lib/seo';
import { FactsComponent } from '@/components/about-us/facts';
import LightThemeWrapper from '@/components/layout/light-mode-wrapper';

export const revalidate = 2592000;

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

  const uspItems = await getAboutUSPs(lng);
  const { t } = await useTranslation(lng, 'about-us');

  return (
    <>
      <PageHeader
        title={t('title')}
        description={t('description')}
      ></PageHeader>
      <LightThemeWrapper>
        <AboutUsComponent
          items={uspItems}
          title={t('usps.title')}
        ></AboutUsComponent>
        <FactsComponent lng={lng}></FactsComponent>
      </LightThemeWrapper>
      <FooterComponent lng={lng}></FooterComponent>
    </>
  );
}
