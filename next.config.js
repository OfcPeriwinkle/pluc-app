/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.scdn.co', pathname: '/**' },
      { protocol: 'https', hostname: '**.spotifycdn.com', pathname: '/**' },
    ],
  },
};

module.exports = nextConfig;
