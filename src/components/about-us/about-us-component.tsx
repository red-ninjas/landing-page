'use client';
import { UspItem } from '@/lib/types/usp-item';
import Grid from '@himalaya-ui/core/grid';
import PageWidth from '@himalaya-ui/core/page-width';
import Section from '@himalaya-ui/core/section';
import Text from '@himalaya-ui/core/text';
import { AboutUsItem } from './about-us-item';
import { PlaceholderRender } from '@/lib/types/placeholder-render';

export const AboutUsComponent = ({
  items,
  title,
  align = 'center',
}: {
  items: PlaceholderRender<UspItem>[];
  title: string;
  align?: 'center' | 'flex-start';
}) => {
  return (
    <Section pt={{ xs: 5.75, lg: 7.5 }} pb={{ xs: 5.75, lg: 11.25 }}>
      <PageWidth py={0}>
        <Grid.Container justify={align}>
          <Grid lg={16} md={20}>
            <Text
              h2
              m={0}
              mb={{
                xs: 3.75,
                md: 5.75,
              }}
              font={{ xs: 2, md: 3.25 }}
              lineHeight={{ xs: 2.375, md: 3.75 }}
              style={{
                fontWeight: 500,
                textAlign: align == 'center' ? 'center' : 'left',
              }}
            >
              {title}
            </Text>
          </Grid>
        </Grid.Container>
        <Grid.Container justify={align} gap={4}>
          {items.map((item, index) => {
            return (
              <Grid key={'usp-index-' + index} xs={24} md={8} justify={align}>
                <AboutUsItem item={item} index={index}></AboutUsItem>
              </Grid>
            );
          })}
        </Grid.Container>
      </PageWidth>
    </Section>
  );
};
