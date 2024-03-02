'use client';

import { useTranslation } from '@/i18n/client';
import type { LanguageKeysValues } from '@/lib/types/languages';
import Box from '@himalaya-ui/core/box';
import Button from '@himalaya-ui/core/button';
import Card from '@himalaya-ui/core/card';
import Grid from '@himalaya-ui/core/grid';
import Link from '@himalaya-ui/core/link';
import Text from '@himalaya-ui/core/text';
import useTheme from '@himalaya-ui/core/use-theme';
import classNames from 'classnames';
import Image from 'next/image';
import NextLink from 'next/link';
import Moment from 'react-moment';
import { BlogItem } from 'src/lib/types/blog-item';
import { PlaceholderRender } from 'src/lib/types/placeholder-render';
import { EntryAnimation } from '../animations/entry-animation';

export default ({
  lng,
  item,
  index,
}: {
  lng: LanguageKeysValues;
  item: PlaceholderRender<BlogItem>;
  index: number;
}) => {
  const theme = useTheme();
  const { t } = useTranslation(lng, 'blog');

  return (
    <Card p={0} m={0} borderSize={0} w={'100%'}>
      <Card.Content p={0} m={0}>
        <Grid.Container gap={index == 0 ? 4 : 0}>
          <Grid xs={24} md={index == 0 ? 14 : 24}>
            <Box w={'100%'}>
              <EntryAnimation delay={0} duration={700}>
                <NextLink legacyBehavior href={`/${lng}/blog/` + item.slug}>
                  <a
                    className={classNames('post-img post-img-thumbnail', {
                      'post-img-thumbnail-entry': index == 0,
                    })}
                  >
                    <div className="img-wrapper">
                      <Image
                        quality={90}
                        src={item.coverImage.url}
                        fill={true}
                        placeholder="blur"
                        blurDataURL={item.placeholder}
                        alt={item.title}
                        title={item.title}
                        style={{
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                  </a>
                </NextLink>
              </EntryAnimation>
            </Box>
          </Grid>
          <Grid xs={24} md={index == 0 ? 10 : 24}>
            <Box>
              <EntryAnimation delay={0} duration={1000}>
                <Text
                  font={'0.875rem'}
                  lineHeight={'1.75rem'}
                  p={0}
                  mb={'0.5rem'}
                  mt={'1.5rem'}
                  style={{ color: theme.palette.accents_7 }}
                >
                  <span>{t('author', { name: item.author.name })}</span>
                  <span>&nbsp;-&nbsp;</span>
                  <span>{t('read_time', { minutes: item.readTime })}</span>
                  <span>&nbsp;-&nbsp;</span>
                  <span>
                    <Moment fromNow>{item.createdAt}</Moment>
                  </span>
                </Text>
              </EntryAnimation>
              <EntryAnimation delay={0} duration={1200}>
                <NextLink legacyBehavior href={`/${lng}/blog/` + item.slug}>
                  <Link underline="hover">
                    <Text h2 m={0} font={'1.5rem'} lineHeight={'2rem'}>
                      {item.title}
                    </Text>
                  </Link>
                </NextLink>
              </EntryAnimation>
              <EntryAnimation delay={0} duration={1400}>
                <Text p={0}>{item.description}</Text>
              </EntryAnimation>

              <EntryAnimation delay={0} duration={1500}>
                <NextLink legacyBehavior href={`/${lng}/blog/` + item.slug}>
                  <a>
                    <Button
                      htmlType={'button'}
                      ghost
                      auto
                      type="primary"
                      mt={{ xs: 0, lg: '2rem' }}
                    >
                      {t('read_more')}
                    </Button>
                  </a>
                </NextLink>
              </EntryAnimation>
            </Box>
          </Grid>
        </Grid.Container>
      </Card.Content>
      <style jsx>{`
        .post-img {
          padding-top: 140%;
          width: 100%;
          height: 0px;
          display: inline-block;
          position: relative;
        }
        .post-img-thumbnail {
          padding-top: 70%;
        }
        .post-img-thumbnail-entry {
          padding-top: 60%;
        }
      `}</style>
    </Card>
  );
};
