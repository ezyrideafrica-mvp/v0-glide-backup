/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },

  experimental: {
    serverActions: {
      allowedOrigins: ["*"],
    }
  },

  skipProxyUrlNormalize: true,
};

export default nextConfig;
