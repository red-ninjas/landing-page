'use client';

import Button from '@himalaya-ui/core/button';
import Text from '@himalaya-ui/core/text';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

import type { LanguageKeysValues } from '@/lib/types/languages';
import { useTranslation } from '@/i18n/client';
import { EntryAnimation } from '../animations/entry-animation';
import { PlaceholderRender } from 'src/lib/types/placeholder-render';
import { CaseStudyItem } from 'src/lib/types/case-study-item';

export const PortfolioItem = ({
  lng,
  item,
  index,
}: {
  lng: LanguageKeysValues;
  item: PlaceholderRender<CaseStudyItem>;
  index: number;
}) => {
  const { t } = useTranslation(lng, 'home');

  return (
    <EntryAnimation delay={0} duration={1000}>
      {item.isAvaiable ? (
        <EntryAnimation delay={0} duration={700}>
          <Link legacyBehavior href={`/${lng}/case-studies/${item.slug}`}>
            <a
              className={classNames(
                'portfolio-img', //each forths
                {
                  'portfolio-img-4x4':
                    index % 4 === 0 ||
                    (index % 2 !== 0 && (index + 1) % 4 === 0),
                }
              )}
            >
              <div className="img-wrapper">
                <Image
                  quality={100}
                  sizes="600px"
                  src={item.picture.url}
                  fill={true}
                  placeholder="blur"
                  style={{
                    objectFit: 'cover',
                  }}
                  blurDataURL={item.placeholder}
                  alt={item.projectName}
                  title={item.projectName}
                />
              </div>
            </a>
          </Link>
        </EntryAnimation>
      ) : (
        <EntryAnimation delay={0} duration={700}>
          <div
            className={classNames(
              'portfolio-img', //each forths
              {
                'portfolio-img-4x4':
                  index % 4 === 0 || (index % 2 !== 0 && (index + 1) % 4 === 0),
              }
            )}
          >
            <div className="img-wrapper">
              <Image
                quality={100}
                src={item.picture.url}
                fill={true}
                style={{
                  objectFit: 'cover',
                }}
                placeholder="blur"
                blurDataURL={item.placeholder}
                alt={item.projectName}
                title={item.projectName}
              />
            </div>
          </div>
        </EntryAnimation>
      )}

      <EntryAnimation delay={0} duration={1000}>
        <Text
          m={0}
          mt={1.5}
          font={'1.5rem'}
          lineHeight={'2rem'}
          style={{ fontWeight: 500 }}
        >
          {item.projectName} {' —'}
        </Text>
      </EntryAnimation>
      <EntryAnimation delay={200} duration={1000}>
        <Text
          m={0}
          mt={1}
          font={1}
          lineHeight={'1.75rem'}
          style={{ color: 'var(--color-foreground-300)' }}
        >
          {item.description}
        </Text>
      </EntryAnimation>
      <EntryAnimation delay={300} duration={1000}>
        {item.isAvaiable ? (
          <Link legacyBehavior href={`/${lng}/case-studies/${item.slug}`}>
            <a>
              <Button
                htmlType={'button'}
                type="primary"
                scale={1.2}
                auto
                effect
                pl={1}
                pr={1}
                ghost
                mt={2}
                style={{
                  textTransform: 'none',
                  fontWeight: '700',
                }}
              >
                {t('portfolio.watchout')}
              </Button>
            </a>
          </Link>
        ) : (
          <Button
            htmlType={'button'}
            type="primary"
            scale={1.2}
            auto
            disabled
            effect
            pl={1}
            pr={1}
            ghost
            mt={2}
            style={{
              textTransform: 'none',
              fontWeight: '700',
            }}
          >
            {t('portfolio.coming_soon')}
          </Button>
        )}
      </EntryAnimation>

      <style jsx>{`
        .portfolio-img {
          padding-top: 140%;
          width: 100%;
          height: 0px;
          display: inline-block;
          position: relative;
        }
        .portfolio-img-4x4 {
          padding-top: 100%;
        }
      `}</style>
    </EntryAnimation>
  );
};
