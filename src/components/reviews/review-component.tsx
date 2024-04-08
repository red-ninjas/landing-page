'use client';
import { useTranslation } from '@/i18n/client';
import Box from '@himalaya-ui/core/box';
import Carousel from '@himalaya-ui/core/carousel';
import Grid from '@himalaya-ui/core/grid';
import PageWidth from '@himalaya-ui/core/page-width';
import Section from '@himalaya-ui/core/section';
import Text from '@himalaya-ui/core/text';
import { useConfig } from '@himalaya-ui/core/use-config';

import { EntryAnimation } from '../animations/entry-animation';
import { ReviewItem } from './review-item';

export const ReviewsComponent = ({
  lng,
  items,
}: {
  lng: string;
  items: any[];
}) => {
  const { layout } = useConfig();
  const { t } = useTranslation(lng, 'home');

  return (
    <Section pb={{ xs: 5.57, lg: 11.25 }} pt={0}>
      <PageWidth py={0}>
        <Box style={{ borderTop: `1px solid var(--color-border-1000)` }}>
          <Grid.Container mt={11}>
            <Grid justify="center" lg={16} md={20}>
              <EntryAnimation delay={0} duration={500}>
                <Text
                  p={0}
                  m={0}
                  mb={5.75}
                  font={{ xs: 2, md: 3.25 }}
                  lineHeight={{ xs: 2.375, md: 3.375 }}
                  style={{ fontWeight: 500 }}
                >
                  {t('reviews.title')}
                </Text>
              </EntryAnimation>
            </Grid>
          </Grid.Container>
        </Box>
      </PageWidth>
      <Box px={layout.pageMargin}>
        <Carousel
          options={{
            pagination: true,
            arrows: false,
            autoplay: false,
            pauseOnHover: true,
            gap: '2rem',
            breakpoints: {
              480: {
                fixedWidth: '100%',
              },
              9999: {
                fixedWidth: '400px',
              },
            },
          }}
        >
          {items.map((item, index) => (
            <Carousel.Item key={'review-' + index}>
              <ReviewItem item={item} lng={lng}></ReviewItem>
            </Carousel.Item>
          ))}
        </Carousel>
      </Box>
    </Section>
  );
};
