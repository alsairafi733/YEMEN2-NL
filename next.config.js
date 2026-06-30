/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  i18n: {
    locales: ['nl', 'en', 'ar', 'tr'],
    defaultLocale: 'nl',
  },
};

module.exports = nextConfig;
