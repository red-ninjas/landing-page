import { PortfolioComponent } from '@/components/case-studies/portfolio-component';
import { FAQComponent } from '@/components/faq/faq-component';
import { LandingUsps } from '@/components/home/landing-usps-component';
import { FooterComponent } from '@/components/layout/footer-component';
import { PartnersComponent } from '@/components/partners/partners-component';
import { ReviewsComponent } from '@/components/reviews/review-component';
import { getThemes } from '@/components/theme';
import { useTranslation } from '@/i18n/index';
import { fallbackLng, languages } from '@/i18n/settings';
import { getFaq } from '@/lib/rest/get-faq';
import { getPartnerItems } from '@/lib/rest/get-partners';
import { getPortfolioItems } from '@/lib/rest/get-portfolio';
import { getReviews } from '@/lib/rest/get-reviews';
import ThemeProvider from '@himalaya-ui/core/use-config/theme-provider';

export const revalidate = 86400;
export const dynamic = 'force-static';

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
  const themes = getThemes();
  const faqItems = await getFaq(lng);
  const reviews = await getReviews();
  return (
    <>
      <ThemeProvider themes={themes} themeType="dark">
        <LandingUsps lng={lng}></LandingUsps>
        <ThemeProvider themes={themes} themeType="light">
          <PortfolioComponent items={items} lng={lng}></PortfolioComponent>
          <PartnersComponent items={partnerItems} lng={lng}></PartnersComponent>
          <FAQComponent items={faqItems} lng={lng}></FAQComponent>
          <ReviewsComponent items={reviews} lng={lng}></ReviewsComponent>
        </ThemeProvider>
        <FooterComponent lng={lng}></FooterComponent>
      </ThemeProvider>
    </>
  );
}
