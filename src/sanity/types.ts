import type { PortableTextBlock } from "@portabletext/types";

export type SanityAsset = {
  url: string | null;
  mimeType: string | null;
  width: number | null;
  height: number | null;
};

export type SanityImage = {
  alt: string | null;
  asset: SanityAsset | null;
};

export type PostCard = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string | null;
  postedBy: string | null;
  cover: SanityImage | null;
};

export type Post = PostCard & {
  body: PortableTextBlock[] | null;
};
