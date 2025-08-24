import { useTranslation } from '@/i18n/index';
import { fallbackLng, languages } from '@/i18n/settings';

import { AboutUsComponent } from '@/components/about-us/about-us-component';
import { FAQComponent } from '@/components/faq/faq-component';
import { FooterComponent } from '@/components/layout/footer-component';
import { ServicesComponent } from '@/components/services/services-components';
import { getAboutUSPs } from '@/lib/rest/get-about-usps';
import { getFaq } from '@/lib/rest/get-faq';
import { getServices } from '@/lib/rest/get-services';
import { createSeoTitle } from '@/lib/seo';
import { PageHeader } from 'src/components/layout/page-header';
import LightThemeWrapper from '@/components/layout/light-mode-wrapper';
export const revalidate = 2592000;

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

  const faqItems = await getFaq(lng);
  const sericeItems = await getServices(lng, 'outsourcing');
  const { t } = await useTranslation(lng, 'outsourcing');
  const uspItems = await getAboutUSPs(lng, 'outsourcing');
  return (
    <>
      <PageHeader
        title={t('title')}
        description={t('description')}
      ></PageHeader>
      <LightThemeWrapper>
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
      </LightThemeWrapper>
      <FooterComponent lng={lng}></FooterComponent>
    </>
  );
}
