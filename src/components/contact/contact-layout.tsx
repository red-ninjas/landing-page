'use client';

import { useTranslation } from '@/i18n/client';
import Link from 'next/link';

import { FAQComponent } from '@/components/faq/faq-component';
import { FooterComponent } from '@/components/layout/footer-component';
import Box from '@himalaya-ui/core/box';
import Button from '@himalaya-ui/core/button';
import { PageHeader } from 'src/components/layout/page-header';
import { FaqItem } from '../../lib/types/faq-item';
import { ContactComponent } from './contact-component';
import LightThemeWrapper from '../layout/light-mode-wrapper';

export interface ContactLayoutProps {
  faqItems: FaqItem[];
  lng: string;
}
export default function ContactLayout({ lng, faqItems }: ContactLayoutProps) {
  const { t } = useTranslation(lng, 'contact');

  const addional = (
    <Box style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div>
        <b>{t('contact_us_')}</b>
      </div>

      <Button
        htmlType={'button'}
        type="primary"
        scale={1.2}
        auto
        onClick={() => {
          window?.open('mailto:info@redninjas.dev', '_blank');
        }}
        effect
        style={{
          textTransform: 'none',
          fontWeight: '700',
        }}
      >
        {t('contact_us_by_mail')}
      </Button>

      <Link legacyBehavior href={`https://t.me/redninjas`}>
        <a target="_blank">
          <Button
            htmlType={'button'}
            type="primary"
            scale={1.2}
            auto
            effect
            style={{
              textTransform: 'none',
              fontWeight: '700',
            }}
          >
            {t('contact_us_by_telegram')}
          </Button>
        </a>
      </Link>
    </Box>
  );

  return (
    <>
      <PageHeader title={t('title')} addional={addional}></PageHeader>
      <LightThemeWrapper>
        <ContactComponent lng={lng}></ContactComponent>
        <FAQComponent lng={lng} items={faqItems}></FAQComponent>
      </LightThemeWrapper>
      <FooterComponent lng={lng}></FooterComponent>
    </>
  );
}
