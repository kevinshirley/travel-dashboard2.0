const path = require('path');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');
const withVideos = require('next-videos');

module.exports = withVideos(
  withImages(
    withCSS(
      withSass({
        target: 'serverless',
        devIndicators: {
          autoPrerender: false,
        },
        publicRuntimeConfig: {
          // Will be available on both server and client
          googleCloudApi: process.env.GOOGLE_CLOUD_API,
        },
        webpack(config, options) {
          config.resolve.alias['src'] = path.join(__dirname, 'src');
          config.resolve.extensions.push('.js');
          return config;
        },
      }),
    ),
  ),
);
