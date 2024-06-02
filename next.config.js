/** @type {import("next").NextConfig} */
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

export default config;
