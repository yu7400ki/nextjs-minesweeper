/** @type {import('next').NextConfig} */

const assetPrefix =
  process.env.NODE_ENV === "production" ? "/next-minesweeper" : "";

const nextConfig = {
  reactStrictMode: true,
  assetPrefix,
};

module.exports = nextConfig;
