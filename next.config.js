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
        target: 'serverless',
        devIndicators: {
          autoPrerender: false,
        },
        env: {
          APP_URL: isProd ? process.env.PRODUCTION_URL : process.env.DEV_URL,
          AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
          AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
          AWS_REGION: process.env.AWS_REGION,
          AWS_S3_TRAVEL_DASH_BUCKET: process.env.AWS_S3_TRAVEL_DASH_BUCKET,
          AWS_USER_POOL_ID: process.env.AWS_USER_POOL_ID,
          AWS_CLIENT_ID: process.env.AWS_CLIENT_ID,
          NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
          NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
          NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
          NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
          NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
          NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
          FIREBASE_TYPE: process.env.FIREBASE_TYPE,
          FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
          FIREBASE_PRIVATE_KEY_ID: process.env.FIREBASE_PRIVATE_KEY_ID,
          FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
          FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
          FIREBASE_CLIENT_ID: process.env.FIREBASE_CLIENT_ID,
          FIREBASE_AUTH_URI: process.env.FIREBASE_AUTH_URI,
          FIREBASE_TOKEN_URI: process.env.FIREBASE_TOKEN_URI,
          FIREBASE_AUTH_PROVIDER_CERT_URL: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
          FIREBASE_CLIENT_CERT_URL: process.env.FIREBASE_CLIENT_CERT_URL
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
