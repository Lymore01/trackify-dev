import type { NextConfig } from "next";
import withMDX from "@next/mdx";

const withMDXConfig = withMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  turbopack: {
    rules: {},
  },
  serverExternalPackages: ["pg", "@prisma/client"],

  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
  images: {
    remotePatterns: [
      {
        hostname: "api.dicebear.com",
      },
      {
        hostname: "img.freepik.com",
      },
    ],
  },
};

export default withMDXConfig(nextConfig);
