// const path = require('path');

module.exports = {
  devIndicators: {
    autoPrerender: true,
  },
  future: {
    webpack5: true,
  },
};

// const withSass = require('@zeit/next-sass');
// const withImages = require('next-images');
// const withLess = require('@zeit/next-less');
// const withCSS = require('@zeit/next-css');

// module.exports =
// withCSS(
//   withLess(
//     withImages(
//       withSass({
//         env: {
//           ANY_ENV_KEY: 'ANY_ENV_VARIABLE',
//         },
//         devIndicators: {
//           autoPrerender: true,
//         },
//         future: {
//           webpack5: false,
//         },
//         webpack(config, options) {
//           return config;
//         },
//       })
//     )
//   )
// );
