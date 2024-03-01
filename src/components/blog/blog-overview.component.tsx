'use client';
import { useTranslation } from '@/i18n/client';
import { LanguageKeysValues } from '@/lib/types/languages';
import { PlaceholderRender } from '@/lib/types/placeholder-render';
import Section from '@himalaya-ui/core/section';
import Grid from '@himalaya-ui/core/grid';
import PageWidth from '@himalaya-ui/core/page-width';
import Tabs from '@himalaya-ui/core/tabs';
import useTheme from '@himalaya-ui/core/use-theme';
import { useState } from 'react';
import { BlogCategory, BlogItem } from 'src/lib/types/blog-item';
import BlogItemComponent from './blog-item.component';

export default ({
  lng,
  items,
  categories,
}: {
  lng: LanguageKeysValues;
  items: PlaceholderRender<BlogItem>[];
  categories: BlogCategory[];
}) => {
  const theme = useTheme();
  const { t } = useTranslation(lng, 'blog');
  const [value, setValue] = useState<string>('all');
  const changeHandler = (val) => setValue(val);

  const filtered = items.filter(
    (item) => value === 'all' || value === item.category.slug
  );

  return (
    <Section
      pt={{ xs: 5.75, xl: 7.5 }}
      pb={{ xs: 5.75, lg: 11.25 }}
      style={{
        background: theme.palette.background,
        color: theme.palette.foreground,
      }}
    >
      <PageWidth py={0}>
        <Tabs
          mb={{ xs: 2.625, xl: 3.5 }}
          onChange={changeHandler}
          leftSpace={0}
          gap={'30px'}
          initialValue="all"
        >
          <Tabs.Item
            pl={0}
            pr={0}
            font={'1.25rem'}
            style={{ fontWeight: 500 }}
            label={t('all')}
            value={'all'}
          ></Tabs.Item>

          {categories.map((category, index) => {
            return (
              <Tabs.Item
                key={'blog-category-' + index}
                pl={0}
                pr={0}
                font={'1.25rem'}
                style={{ fontWeight: 500 }}
                label={category.title}
                value={category.slug}
              ></Tabs.Item>
            );
          })}
        </Tabs>

        <Grid.Container gap={4} rowGap={8}>
          {filtered.map((item, index) => {
            return (
              <Grid
                key={'filter-item-' + index}
                xs={index === 0 ? 24 : 24}
                sm={index === 0 ? 24 : 16}
                md={index === 0 ? 24 : 8}
              >
                <BlogItemComponent
                  index={index}
                  item={item}
                  lng={lng}
                ></BlogItemComponent>
              </Grid>
            );
          })}
        </Grid.Container>
      </PageWidth>
    </Section>
  );
};
