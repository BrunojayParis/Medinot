/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  webpack: (config, { dev }) => {
    // Avoid eval()-wrapped modules in dev which can trigger SyntaxError in some setups
    if (dev) {
      config.devtool = 'source-map';
    }
    return config;
  },
};

module.exports = nextConfig;