import createMDX from '@next/mdx';
import joinLine from 'rehype-join-line';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
const getHash = (source, length) =>
  createHash('shake256', { outputLength: length }).update(source).digest('hex');

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
  webpack: (config, { dev }) => {
    // https://github.com/vercel/next.js/discussions/15818
    let rule, moduleRules, cssLoader;
    if (
      (rule = config.module.rules.find((rule) =>
        Object.keys(rule).includes('oneOf')
      ))
    ) {
      if (
        (moduleRules = rule.oneOf.filter(
          (r) =>
            ('test.module.scss'.match(r.test) ||
              'test.module.css'.match(r.test)) &&
            Array.isArray(r.use)
        ))
      ) {
        for (const moduleRule of moduleRules) {
          if (
            (cssLoader = moduleRule.use.find((u) =>
              u.loader.match('/css-loader')
            ))
          ) {
            delete cssLoader.options.modules.getLocalIdent;
            cssLoader.options = {
              ...cssLoader.options,
              modules: {
                ...cssLoader.options.modules,
                getLocalIdent: (
                  { resourcePath },
                  localIdentName,
                  localName
                ) => {
                  const { name } = path.parse(resourcePath);
                  const moduleName = name
                    .replace(/\.module/g, '')
                    .replace(/\./g, '-');
                  return dev
                    ? `${moduleName}--${localName}--${getHash(resourcePath, 2)}`
                    : `_${getHash(`${resourcePath}${localName}`, 4)}`;
                },
              },
            };
          }
        }
      }
    }
    return config;
  },
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  swcMinify: true,
  poweredByHeader: false,
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
  transpilePackages: ['@himalaya-ui/core'],
};

export default withMDX(nextConfig);
