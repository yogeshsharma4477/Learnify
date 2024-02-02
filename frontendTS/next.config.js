/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BACKEND_BASEPATH:'http://localhost:3001',
    GOOGLE_CLIENT_ID: '626551388553-egj2hpst0fed0ihl18ltm4j4tr2mrlqe.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET : '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',
    FRONTEND_DOMAIN:'http://localhost:3000',
  },
}

module.exports = nextConfig
