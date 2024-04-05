'use client';

import Grid from '@himalaya-ui/core/grid';
import Text from '@himalaya-ui/core/text';

import PageWidth from '@himalaya-ui/core/page-width';
import Video from '@himalaya-ui/core/video';
import Link from 'next/link';
import Button from '@himalaya-ui/core/button';
import { useTranslation } from '@/i18n/client';
import { FadeinAnimation } from '../animations/fadein-animation';
import { USPItem } from './usp-item';

export const LandingUsps = ({ lng }: { lng: string }) => {
  const { t } = useTranslation(lng, 'home');

  return (
    <PageWidth py={{ xs: 3.3, md: 7.5 }}>
      <section>
        <Grid.Container gap={2} justify="center">
          <Grid justify="center" lg={16} md={20}>
            <FadeinAnimation delay={0} duration={200} onStart={true}>
              <Text
                h1
                m={0}
                font={{ xs: 2.75, md: 4.5 }}
                lineHeight={{ xs: 3, md: 4.625 }}
                style={{ fontWeight: 500, textAlign: 'center' }}
              >
                {t('hero.title')}
              </Text>
            </FadeinAnimation>
          </Grid>

          <Grid justify="center" lg={12} md={20} mt={2.5}>
            <FadeinAnimation delay={0} duration={300} onStart={true}>
              <Text
                font={'1.125rem'}
                lineHeight={{ xs: '1.75rem', md: '2rem' }}
                m={0}
                style={{
                  fontWeight: 400,
                  textAlign: 'center',
                  color: 'var(--color-foreground-800)',
                }}
              >
                {t('hero.description')}
              </Text>
            </FadeinAnimation>
          </Grid>

          <Grid xs={24} mt={{ xs: 2.625, xl: 5.75 }} justify="center">
            <FadeinAnimation delay={0} duration={500} onStart={true}>
              <div className="video-container">
                <Video
                  w={'100%'}
                  src="/assets/landing-video.mp4"
                  controls={true}
                  autoplay={true}
                  muted={true}
                />
              </div>
            </FadeinAnimation>
          </Grid>
        </Grid.Container>

        <Grid.Container gap={2} justify="center">
          <Grid
            xs={24}
            md={18}
            mt={{ xs: 5.75, xl: 11.25 }}
            mb={{ xs: 2.625, xl: 6.25 }}
            justify="center"
          >
            <FadeinAnimation delay={0} duration={700} onStart={true}>
              <Text
                h2
                font={{ xs: 2, md: 3.25 }}
                m={0}
                lineHeight={{ xs: 2.375, md: 3.75 }}
                style={{ fontWeight: 500, textAlign: 'center' }}
              >
                {t('usps.title')}
              </Text>
            </FadeinAnimation>
          </Grid>
        </Grid.Container>
        <Grid.Container gap={4}>
          <Grid xs={24} sm={12} md={6}>
            <USPItem
              title={t('usps.usp_1.title')}
              description={t('usps.usp_1.description')}
            ></USPItem>
          </Grid>
          <Grid xs={24} sm={12} md={6}>
            <USPItem
              title={t('usps.usp_2.title')}
              description={t('usps.usp_2.description')}
            ></USPItem>
          </Grid>
          <Grid xs={24} sm={12} md={6}>
            <USPItem
              title={t('usps.usp_3.title')}
              description={t('usps.usp_3.description')}
            ></USPItem>
          </Grid>
          <Grid xs={24} sm={12} md={6}>
            <USPItem
              title={t('usps.usp_4.title')}
              description={t('usps.usp_4.description')}
            ></USPItem>
          </Grid>
        </Grid.Container>
        <Grid.Container gap={2} justify="center">
          <Grid>
            <Link legacyBehavior href={`/${lng}/services`}>
              <a>
                <Button
                  htmlType={'button'}
                  type="primary"
                  scale={1.2}
                  auto
                  effect
                  pl={1}
                  pr={1}
                  mt={6}
                  style={{
                    textTransform: 'none',
                    fontWeight: '700',
                  }}
                >
                  {t('usps.explore')}
                </Button>
              </a>
            </Link>
          </Grid>
        </Grid.Container>
      </section>

      <style jsx>{`
        .video-container {
          transition: transform 0.7s;
          &:hover {
            transform: scale(1.05);
          }
        }
      `}</style>
    </PageWidth>
  );
};
