const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  trailingSlash: true,
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    // Ensure API routes are excluded from the static export
    const filteredPathMap = Object.keys(defaultPathMap).reduce((acc, path) => {
      if (!path.startsWith('/api')) {
        acc[path] = defaultPathMap[path];
      }
      return acc;
    }, {});
    return filteredPathMap;
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
        cacheDirectory: path.resolve(__dirname, '.next/cache/webpack'),
      };
    }
    return config;
  },
};

module.exports = nextConfig;
