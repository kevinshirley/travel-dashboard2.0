// require('dotenv').config();
const path = require('path');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');
const withVideos = require('next-videos');

module.exports = withVideos(
  withImages(
    withCSS(
      withSass({
        env: {
          KEVIN_TEST_KEY: process.env.KEVIN_TEST_KEY,
        },
        target: 'serverless',
        devIndicators: {
          autoPrerender: false,
        },
        env: {
          KEVIN_TEST_KEY: process.env.KEVIN_TEST_KEY,
          AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
          AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
          AWS_REGION: process.env.AWS_REGION,
          AWS_S3_TRAVEL_DASH_BUCKET: process.env.AWS_S3_TRAVEL_DASH_BUCKET,
          DEV_URL: process.env.DEV_URL,
          PRODUCTION_URL: process.env.PRODUCTION_URL,
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
