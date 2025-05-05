/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config, { isServer }) => {
    // Disable webpack caching
    config.cache = false;
    
    // Clear module and chunk caching
    if (config.optimization) {
      config.optimization.moduleIds = 'named';
      config.optimization.chunkIds = 'named';
      config.optimization.splitChunks = false;
      config.optimization.runtimeChunk = false;
    }
    
    // Configure watch options
    config.watchOptions = {
      ignored: ['**/node_modules', '**/.next'],
      aggregateTimeout: 300,
      poll: 1000,
    };
    
    return config;
  },
};

module.exports = nextConfig;