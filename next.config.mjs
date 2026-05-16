/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        
      },
      {
    protocol: "https",
    hostname: "mir-s3-cdn-cf.behance.net",
  },
   {
    protocol: "https",
    hostname: "**.fbcdn.net",
  },
   {
    protocol: "https",
    hostname: "chanukawijesundara.com",
  },
    ],
  },
};

export default nextConfig;