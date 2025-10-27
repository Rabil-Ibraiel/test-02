/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["motion/react"],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Avoid dev-only eval-based source maps so we stay CSP compliant.
      config.devtool = "source-map";
    }
    return config;
  },
};

export default nextConfig;
