'use client';

import { useTranslation } from '@/i18n/client';
import PageWidth from '@himalaya-ui/core/page-width/page-width';
import Section from '@himalaya-ui/core/section/section';

export const MemberShip = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng, 'membership');

  return (
    <Section pt={0} pb={{ xs: 5.75, lg: 11.25 }}>
      <PageWidth py={0}>
        <div className="pricing-card">
          <div className="pricing-content">
            <div className="pricing-left">
              <h2>{t('teaser.title')}</h2>
              <p>{t('teaser.subtitle')}</p>
              <hr />
              <ul>
                <li>✅ {t('features.cancelAnytime')}</li>
                <li>✅ {t('features.billingOptions')}</li>
                <li>✅ {t('features.noHiddenCosts')}</li>
                <li>✅ {t('features.paymentMethods')}</li>
              </ul>
            </div>

            <div className="pricing-right">
              <p className="small">{t('price.label')}</p>
              <h3>
                {t('price.amount')} <span>{t('price.currency')}</span>
              </h3>
              <a
                href="mailto:info@redninjas.dev"
                target="_blank"
                className="button"
              >
                {t('cta')}
              </a>
              <p className="guarantee">
                {t('guarantee.text')}
                <br />
                <a href={`/${lng}/page/terms`}>{t('guarantee.link')}</a>
              </p>
            </div>
          </div>
        </div>

        <style jsx>{`
          .pricing-card {
            background: black;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            color: white;
            width: 100%;
            overflow: hidden;
          }

          .pricing-content {
            display: flex;
            flex-wrap: wrap;
          }

          .pricing-left {
            flex: 2;
            padding: 2rem;
            border-right: 1px solid rgba(255, 255, 255, 0.1);
          }

          .pricing-left h2 {
            font-size: 1.6rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
          }

          .pricing-left p {
            color: #cdd3de;
            margin-bottom: 1.2rem;
          }

          .pricing-left hr {
            border: none;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
            margin-bottom: 1.2rem;
          }

          .pricing-left ul {
            list-style: none;
            padding: 0;
            margin: 0;
            display: grid;
            grid-template-columns: repeat(2, minmax(200px, 1fr));
            gap: 0.6rem 1rem;
            color: #dfe4ea;
            font-size: 0.95rem;

            li {
              line-height: 22px;
              font-size: 13px;
              opacity: 0.9;
              &:before {
                content: '';
              }
            }
          }

          .pricing-right {
            flex: 1;
            background: #1d1d1d;
            padding: 2rem;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .pricing-right .small {
            color: #aeb6c2;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
          }

          .pricing-right h3 {
            font-size: 2rem;
            font-weight: 800;
            margin: 0.3rem 0;
          }

          .pricing-right a {
            color: #fff;
            text-decoration: underline;
          }

          .pricing-right h3 span {
            font-size: 0.9rem;
            font-weight: 500;
            color: #aeb6c2;
          }

          .pricing-right .button {
            background: #fff;
            color: black;
            border: none;
            border-radius: 6px;
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
            font-weight: 600;
            margin-top: 0.8rem;
            cursor: pointer;
            transition: background 0.2s ease;
            text-decoration: none !important;
          }

          .pricing-right .button:hover {
            background: #d4d4d4ff;
          }

          .pricing-right .guarantee {
            font-size: 0.8rem;
            color: #aeb6c2;
            margin-top: 0.8rem;
          }
          @media (max-width: 640px) {
            .pricing-content {
              flex-direction: column;
            }

            .pricing-left {
              border-right: none;
              border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
          }
        `}</style>
      </PageWidth>
    </Section>
  );
};
