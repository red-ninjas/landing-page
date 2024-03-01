import Link, { LinkProps } from '@himalaya-ui/core/link';
import NextLink from 'next/link';
import React from 'react';

export type HybridLinkProps = LinkProps;

const HybridLink: React.FC<HybridLinkProps> = ({
  href = '#',
  children,
  ...props
}) => {
  const isRelativeUrl = !/^([a-z0-9]*:|.{0})\/\/.*$/gim.test(href);

  if (isRelativeUrl) {
    return (
      <NextLink href={href} passHref legacyBehavior>
        <Link underline style={{}} color {...props}>
          {children}
        </Link>
      </NextLink>
    );
  }

  return (
    <Link
      href={href}
      target="_blank"
      color
      underline
      icon={true}
      rel="noreferrer nofollow"
      {...props}
    >
      {children}
    </Link>
  );
};

export default HybridLink;
