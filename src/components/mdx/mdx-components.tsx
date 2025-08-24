import { LinkProps } from '@himalaya-ui/core/link';
import HybridLink from './hybrid-link';
import HybridCode from './hybrid-code';
import Text from '@himalaya-ui/core/text';
import Image from 'next/image';
import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ children, ...props }) => (
      <HybridLink {...(props as LinkProps)}>{children}</HybridLink>
    ),
    p: ({ children }) => (
      <Text style={{ whiteSpace:'break-spaces' }} mt={'1.5rem'} mb={'1.5rem'} font={'1.125rem'} lineHeight={'2rem'}>
        {children}
      </Text>
    ),
    ul: ({ children }) => (
      <ul style={{ marginTop: 0, padding: 0, fontSize: '1.125rem' }}>
        {children}
      </ul>
    ),
    img: (props) => (
      <Image
        width={0}
        height={0}
        src={props.src ?? ''}
        alt={props.alt ?? ''}
        title={props.alt}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
      ></Image>
    ),
    h1: ({ children }) => <Text h1>{children}</Text>,
    h2: ({ children }) => (
      <Text
        mt={{ xs: '1.5rem', xl: '1.5rem' }}
        mb={'0.25rem'}
        font={{ xs: 2, md: 3.25 }}
        lineHeight={{ xs: 2.375, md: 3.3 }}
        h2
      >
        {children}
      </Text>
    ),
    h3: ({ children }) => (
      <Text
        mt={{ xs: '1.5rem', xl: '1.5rem' }}
        mb={'0.25rem'}
        font={'1.5rem'}
        lineHeight={'2rem'}
        h3
      >
        {children}
      </Text>
    ),
    h4: () => <Text h4 />,
    pre: ({ children, ...props }) => (
      <HybridCode {...(props as React.ComponentPropsWithoutRef<'pre'>)}>
        {children}
      </HybridCode>
    ),
    ...components,
  };
}
