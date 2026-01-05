/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  
  // Enable image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  
  // Add security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
        ],
      },
    ]
  },
}

export default nextConfig;