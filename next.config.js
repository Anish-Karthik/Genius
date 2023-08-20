/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['oaidalleapiprodscus.blob.core.windows.net'],
  },
  serverRuntimeConfig: {
    time: new Date(),
  },
  ServerRuntime: {
    time: new Date(),
  },
}

module.exports = nextConfig
