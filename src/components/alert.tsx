'use client';

import PageWidth from '@himalaya-ui/core/page-width/page-width';
import Section from '@himalaya-ui/core/section/section';
import Alert from '@himalaya-ui/core/icons/alertTriangleFill';
import { useTranslation } from '@/i18n/client';

export const MemberShipAlert = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng, 'membership');

  return (
    <Section pb={{ xs: 5.57 }} pt={0}>
      <PageWidth py={0}>
        <div className="alert">
          <Alert></Alert>
          <div className="alert-content">
            <div className="alert-title">{t('alert.title')}</div>
            <div className="alert-text">{t('alert.text')}</div>
          </div>
        </div>

        <style jsx>{`
          .alert {
            background: #fff3d0;
            color: #ff9b00;
            border-radius: 10px;
            padding: 25px 15px;
            font-size: 15px;
            display: flex;
            flex-direction: row;
            gap: 12px;
          }
          .alert-content {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }
          .alert-title {
            font-weight: bold;
          }
        `}</style>
      </PageWidth>
    </Section>
  );
};
