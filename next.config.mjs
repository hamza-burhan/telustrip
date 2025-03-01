/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Add this line for static export
  unoptimized: true, // Disable image optimization
};

export default nextConfig;
