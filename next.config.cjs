// /** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ["ui"],
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: ["cdn.sanity.io", "i.ibb.co"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

// Conditionally apply next-pwa only in production
if (process.env.NODE_ENV === 'production') {
  const withPWA = require('next-pwa')({
    dest: 'public',
    // Add any other pwa settings here, for example:
    // disable: false,
    // register: true,
    // scope: '/',
    // sw: 'service-worker.js',
    // fallbacks: {
    //   image: '/static/images/fallback.png',
    //   document: '/other-offline',  // if you want to fallback to a custom offline page
    //   font: '/static/font/fallback.woff2',
    // },
  });
  module.exports = withPWA(config);
} else {
  module.exports = config;
}