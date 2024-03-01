'use client';

import Image from 'next/image';
import type { PartnershipItem } from '@/lib/types/partnership-item';
import { PlaceholderRender } from '@/lib/types/placeholder-render';

export const PartnerItem = ({
  item,
}: {
  item: PlaceholderRender<PartnershipItem>;
}) => {
  return (
    <div className="partner-item">
      <div className="img-wrapper">
        <Image
          src={item.image.url}
          fill={true}
          placeholder="blur"
          blurDataURL={item.placeholder}
          quality={90}
          alt={item.title}
          title={item.title}
        />
      </div>

      <style jsx>{`
        .partner-item {
          display: inline-flex;
          padding-top: 10%;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};
