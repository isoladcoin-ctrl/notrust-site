// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Don’t fail the build because of lint warnings
    ignoreDuringBuilds: true,
  },
  // You can keep other options you already have:
  // experimental: { /* ... */ }
};

export default nextConfig;
