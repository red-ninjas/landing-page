import ThemeProvider from '@himalaya-ui/core/use-config/theme-provider';

import { useTranslation } from '@/i18n/index';
import { fallbackLng, languages } from '@/i18n/settings';

import { FAQComponent } from '@/components/faq/faq-component';
import { FooterComponent } from '@/components/layout/footer-component';
import { getThemes } from '@/components/theme';
import { getFaq } from '@/lib/rest/get-faq';
import { createSeoTitle } from '@/lib/seo';
import { PortfolioComponent } from 'src/components/case-studies/portfolio-component';
import { PageHeader } from 'src/components/layout/page-header';
import { getPortfolioItems } from 'src/lib/rest/get-portfolio';

export const revalidate = 86400;

export async function generateMetadata({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  const { t } = await useTranslation(lng, 'case-studies');
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
  const items = await getPortfolioItems(lng);
  const { t } = await useTranslation(lng, 'case-studies');

  return (
    <>
      <ThemeProvider themes={themes} themeType="dark">
        <PageHeader
          title={t('title')}
          description={t('description')}
        ></PageHeader>
        <ThemeProvider themes={themes} themeType="light">
          <PortfolioComponent
            showMore={false}
            showTitle={false}
            items={items}
            lng={lng}
          ></PortfolioComponent>
          <FAQComponent items={faqItems} lng={lng}></FAQComponent>
        </ThemeProvider>
        <FooterComponent lng={lng}></FooterComponent>
      </ThemeProvider>
    </>
  );
}
