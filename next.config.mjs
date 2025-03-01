/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Add this line for static export
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
};

export default nextConfig;
