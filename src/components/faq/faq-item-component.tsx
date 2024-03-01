'use client';

import { FaqItem } from '@/lib/types/faq-item';
import Grid from '@himalaya-ui/core/grid';
import Text from '@himalaya-ui/core/text';
import useTheme from '@himalaya-ui/core/use-theme';

export const FAQItemComponent = ({ item }: { item: FaqItem }) => {
  const theme = useTheme();

  return (
    <Grid.Container mt={11}>
      <Grid xs={24} lg={20} md={20}>
        <Text
          font={1}
          pt={1.5}
          lineHeight={1.75}
          style={{ color: theme.palette.accents_3 }}
        >
          {item.anwser}
        </Text>
      </Grid>
    </Grid.Container>
  );
};
