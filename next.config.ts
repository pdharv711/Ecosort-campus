import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow mobile devices and other computers on the local Wi-Fi to test the app
  allowedDevOrigins: [
    "192.168.29.184",
    "192.168.29.184:3000",
    "localhost",
    "localhost:3000",
  ],
};

export default nextConfig;
