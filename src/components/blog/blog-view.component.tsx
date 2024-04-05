'use client';

import PageWidth from '@himalaya-ui/core/page-width';
import Section from '@himalaya-ui/core/section';
import Box from '@himalaya-ui/core/box';
import Image from 'next/image';
import { PropsWithChildren } from 'react';
import { BlogItem } from 'src/lib/types/blog-item';
import { PlaceholderRender } from 'src/lib/types/placeholder-render';
import { FadeinAnimation } from '../animations/fadein-animation';
export interface BlogViewProps {
  item: PlaceholderRender<BlogItem>;
}
export default ({ item, children }: PropsWithChildren<BlogViewProps>) => {
  return (
    <Section pt={{ xs: 5.75, xl: 7.5 }} pb={{ xs: 5.75, lg: 11.25 }}>
      <PageWidth py={0}>
        {item.coverImage.url && (
          <Box mb={3}>
            <FadeinAnimation delay={0} duration={500} onStart={true}>
              <div className="post-thumbnail">
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
              </div>
            </FadeinAnimation>
          </Box>
        )}
        {children}
      </PageWidth>
      <style jsx>{`
        .post-thumbnail {
          padding-top: 50%;
          width: 100%;
          height: 0px;
          display: inline-block;
          position: relative;
        }
      `}</style>
    </Section>
  );
};
