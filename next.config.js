/** @type {import('next').NextConfig} */
const isStatic = process.env.STATIC_EXPORT === "true";
const isVercel = Boolean(process.env.VERCEL);

const nextConfig = {
  ...(isStatic
    ? { output: "export", trailingSlash: true, images: { unoptimized: true } }
    : isVercel
      ? {}
      : { output: "standalone" }),
  images: {
    ...(isStatic ? { unoptimized: true } : {}),
    remotePatterns: [
      {
        protocol: "https",
        hostname: "naseem.beauty",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.transparenttextures.com",
      },
    ],
  },
  ...(!isStatic
    ? {
        async headers() {
          return [
            {
              source: "/(.*)",
              headers: [
                { key: "X-Content-Type-Options", value: "nosniff" },
                { key: "X-Frame-Options", value: "DENY" },
                { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
              ],
            },
          ];
        },
      }
    : {}),
};

module.exports = nextConfig;
