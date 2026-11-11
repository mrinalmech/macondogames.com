import type { NextConfig } from "next";

const sassLoader = {
  loader: "sass-loader",
  options: {
    sassOptions: {
      // Compressed output turns `@import "..."` into `@import"..."`
      // which Tailwind does not treat as an import.
      style: "expanded",
      // So a module can `@use "motion"` the same way a partial `@use`s "tokens".
      loadPaths: ["src/app/styles"],
    },
  },
};

const nextConfig: NextConfig = {
  images: {
    // Logos ask for 90. The default list is only 75, and the optimizer
    // rejects a quality that is not listed here.
    qualities: [75, 90],
  },
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Sass is compiled by the loaders below so it finishes before Tailwind.
    turbopackUseBuiltinSass: false,
  },
  turbopack: {
    rules: {
      "*.css": {
        // *.css also matches *.module.css. Leave those to the module rule.
        condition: { not: { path: /\.module\.css$/ } },
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
      // Loaders run right to left: Sass first, then Tailwind.
      "**/globals.scss": {
        loaders: ["@tailwindcss/turbopack", sassLoader],
        as: "*.css",
      },
      "**/*.module.scss": {
        loaders: [sassLoader],
        as: "*.module.css",
      },
    },
  },
};

export default nextConfig;
