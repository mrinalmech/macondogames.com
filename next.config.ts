import type { NextConfig } from "next";
import { sanity } from "next-sanity/live/cache-life";

const sassLoader = {
  loader: "sass-loader",
  options: {
    // Sanity depends on the npm package `motion`. With the webpack importer
    // on, `@use "motion"` loads that package instead of styles/_motion.scss.
    // Partials resolve through loadPaths. The Tailwind `@import` keeps its
    // `.css` suffix, so Sass leaves it for the Tailwind loader.
    webpackImporter: false,
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
  // A minimal server for the container. public and .next/static are copied
  // in the image; server.js serves them.
  output: "standalone",
  images: {
    // Logos ask for 90. The default list is only 75, and the optimizer
    // rejects a quality that is not listed here.
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
  // Published posts stay cached until Sanity Live invalidates them.
  cacheLife: {
    default: sanity,
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
