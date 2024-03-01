'use client';
import { useTranslation } from '@/i18n/client';
import Button from '@himalaya-ui/core/button';
import Grid from '@himalaya-ui/core/grid';
import PageWidth from '@himalaya-ui/core/page-width';
import useTheme from '@himalaya-ui/core/use-theme';
import Link from 'next/link';
import { LanguageKeysValues } from '@/lib/types/languages';
import { PlaceholderRender } from '@/lib/types/placeholder-render';
import { ServiceItem } from '@/lib/types/service-item';
import ServiceItemComponent from './service-item';
import Section from '@himalaya-ui/core/section';

export const ServicesComponent = ({
  lng,
  items,
  withTopPadding = true,
}: {
  lng: LanguageKeysValues;
  items: PlaceholderRender<ServiceItem>[];
  withTopPadding?: boolean;
}) => {
  const theme = useTheme();
  const { t } = useTranslation(lng, 'services');

  return (
    <Section
      pb={0}
      pt={withTopPadding ? { xs: 5.75, lg: 11.25 } : 0}
      style={{
        background: theme.palette.background,
        color: theme.palette.foreground,
      }}
    >
      <PageWidth py={0}>
        <div className="services">
          {items.map((item, index) => {
            return (
              <ServiceItemComponent
                item={item}
                lng={lng}
                index={index}
                key={'service-' + index}
              ></ServiceItemComponent>
            );
          })}
        </div>

        <Grid.Container gap={5} justify="center">
          <Grid xs={24} justify="center">
            <div style={{ width: '100%', textAlign: 'center' }}>
              <Link legacyBehavior href={`/${lng}/blog`}>
                <a>
                  <Button
                    htmlType={'button'}
                    type="primary"
                    scale={1.2}
                    auto={{ xs: false, md: true }}
                    w="100%"
                    pl={1}
                    pr={1}
                    mt={{ xs: 2.625, md: 5.75 }}
                    style={{
                      textTransform: 'none',
                      fontWeight: '700',
                    }}
                  >
                    {t('explore')}
                  </Button>
                </a>
              </Link>
            </div>
          </Grid>
        </Grid.Container>
      </PageWidth>
      <style jsx>{`
        .services {
          display: flex;
          flex-direction: column;
          gap: 8rem;
        }
      `}</style>
    </Section>
  );
};
