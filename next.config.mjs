/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "instamern-v2.s3.us-east-2.amazonaws.com",
    ],
  },
};

export default nextConfig;
