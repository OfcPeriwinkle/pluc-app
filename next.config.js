/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**.scdn.co', port: '', pathname: '/**' }],
  },
};

module.exports = nextConfig;
