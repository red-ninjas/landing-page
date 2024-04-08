'use client';

import { LanguageKeysValues } from '@/lib/types/languages';
import { ServiceItem } from '@/lib/types/service-item';
import Grid from '@himalaya-ui/core/grid';
import Link from '@himalaya-ui/core/link';
import Text from '@himalaya-ui/core/text';
import Image from 'next/image';
import NextLink from 'next/link';
import { PlaceholderRender } from 'src/lib/types/placeholder-render';
import { EntryAnimation } from '../animations/entry-animation';

export default ({
  index,
  item,
  lng,
}: {
  index: number;
  item: PlaceholderRender<ServiceItem>;
  lng: LanguageKeysValues;
}) => {
  return (
    <>
      <Grid.Container justify="space-between">
        <Grid
          xs={24}
          lg={10}
          md={10}
          mb={{ xs: 2, md: 0 }}
          xl={10}
          order={{ xs: 0, md: index % 2 === 1 ? 1 : 0 }}
        >
          <EntryAnimation delay={0} duration={700}>
            <div className="service-img">
              <div className="img-wrapper">
                <Image
                  src={item.image.url}
                  fill={true}
                  placeholder="blur"
                  blurDataURL={item.placeholder}
                  alt={item.title}
                  title={item.title}
                  quality={90}
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </EntryAnimation>
        </Grid>
        <Grid
          xs={24}
          lg={12}
          md={12}
          xl={12}
          justify="flex-end"
          alignItems="center"
        >
          <div className="service-details">
            <Text
              h2
              mb={{ xs: '1rem', md: '1.5rem' }}
              m={0}
              font={{ xs: 2, md: 3.25 }}
              lineHeight={{ xs: 2.375, md: 3.75 }}
              style={{ fontWeight: 500 }}
            >
              {item.title}
            </Text>

            <Text
              lineHeight={'2rem'}
              m={0}
              style={{ fontWeight: 400, color: 'var(--color-foreground-600)' }}
            >
              <span
                dangerouslySetInnerHTML={{ __html: item.description }}
              ></span>
            </Text>
            <ul className="service-sub-list">
              {item.serviceSubItems.map((listItem, index) => {
                return (
                  <li key={'service-' + index}>
                    {listItem.hasContent && listItem.slug ? (
                      <NextLink
                        passHref
                        legacyBehavior
                        href={`/${lng}/services/${listItem.slug}`}
                      >
                        <Link underline>
                          <Text
                            h4
                            p={0}
                            m={0}
                            lineHeight={2}
                            font={1.25}
                            style={{ fontWeight: 600 }}
                          >
                            {listItem.title}
                          </Text>
                        </Link>
                      </NextLink>
                    ) : (
                      <Text
                        h4
                        p={0}
                        m={0}
                        lineHeight={2}
                        font={1.25}
                        style={{ fontWeight: 600 }}
                      >
                        {listItem.title}
                      </Text>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </Grid>
      </Grid.Container>

      <style jsx>{`
        .service-details {
          display: flex;
          flex-direction: column;
        }

        .service-img {
          padding-top: 125%;
          width: 100%;
          height: 0px;
          display: inline-block;
          position: relative;
        }
      `}</style>
    </>
  );
};
