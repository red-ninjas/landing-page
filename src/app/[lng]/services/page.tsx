import ThemeProvider from '@himalaya-ui/core/use-config/theme-provider';

import { useTranslation } from '@/i18n/index';
import { fallbackLng, languages } from '@/i18n/settings';

import { FAQComponent } from 'src/components/faq/faq-component';
import { PageHeader } from 'src/components/layout/page-header';
import { ServicesComponent } from 'src/components/services/services-components';
import { getFaq } from 'src/lib/rest/get-faq';
import { getServices } from 'src/lib/rest/get-services';
import { FooterComponent } from '@/components/layout/footer-component';
import { getThemes } from '@/components/theme';
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
  const { t } = await useTranslation(lng, 'services');
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
  const sericeItems = await getServices(lng);
  const faqItems = await getFaq(lng);

  const { t } = await useTranslation(lng, 'services');
  return (
    <>
      <ThemeProvider themes={themes} themeType="dark">
        <PageHeader
          title={t('title')}
          description={t('description')}
        ></PageHeader>
        <ThemeProvider themes={themes} themeType="light">
          <ServicesComponent items={sericeItems} lng={lng}></ServicesComponent>
          <FAQComponent lng={lng} items={faqItems}></FAQComponent>
        </ThemeProvider>
        <FooterComponent lng={lng}></FooterComponent>
      </ThemeProvider>
    </>
  );
}
