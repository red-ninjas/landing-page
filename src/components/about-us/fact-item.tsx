import CountUp from '@himalaya-ui/core/count-up';
import Text from '@himalaya-ui/core/text';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { EntryAnimation } from '../animations/entry-animation';

export function FactItem({
  amount = 0,
  title = '',
  prefix = '+',
}: {
  amount?: number;
  title: string;
  prefix?: string;
}) {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const [isPlaying, setIsPlaying] = useState(inView);

  useEffect(() => {
    if (inView) {
      setIsPlaying(true);
    }
  }, [inView]);
  return (
    <EntryAnimation delay={0} duration={1000}>
      <div className="fact" ref={ref}>
        <CountUp start={0} end={amount} easing="linear" isCounting={isPlaying}>
          {({ value }) => (
            <Text
              m={0}
              b
              font={'72px'}
              style={{ fontWeight: '500' }}
              lineHeight={'74px'}
            >
              {value}
              {prefix}
            </Text>
          )}
        </CountUp>

        <Text
          m={0}
          b
          font={'1.5rem'}
          mt={{ md: '1.5rem', xs: '0.25rem' }}
          lineHeight={'2rem'}
        >
          {title}
        </Text>
        <style jsx>{`
          .fact {
            display: flex;
            align-items: center;
            flex-direction: column;
          }
        `}</style>
      </div>
    </EntryAnimation>
  );
}
