import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp']
  },
  // three/drei ship large untranspiled sources; keep server bundles lean
  experimental: {
    optimizePackageImports: ['@react-three/drei', 'framer-motion']
  }
};

export default nextConfig;
