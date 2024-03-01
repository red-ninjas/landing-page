'use client';

import classNames from 'classnames';
import type { PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';

import { useInView } from 'react-intersection-observer';

export interface AnimationProps {
  delay: number;
  duration: number;
  onStart: boolean;
}
export const FadeinAnimation = ({
  children,
  delay = 300,
  duration = 1000,
  onStart = false,
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

  useEffect(() => {
    if (onStart) {
      setIntersecting(true);
    }
  }, []);

  return (
    <div
      className={classNames('fadein-animation', {
        'fadein-animation-show': isIntersecting,
      })}
      ref={ref}
    >
      {children}
      <style jsx>{`
        .fadein-animation {
          --tw-skew-y: 0;
          --tw-skew-x: 0;
          --tw-translate-x: 0;
          --tw-translate-y: 2rem;
          --tw-rotate: 0;
          --tw-scale-y: 1;
          --tw-scale-x: 1;
          opacity: 0;

          transform: translate(var(--tw-translate-x), var(--tw-translate-y))
            rotate(var(--tw-rotate)) skewX(var(--tw-skew-x))
            skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x))
            scaleY(var(--tw-scale-y));

          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: ${duration}ms;
          transition-delay: ${delay}ms;
          will-change: transform;
        }

        .fadein-animation-show {
          opacity: 1;
          --tw-translate-y: 0;
        }
      `}</style>
    </div>
  );
};
