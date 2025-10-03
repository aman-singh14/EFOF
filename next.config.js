/** @type {import('next').NextConfig} */
const nextConfig = {
    allowedDevOrigins: ["*.preview.same-app.com"],
    
    // Optimize CSS loading (using stable features only)
    experimental: {
      cssChunking: 'strict',
    },
    
    // Compiler optimizations
    compiler: {
      removeConsole: process.env.NODE_ENV === 'production',
    },
    
    images: {
      formats: ['image/webp', 'image/avif'],
      domains: [
        "source.unsplash.com",
        "images.unsplash.com",
        "ext.same-assets.com",
        "ugc.same-assets.com",
      ],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "source.unsplash.com",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "images.unsplash.com",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "ext.same-assets.com",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "ugc.same-assets.com",
          pathname: "/**",
        },
      ],
    },
    
    // Webpack configuration to handle react-map-gl
    webpack: (config, { isServer }) => {
      // Handle react-map-gl module resolution
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false,
          path: false,
          stream: false,
        };
      }
      
      return config;
    },
    
    // Headers for better caching
    async headers() {
      return [
        {
          source: '/fonts/(.*)',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
      ];
    },
  };
  
  module.exports = nextConfig;  