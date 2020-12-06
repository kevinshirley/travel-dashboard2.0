const path = require('path');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');
const withVideos = require('next-videos');

const isProd = process.env.NODE_ENV === 'production';

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
          APP_URL: isProd ? process.env.PRODUCTION_URL : process.env.DEV_URL,
          AWS_USER_POOL_ID: process.env.AWS_USER_POOL_ID,
          AWS_CLIENT_ID: process.env.AWS_CLIENT_ID,
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
        redirects() {
          return [
            {
              source: '/profiles',
              destination: '/customers',
              permanent: true,
            },
          ]
        },
      }),
    ),
  ),
);
