import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,

  // GitHub Pages for a repo site uses /Frieds/ as base path (replace with your repo name)
  basePath: "/Frieds",
  assetPrefix: "/Frieds",

  images: {
    unoptimized: true,
  },
};

export default nextConfig;