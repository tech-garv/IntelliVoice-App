/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ASSEMBLYAI_API_KEY: process.env.ASSEMBLYAI_API_KEY,
  },
};

module.exports = nextConfig;
