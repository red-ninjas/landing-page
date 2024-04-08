'use client';
import Text from '@himalaya-ui/core/text';
import Grid from '@himalaya-ui/core/grid';
import Image from 'next/image';
import { PlaceholderRender } from 'src/lib/types/placeholder-render';
import { UspItem } from '@/lib/types/usp-item';
import { EntryAnimation } from '../animations/entry-animation';
import { useConfig } from '@himalaya-ui/core/use-config';
const zeroPad = (num: number, places: number) =>
  String(num).padStart(places, '0');

export const AboutUsItem = ({
  item,
  index,
}: {
  item: PlaceholderRender<UspItem>;
  index: number;
}) => {
  const { layout } = useConfig();

  return (
    <>
      <Grid.Container gap={2}>
        {item.image?.url && item.placeholder && (
          <Grid
            xs={24}
            mt={{ xs: 0, md: 4 }}
            sm={12}
            md={26}
            order={{ xs: 4, sm: 1, md: 4 }}
          >
            <EntryAnimation delay={0} duration={700}>
              <div className="usp-img">
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
        )}
        <Grid
          xs={24}
          sm={item.image?.url && item.placeholder ? 12 : 24}
          md={24}
          order={{ xs: 2 }}
        >
          <Grid.Container gap={2} alignContent={'flex-start'}>
            <Grid xs={24}>
              <Text
                m={0}
                font={{ xs: '2.25rem', xl: '3.75rem' }}
                lineHeight={{
                  xs: '2.5rem',
                  xl: '3.75rem',
                }}
                style={{ fontWeight: 500 }}
              >
                {zeroPad(index + 1, 2)}
              </Text>
            </Grid>
            <Grid xs={24}>
              <Text
                h2
                m={0}
                font={'1.5rem'}
                lineHeight={'2rem'}
                style={{ fontWeight: 500 }}
              >
                {item.title}
              </Text>
            </Grid>
            <Grid xs={24}>
              <Text
                m={0}
                font={1}
                lineHeight={1.75}
                style={{ color: 'var(--color-foreground-800)' }}
              >
                {item.description}
              </Text>
            </Grid>
          </Grid.Container>
        </Grid>
      </Grid.Container>

      <style jsx>{`
        .usp {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .usp-element {
        }

        .usp-order-1 {
          order: 1;
        }
        .usp-order-2 {
          order: 2;
        }
        .usp-order-3 {
          order: 3;
        }
        .usp-order-4 {
          order: 4;
        }

        .usp-img {
          padding-top: 125%;
          width: 100%;
          height: 0px;
          display: inline-block;
          position: relative;
        }
        @media only screen and (max-width: ${layout.breakpoints.sm.max}) {
          .usp-order-4 {
            order: 0;
          }
          .usp-order-3 {
            order: 3;
          }
        }
      `}</style>
    </>
  );
};
