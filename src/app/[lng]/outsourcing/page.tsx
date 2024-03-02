import ThemeProvider from '@himalaya-ui/core/use-config/theme-provider';

import { useTranslation } from '@/i18n/index';
import { fallbackLng, languages } from '@/i18n/settings';

import { AboutUsComponent } from '@/components/about-us/about-us-component';
import { FAQComponent } from '@/components/faq/faq-component';
import { FooterComponent } from '@/components/layout/footer-component';
import { ServicesComponent } from '@/components/services/services-components';
import { getThemes } from '@/components/theme';
import { getAboutUSPs } from '@/lib/rest/get-about-usps';
import { getFaq } from '@/lib/rest/get-faq';
import { getServices } from '@/lib/rest/get-services';
import { createSeoTitle } from '@/lib/seo';
import { PageHeader } from 'src/components/layout/page-header';
export const revalidate = 86400;
export const dynamic = 'force-static';

export async function generateMetadata({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  const { t } = await useTranslation(lng, 'outsourcing');
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
  const faqItems = await getFaq(lng);
  const sericeItems = await getServices(lng, 'outsourcing');
  const { t } = await useTranslation(lng, 'outsourcing');
  const uspItems = await getAboutUSPs(lng, 'outsourcing');
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
            align="flex-start"
            title={t('usps.title')}
          ></AboutUsComponent>
          <ServicesComponent
            withTopPadding={false}
            items={sericeItems}
            lng={lng}
          ></ServicesComponent>
          <FAQComponent items={faqItems} lng={lng}></FAQComponent>
        </ThemeProvider>
        <FooterComponent lng={lng}></FooterComponent>
      </ThemeProvider>
    </>
  );
}
