'use client';
import { useTranslation } from '@/i18n/client';
import type { PartnershipItem } from '@/lib/types/partnership-item';
import Box from '@himalaya-ui/core/box';
import Carousel from '@himalaya-ui/core/carousel';
import Grid from '@himalaya-ui/core/grid';
import PageWidth from '@himalaya-ui/core/page-width';
import Section from '@himalaya-ui/core/section';
import Text from '@himalaya-ui/core/text';
import useTheme from '@himalaya-ui/core/use-theme';
import { PartnerItem } from './partner-item';
import { PlaceholderRender } from '@/lib/types/placeholder-render';

export const PartnersComponent = ({
  lng,
  items,
}: {
  lng: string;
  items: PlaceholderRender<PartnershipItem>[];
}) => {
  const theme = useTheme();
  const { t } = useTranslation(lng, 'home');
  return (
    <Section
      pt={{ xs: 5.75, lg: 7.5 }}
      pb={{ xs: '0', xl: '1.5rem' }}
      style={{
        background: theme.palette.background,
        color: theme.palette.foreground,
      }}
    >
      <PageWidth py={0}>
        <Grid.Container justify="center">
          <Grid lg={16} md={20}>
            <Box mx="auto">
              <Text
                m={0}
                font={0.75}
                mb={1.5}
                lineHeight={1.15}
                style={{
                  fontWeight: 400,
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  color: theme.palette.accents_1,
                }}
              >
                {t('partners.title')}
              </Text>
            </Box>
          </Grid>
        </Grid.Container>

        <Carousel
          options={{
            perPage: 5,
            pagination: false,
            arrows: false,
            autoplay: true,
            pauseOnHover: true,
            gap: '1rem',
            breakpoints: {
              480: {
                perPage: 3,
              },
              640: {
                perPage: 5,
              },
              960: {
                perPage: 4,
              },
              1100: {
                perPage: 5,
              },
              1200: {
                perPage: 5,
              },
            },
          }}
        >
          {items.map((item, index) => {
            return (
              <Carousel.Item key={'partner-' + index}>
                <PartnerItem item={item}></PartnerItem>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </PageWidth>
    </Section>
  );
};
