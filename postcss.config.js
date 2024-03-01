module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-preset-env': {},
    'postcss-nested': {},
  },
  cssLoaderOptions: {
    localIdentName: '[hash:base64:5]',
    camelCase: true,
  },
};
