/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // packages/ui ships TypeScript source (Turborepo just-in-time package).
  transpilePackages: ['@rakuxon-edu/ui', '@rakuxon-edu/config'],
};

export default nextConfig;
