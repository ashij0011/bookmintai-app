/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Increase API route body size limit for PDF responses
  api: {
    responseLimit: '50mb',
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
  // Hostinger Node.js deployment compatibility
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['pdf-lib'],
  },
};

module.exports = nextConfig;
