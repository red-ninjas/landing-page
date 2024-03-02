'use client';

import Grid from '@himalaya-ui/core/grid';
import Text from '@himalaya-ui/core/text';
import Video from '@himalaya-ui/core/video';

import Box from '@himalaya-ui/core/box';
import ArrowLeft from '@himalaya-ui/core/icons/arrowLeft';
import PageWidth from '@himalaya-ui/core/page-width';
import Image from 'next/image';
import NextLink from 'next/link';
import { useContext } from 'react';
import { FadeinAnimation } from '../animations/fadein-animation';
import { ClientProviderContext } from '../client-provider';

export interface PageHeaderProps {
  title: string;
  description?: string;
  align?: 'flex-start' | 'center';
  image?: string;
  placeholder?: string;
  addional?: React.ReactNode | string;
  routeBack?: string;
  routeBackTitle?: string;
  subTitle?: string;
  video?: string;
}

export const PageHeader = ({
  title,
  image,
  description,
  addional,
  routeBack,
  placeholder,
  routeBackTitle,
  video,
  subTitle,
  align = 'flex-start',
}: PageHeaderProps) => {
  const { background } = useContext(ClientProviderContext);

  return (
    <div
      style={{
        background: background
          ? `linear-gradient(${background.from}, ${background.to})`
          : undefined,
      }}
    >
      {routeBack && (
        <Box
          py={0.7}
          style={{
            borderBottom: '1px solid hsla(0,0%,100%,.2)',
            borderTop: '1px solid hsla(0,0%,100%,.2)',
          }}
        >
          <PageWidth py={0}>
            <NextLink legacyBehavior href={routeBack}>
              <a>
                <Text
                  m={0}
                  font={1}
                  lineHeight={'1.75rem'}
                  style={{
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <ArrowLeft />
                  <span>{routeBackTitle}</span>
                </Text>
              </a>
            </NextLink>
          </PageWidth>
        </Box>
      )}
      <PageWidth py={0}>
        <Box pt={{ xs: 3.75, xl: 7.5 }} pb={{ xs: 5.75, xl: 11.25 }}>
          <Grid.Container gap={2} justify={align}>
            {subTitle && (
              <Grid justify={align} lg={18} md={20}>
                <FadeinAnimation delay={0} duration={500} onStart={true}>
                  <Text
                    h4
                    m={0}
                    font={'1.5rem'}
                    lineHeight={'2rem'}
                    style={{ fontWeight: 500 }}
                  >
                    {subTitle}
                  </Text>
                </FadeinAnimation>
              </Grid>
            )}

            <Grid justify={align} lg={18} md={20}>
              <FadeinAnimation delay={0} duration={500} onStart={true}>
                <Text
                  h1
                  m={0}
                  font={{ xs: 2.75, md: 4.5 }}
                  lineHeight={{ xs: 3, md: 4.625 }}
                  style={{ fontWeight: 500 }}
                >
                  {title}
                </Text>
              </FadeinAnimation>
            </Grid>

            {description && (
              <Grid justify={align} lg={14} md={20} mt={2.5}>
                <FadeinAnimation delay={0} duration={500} onStart={true}>
                  <Text font={'1.125rem'} lineHeight={'1.75rem'} m={0}>
                    <span
                      dangerouslySetInnerHTML={{ __html: description }}
                    ></span>
                  </Text>
                </FadeinAnimation>
              </Grid>
            )}
            {image && placeholder && (
              <Grid justify={align} lg={24} md={24} mt={2.5}>
                <Box style={{ width: '100%' }}>
                  <div className="header-thumbnail">
                    <div className="img-wrapper">
                      <Image
                        quality={90}
                        src={image}
                        fill={true}
                        placeholder="blur"
                        blurDataURL={placeholder}
                        alt={title}
                        title={title}
                        style={{
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                  </div>
                </Box>
              </Grid>
            )}

            {video && (
              <Grid justify={align} lg={24} md={24} mt={2.5}>
                <Box style={{ width: '100%' }}>
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
                </Box>
              </Grid>
            )}

            {addional && (
              <Grid justify={align} lg={14} md={20} mt={2.5}>
                <FadeinAnimation delay={0} duration={500} onStart={true}>
                  {addional}
                </FadeinAnimation>
              </Grid>
            )}
          </Grid.Container>

          <style jsx>{`
            .header-thumbnail {
              padding-top: 60%;
              width: 100%;
              height: 0px;
              display: inline-block;
              position: relative;
            }
            .arrow {
              --tw-skew-y: 0;
              --tw-skew-x: 0;
              --tw-translate-x: 0;
              --tw-translate-y: 0;
              --tw-rotate: 0;
              --tw-scale-y: 1;
              --tw-scale-x: 1;

              transition-property:
                color,
                background-color,
                border-color,
                fill,
                stroke,
                opacity,
                box-shadow,
                transform,
                filter,
                -webkit-text-decoration-color,
                -webkit-backdrop-filter;
              transition-property: color, background-color, border-color,
                text-decoration-color, fill, stroke, opacity, box-shadow,
                transform, filter, backdrop-filter;
              transition-property:
                color,
                background-color,
                border-color,
                text-decoration-color,
                fill,
                stroke,
                opacity,
                box-shadow,
                transform,
                filter,
                backdrop-filter,
                -webkit-text-decoration-color,
                -webkit-backdrop-filter;
              transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
              transition-duration: 0.7s;
              transform: translate(var(--tw-translate-x), var(--tw-translate-y))
                rotate(var(--tw-rotate)) skewX(var(--tw-skew-x))
                skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x))
                scaleY(var(--tw-scale-y));
            }

            .video-container {
              transition: transform 0.7s;
              &:hover {
                transform: scale(1.05);
              }
            }
          `}</style>
        </Box>
      </PageWidth>
    </div>
  );
};
