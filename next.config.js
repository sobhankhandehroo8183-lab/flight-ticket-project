/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  reactStrictMode: true,

  images: {
    unoptimized: true,
  },

  trailingSlash: true,

  basePath: isProd ? "/flight-ticket-project" : "",
  assetPrefix: isProd ? "/flight-ticket-project/" : "",

  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",

    NEXT_PUBLIC_WEBSOCKET_URL:
      process.env.NEXT_PUBLIC_WEBSOCKET_URL || "ws://localhost:3001",
  },
};

module.exports = nextConfig;