import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "upload.wikimedia.org",
      search: ""
    }, {
      protocol: "https",
      hostname: "commons.wikimedia.org",
      search: ""
    }, {
      protocol: "https",
      hostname: "placehold.co",
      search: ""
    }]
  },
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },
};

export default nextConfig;
