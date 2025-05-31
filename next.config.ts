
import type { NextConfig } from "next";
import withMDX from "@next/mdx";

const withMDXConfig = withMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      loaders: {}
    }
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
};

export default withMDXConfig(nextConfig);
