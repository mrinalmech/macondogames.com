import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Sass is compiled by the loader below so it finishes before Tailwind.
    turbopackUseBuiltinSass: false,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
      // Loaders run right to left: Sass first, then Tailwind.
      "*.scss": {
        loaders: [
          "@tailwindcss/turbopack",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                // Compressed output turns `@import "..."` into `@import"..."`
                // which Tailwind does not treat as an import.
                style: "expanded",
              },
            },
          },
        ],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
