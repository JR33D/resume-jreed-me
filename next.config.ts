import type { NextConfig } from 'next';

const config: NextConfig = {
  pageExtensions: ['ts', 'tsx'],
  // Produces a self-contained build in .next/standalone — needed for Docker
  output: 'standalone',
};

export default config;
