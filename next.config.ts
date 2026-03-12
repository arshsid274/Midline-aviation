import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Gzip all server responses
  compress: true,

  // ── Image optimisation ────────────────────────────────────────────────────
  images: {
    // Serve AVIF first (best compression), WebP as fallback
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache optimised images for 30 days on the server (default is 60 s)
    minimumCacheTTL: 2592000,
  },

  // ── Long-lived cache headers for static public/ assets ───────────────────
  async headers() {
    return [
      {
        // Animation sequence frames — immutable: content never changes for a given filename
        source: "/sequence-:seq/:frame",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // All other images in public/assets/
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
      {
        // Fonts & videos
        source: "/:path*.(woff|woff2|ttf|otf|mp4|webm)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Security headers on every response (boosts Lighthouse Best Practices)
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options",        value: "SAMEORIGIN" },
          { key: "X-XSS-Protection",       value: "1; mode=block" },
          { key: "Referrer-Policy",         value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },

  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
