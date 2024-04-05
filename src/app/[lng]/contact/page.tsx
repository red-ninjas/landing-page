import { useTranslation } from '@/i18n/index';
import { fallbackLng, languages } from '@/i18n/settings';

import ContactLayout from '@/components/contact/contact-layout';
import { getFaq } from '@/lib/rest/get-faq';
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

  const faqItems = await getFaq(lng);

  return <ContactLayout lng={lng} faqItems={faqItems}></ContactLayout>;
}
