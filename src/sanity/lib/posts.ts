import { cachedSanity } from "@/sanity/lib/live";
import { postQuery, postSlugsQuery, postsQuery } from "@/sanity/lib/queries";
import type { Post, PostCard } from "@/sanity/types";

export async function loadPosts() {
  const { data } = await cachedSanity({
    query: postsQuery,
    perspective: "published",
    stega: false,
  });

  return (data ?? []) as PostCard[];
}

export async function loadPost(slug: string) {
  const { data } = await cachedSanity({
    query: postQuery,
    params: { slug },
    perspective: "published",
    stega: false,
  });

  return (data ?? null) as Post | null;
}

export async function loadPostSlugs() {
  const { data } = await cachedSanity({
    query: postSlugsQuery,
    perspective: "published",
    stega: false,
  });

  return (data ?? []) as { slug: string }[];
}
