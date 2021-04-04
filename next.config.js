const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');

module.exports = withPlugins([
  [
    optimizedImages,
    {
      // these are the default values so you don't have to provide them if they are good enough for your use-case.
      // but you can overwrite them here with any valid value you want.
      inlineImageLimit: 8192,
      imagesFolder: 'images',
      imagesName: '[name]-[hash].[ext]',
      handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
      removeOriginalExtension: false,
      optimizeImages: true,
      optimizeImagesInDev: false,
      mozjpeg: {
        quality: 80,
      },
      optipng: {
        optimizationLevel: 3,
      },
      responsive: {
        adapter: require('responsive-loader/sharp'),
      },
      pngquant: false,
      gifsicle: {
        interlaced: true,
        optimizationLevel: 3,
      },
      svgo: {
        // enable/disable svgo plugins here
      },
      webp: {
        preset: 'default',
        quality: 75,
      },
    },
  ],
  (phase) => {
    // const isDev = phase === PHASE_DEVELOPMENT_SERVER;
    const isDev = process.env.NODE_ENV !== 'production';
    const isProd = !isDev;
    // const isProd =
    //   phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
    // const isStaging =
    //   phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1';

    console.log(`isDev:${isDev}  isProd:${isProd}`);

    const devIndicators = {
      autoPrerender: true,
    };
    const future = {
      webpack5: true,
    };
    const env = {
      API_ROOT: (() => {
        if (isDev) return 'http://localhost:8000';
        if (isProd) return 'https://0berox.deta.dev';
        // if (isStaging) return 'https://0berox.deta.dev';
      })(),
    };

    return { devIndicators, future, env };
  },
]);
