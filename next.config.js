/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    nftTracing: true
  },
  outputFileTracing: true
}

module.exports = nextConfig
