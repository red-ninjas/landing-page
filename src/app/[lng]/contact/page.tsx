import ThemeProvider from '@himalaya-ui/core/use-config/theme-provider';

import { useTranslation } from '@/i18n/index';
import { fallbackLng, languages } from '@/i18n/settings';

import ContactLayout from '@/components/contact/contact-layout';
import { getThemes } from '@/components/theme';
import { getFaq } from '@/lib/rest/get-faq';
import { createSeoTitle } from '@/lib/seo';

export async function generateMetadata({
  params: { lng },
}: {
  params: {
    lng: string;
  };
}) {
  const { t } = await useTranslation(lng, 'contact');
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

  return (
    <ThemeProvider themes={themes} themeType="dark">
      <ContactLayout lng={lng} faqItems={faqItems}></ContactLayout>
    </ThemeProvider>
  );
}
