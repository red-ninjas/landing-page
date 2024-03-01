import createMDX from '@next/mdx';
import joinLine from 'rehype-join-line';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';

const withMDX = createMDX({
  extension: /\.(md|mdx)?$/,
  options: {
    // providerImportSource: '@mdx-js/react',
    remarkPlugins: [remarkMdx, remarkGfm],
    rehypePlugins: [joinLine],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer === false) {
      config.module.rules.push({
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]',
              },
            },
          },
          'sass-loader',
        ],
      });
    }
    return config;
  },

  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  swcMinify: true,
  poweredByHeader: false,
  generateEtags: false,
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    formats: ['image/webp'],
    loader: 'default',
    dangerouslyAllowSVG: true,
    disableStaticImages: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        pathname: '**',
      },
    ],
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

  compiler: {
    styledComponents: true,
  },
};

export default withMDX(nextConfig);
