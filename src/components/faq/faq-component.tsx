'use client';
import { useTranslation } from '@/i18n/client';
import { FaqItem } from '@/lib/types/faq-item';
import Box from '@himalaya-ui/core/box';
import Collapse from '@himalaya-ui/core/collapse';
import Grid from '@himalaya-ui/core/grid';
import PageWidth from '@himalaya-ui/core/page-width';
import Section from '@himalaya-ui/core/section';
import Text from '@himalaya-ui/core/text';
import useTheme from '@himalaya-ui/core/use-theme';
import { EntryAnimation } from '../animations/entry-animation';
import { FAQItemComponent } from './faq-item-component';

export const FAQComponent = ({
  lng,
  items,
}: {
  lng: string;
  items: FaqItem[];
}) => {
  const theme = useTheme();
  const { t } = useTranslation(lng, 'home');

  return (
    <Section
      pb={{ xs: 5.57, lg: 11.25 }}
      pt={{ xs: 5.57, lg: 11.25 }}
      style={{
        background: theme.palette.background,
        color: theme.palette.foreground,
      }}
    >
      <PageWidth py={0}>
        <Box style={{ borderTop: `1px solid ${theme.palette.border}` }}>
          <Grid.Container mt={{ xs: 5.57, lg: 11.25 }}>
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
                  {t('faq.title')}
                </Text>
              </EntryAnimation>
            </Grid>
            <Grid xs={24}>
              <Collapse.Group
                pl={0}
                style={{
                  gap: '48px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {items.map((item, index) => {
                  return (
                    <Collapse
                      initialVisible={index == 0}
                      style={{ border: 0 }}
                      title={item.question}
                      key={'faq-' + index}
                      p={0}
                    >
                      <FAQItemComponent item={item}></FAQItemComponent>
                    </Collapse>
                  );
                })}
              </Collapse.Group>
            </Grid>
          </Grid.Container>
        </Box>
      </PageWidth>
    </Section>
  );
};
