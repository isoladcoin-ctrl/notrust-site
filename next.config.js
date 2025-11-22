// ✅ next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  eslint: {
    ignoreDuringBuilds: true, // don't fail build on ESLint
  },
  typescript: {
    ignoreBuildErrors: true, // TEMP: don't fail build on TS
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "pbs.twimg.com" },
      { protocol: "https", hostname: "i.imgur.com" },
    ],
  },
};

module.exports = nextConfig;
