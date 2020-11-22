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
        webpack(config, options) {
          config.resolve.alias['src'] = path.join(__dirname, 'src');
          config.resolve.extensions.push('.js');
          return config;
        },
      }),
    ),
  ),
);
