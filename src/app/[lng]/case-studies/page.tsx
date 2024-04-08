import { useTranslation } from '@/i18n/index';
import { fallbackLng, languages } from '@/i18n/settings';

import { FAQComponent } from '@/components/faq/faq-component';
import { FooterComponent } from '@/components/layout/footer-component';
import { getFaq } from '@/lib/rest/get-faq';
import { createSeoTitle } from '@/lib/seo';
import { PortfolioComponent } from 'src/components/case-studies/portfolio-component';
import { PageHeader } from 'src/components/layout/page-header';
import { getPortfolioItems } from 'src/lib/rest/get-portfolio';
import LightThemeWrapper from '@/components/layout/light-mode-wrapper';

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

  const faqItems = await getFaq(lng);
  const items = await getPortfolioItems(lng);
  const { t } = await useTranslation(lng, 'case-studies');

  return (
    <>
      <PageHeader
        title={t('title')}
        description={t('description')}
      ></PageHeader>
      <LightThemeWrapper>
        <PortfolioComponent
          showMore={false}
          showTitle={false}
          items={items}
          lng={lng}
        ></PortfolioComponent>
        <FAQComponent items={faqItems} lng={lng}></FAQComponent>
      </LightThemeWrapper>
      <FooterComponent lng={lng}></FooterComponent>
    </>
  );
}
