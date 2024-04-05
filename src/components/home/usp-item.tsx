'use client';

import Text from '@himalaya-ui/core/text';
import { EntryAnimation } from '../animations/entry-animation';

export const USPItem = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <EntryAnimation delay={0} duration={1000}>
      <div className="usp-item">
        <Text
          h4
          font={'1.5rem'}
          m={0}
          lineHeight={'2rem'}
          style={{ fontWeight: 500 }}
        >
          {title}
        </Text>

        <Text
          font={1}
          m={0}
          mt={1}
          lineHeight={'1.75rem'}
          style={{ fontWeight: 400, color: 'var(--color-foreground-700)' }}
        >
          {description}
        </Text>
      </div>
    </EntryAnimation>
  );
};
