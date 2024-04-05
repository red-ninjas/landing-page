'use client';
import { useTranslation } from '@/i18n/client';
import Button from '@himalaya-ui/core/button';
import Grid from '@himalaya-ui/core/grid';
import PageWidth from '@himalaya-ui/core/page-width';
import Text from '@himalaya-ui/core/text';
import useMediaQuery from '@himalaya-ui/core/use-media-query';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PlaceholderRender } from 'src/lib/types/placeholder-render';
import type { CaseStudyItem } from '@/lib/types/case-study-item';
import { EntryAnimation } from '../animations/entry-animation';
import { PortfolioItem } from './portfolio-item';
import Section from '@himalaya-ui/core/section';

export const PortfolioComponent = ({
  lng,
  items,
  showMore = true,
  showTitle = true,
}: {
  lng: string;
  items: PlaceholderRender<CaseStudyItem>[];
  showMore?: boolean;
  showTitle?: boolean;
}) => {
  const { t } = useTranslation(lng, 'home');
  const isSM = useMediaQuery('sm', { match: 'up' });

  const [useGrid, setUseGrid] = useState<boolean>(false);

  useEffect(() => {
    setUseGrid(isSM);
  }, [isSM]);

  return (
    <Section pt={{ xs: 5.75, xl: 7.5 }} pb={0}>
      <PageWidth py={0}>
        {showTitle && (
          <Grid.Container>
            <Grid md={16}>
              <EntryAnimation delay={0} duration={500}>
                <Text
                  h2
                  m={0}
                  mb={{ xs: '2rem', xl: 5.75 }}
                  font={{ xs: 2, md: 3.25 }}
                  lineHeight={{ xs: 2.375, md: 3.375 }}
                  style={{ fontWeight: 500 }}
                >
                  {t('portfolio.title')}
                </Text>
              </EntryAnimation>
            </Grid>
          </Grid.Container>
        )}

        <Grid.Container gap={5}>
          <Grid xs={24} md={useGrid ? 12 : 24}>
            <div className="portfolio-list">
              {items.map((item, index) => {
                return (
                  (index % 2 === 0 || useGrid === false) && (
                    <PortfolioItem
                      index={index}
                      key={'item-odd-' + index}
                      item={item}
                      lng={lng}
                    ></PortfolioItem>
                  )
                );
              })}
            </div>
          </Grid>
          {useGrid && (
            <Grid xs={24} md={useGrid ? 12 : 24} justify="center">
              <div className="portfolio-list">
                {items.map((item, index) => {
                  return (
                    index % 2 !== 0 && (
                      <PortfolioItem
                        index={index}
                        item={item}
                        key={'item-even-' + index}
                        lng={lng}
                      ></PortfolioItem>
                    )
                  );
                })}
              </div>
            </Grid>
          )}
        </Grid.Container>

        {showMore && (
          <Grid.Container gap={5} justify="center">
            <Grid xs={24} justify="center">
              <Link legacyBehavior href={`/${lng}/case-studies`}>
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
                    {t('portfolio.explore')}
                  </Button>
                </a>
              </Link>
            </Grid>
          </Grid.Container>
        )}
      </PageWidth>

      <style jsx>{`
        .portfolio-list {
          display: flex;
          flex-direction: column;
          gap: 40px;
          width: 100%;
        }
      `}</style>
    </Section>
  );
};
