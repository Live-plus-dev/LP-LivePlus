/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'em-content.zobj.net',
        pathname: '/source/animated-noto-color-emoji/**',
      },
    ],
  },
}

module.exports = nextConfig