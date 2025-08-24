import { PortfolioComponent } from '@/components/case-studies/portfolio-component';
import { FAQComponent } from '@/components/faq/faq-component';
import { LandingUsps } from '@/components/home/landing-usps-component';
import { FooterComponent } from '@/components/layout/footer-component';
import LightThemeWrapper from '@/components/layout/light-mode-wrapper';
import { PartnersComponent } from '@/components/partners/partners-component';
import { ReviewsComponent } from '@/components/reviews/review-component';
import { useTranslation } from '@/i18n/index';
import { fallbackLng, languages } from '@/i18n/settings';
import { getFaq } from '@/lib/rest/get-faq';
import { getPartnerItems } from '@/lib/rest/get-partners';
import { getPortfolioItems } from '@/lib/rest/get-portfolio';
import { getReviews } from '@/lib/rest/get-reviews';

export const revalidate = 2592000;

export async function generateMetadata({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  const { t } = await useTranslation(lng, 'home');
  return {
    title: t('seo.title'),
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
  const items = await getPortfolioItems(lng, 4);
  const partnerItems = await getPartnerItems();
  const faqItems = await getFaq(lng);
  const reviews = await getReviews();

  return (
    <>
      <LandingUsps lng={lng}></LandingUsps>
      <LightThemeWrapper>
        <PortfolioComponent items={items} lng={lng}></PortfolioComponent>
        <PartnersComponent items={partnerItems} lng={lng}></PartnersComponent>
        <FAQComponent items={faqItems} lng={lng}></FAQComponent>
        <ReviewsComponent items={reviews} lng={lng}></ReviewsComponent>
      </LightThemeWrapper>
      <FooterComponent lng={lng}></FooterComponent>
    </>
  );
}
