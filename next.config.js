/** @type {import('next').NextConfig} */

const assetPrefix = process.env.URL_PREFIX ?? "";

const nextConfig = {
  reactStrictMode: true,
  assetPrefix,
};

module.exports = nextConfig;
