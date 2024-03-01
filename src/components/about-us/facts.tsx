'use client';
import { useTranslation } from '@/i18n/client';
import Grid from '@himalaya-ui/core/grid';
import PageWidth from '@himalaya-ui/core/page-width';
import Section from '@himalaya-ui/core/section';
import Text from '@himalaya-ui/core/text';
import useTheme from '@himalaya-ui/core/use-theme';
import { FactItem } from './fact-item';
import Box from '@himalaya-ui/core/box';

export const FactsComponent = ({ lng }: { lng: string }) => {
  const theme = useTheme();
  const { t } = useTranslation(lng, 'about-us');

  return (
    <Section
      pb={{ xs: 5.57, lg: 11.25 }}
      pt={0}
      style={{
        background: theme.palette.background,
        color: theme.palette.foreground,
      }}
    >
      <PageWidth py={0}>
        <Box style={{ borderTop: `1px solid ${theme.palette.border}` }}>
          <Grid.Container mt={{ xs: 5.57, lg: 11.25 }} justify="center">
            <Grid lg={20} xs={24} justify="center">
              <Text
                h2
                mb={5.75}
                m={0}
                font={{ xs: 2, md: 3.25 }}
                lineHeight={{
                  xs: 2.375,
                  md: 3.375,
                }}
                style={{ fontWeight: 500, textAlign: 'center' }}
              >
                {t('facts.title')}
              </Text>
            </Grid>
          </Grid.Container>
          <Grid.Container rowGap={4} gap={2} justify="center">
            <Grid xs={24} md={8} justify="center">
              <FactItem
                title={t('facts.employess')}
                prefix=""
                amount={17}
              ></FactItem>
            </Grid>
            <Grid xs={24} md={8} justify="center">
              <FactItem
                title={t('facts.projects')}
                prefix="+"
                amount={29}
              ></FactItem>
            </Grid>
            <Grid xs={24} md={8} justify="center">
              <FactItem
                title={t('facts.experience')}
                prefix="J"
                amount={10}
              ></FactItem>
            </Grid>
          </Grid.Container>
        </Box>
      </PageWidth>
    </Section>
  );
};
