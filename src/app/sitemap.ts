import type { MetadataRoute } from "next";
import { collectSiteRoutes } from "@/lib/collect-site-routes.mjs";
import { site } from "@/lib/site";
import { staticRoutes } from "@/lib/static-routes";
import { loadSitemapPosts } from "@/sanity/lib/posts";

function pageRoutes(): string[] {
  // The source tree is present in dev and during the image build. The running
  // container only has the route list written at build time.
  return collectSiteRoutes() ?? [...staticRoutes];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await loadSitemapPosts();

  const pages: MetadataRoute.Sitemap = pageRoutes().map((route) => ({
    url: new URL(route, site.url).href,
  }));

  const articles: MetadataRoute.Sitemap = posts.flatMap((post) => {
    if (!post.slug) return [];

    return [
      {
        url: new URL(`/blog/${post.slug}`, site.url).href,
        lastModified: post.updatedAt,
      },
    ];
  });

  return [...pages, ...articles];
}
