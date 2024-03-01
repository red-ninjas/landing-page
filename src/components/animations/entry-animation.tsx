'use client';

import classNames from 'classnames';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export interface AnimationProps {
  delay: number;
  duration: number;
}
export const EntryAnimation = ({
  children,
  delay = 300,
  duration = 1000,
}: PropsWithChildren<AnimationProps>) => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const [isIntersecting, setIntersecting] = useState(inView);

  useEffect(() => {
    if (inView) {
      setIntersecting(true);
    }
  }, [inView]);

  return (
    <>
      <div
        className={classNames('entry-animation', {
          'entry-animation-show': isIntersecting,
        })}
        ref={ref}
      >
        {children}

        <style jsx>{`
          .entry-animation {
            width: 100%;
            --tw-skew-y: 0;
            --tw-skew-x: 0;
            --tw-translate-x: 0;
            --tw-translate-y: 4rem;
            --tw-rotate: 0;
            --tw-scale-y: 1;
            --tw-scale-x: 1;
            opacity: 0;

            transform: translate3d(
                var(--tw-translate-x),
                var(--tw-translate-y),
                0
              )
              rotate(var(--tw-rotate)) skewX(var(--tw-skew-x))
              skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x))
              scaleY(var(--tw-scale-y));

            transition-property: all;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: ${duration}ms;
            transition-delay: ${delay}ms;
            will-change: transform;
          }

          .entry-animation-show {
            opacity: 1;
            --tw-translate-y: 0;
          }
        `}</style>
      </div>
    </>
  );
};
