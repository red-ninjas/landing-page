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
import { MemberShip } from '@/components/membership';
import { MemberShipAlert } from '@/components/alert';
export const dynamic = 'force-static';
export const revalidate = false;

export async function generateMetadata({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  const { t } = await useTranslation(lng, 'membership');
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
  const uspItems = await getAboutUSPs(lng, 'membership');
  const sericeItems = await getServices(lng, 'membership');

  const faqItems = await getFaq(lng, 'membership');
  const { t } = await useTranslation(lng, 'membership');
  return (
    <>
      <PageHeader
        title={t('title')}
        description={t('description')}
      ></PageHeader>
      <LightThemeWrapper>
        <ServicesComponent
          readMore={false}
          items={sericeItems.slice(0, 1)}
          lng={lng}
        ></ServicesComponent>
        <AboutUsComponent
          items={uspItems}
          title={t('usps.title')}
        ></AboutUsComponent>
        <MemberShipAlert lng={lng}></MemberShipAlert>

        <MemberShip lng={lng}></MemberShip>
        <ServicesComponent
          readMore={false}
          withTopPadding={false}
          items={sericeItems.slice(1, 90)}
          lng={lng}
        ></ServicesComponent>
        <FAQComponent
          title={t('faq.title')}
          items={faqItems}
          lng={lng}
        ></FAQComponent>
      </LightThemeWrapper>
      <FooterComponent lng={lng}></FooterComponent>
    </>
  );
}
