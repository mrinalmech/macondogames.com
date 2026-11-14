import type { PortableTextBlock } from "@portabletext/types";
import { loadImageAssets, type StoredAsset } from "@/sanity/lib/images";
import { cachedSanity } from "@/sanity/lib/live";
import { postQuery, postSlugsQuery, postsQuery, sitemapPostsQuery } from "@/sanity/lib/queries";
import type { Post, PostCard, SanityAsset, SanityImage } from "@/sanity/types";

type ImageRef = {
  alt: string | null;
  asset: { _ref: string } | null;
};

type RawCard = Omit<PostCard, "cover"> & {
  cover: ImageRef | null;
};

type RawPost = Omit<Post, "cover" | "body"> & {
  cover: ImageRef | null;
  body: PortableTextBlock[] | null;
};

type ImageBlock = PortableTextBlock & {
  asset?: { _ref?: string } | null;
  left?: ImageRef | null;
  right?: ImageRef | null;
};

function assetMap(assets: StoredAsset[]) {
  const byId = new Map<string, SanityAsset>();

  for (const asset of assets) {
    byId.set(asset._id, {
      url: asset.url,
      mimeType: asset.mimeType,
      width: asset.width,
      height: asset.height,
    });
  }

  return byId;
}

function resolved(ref: string | null | undefined, assets: Map<string, SanityAsset>) {
  if (!ref) return null;
  return assets.get(ref) ?? null;
}

function hydrateImage(image: ImageRef | null, assets: Map<string, SanityAsset>): SanityImage | null {
  if (!image) return null;

  return {
    alt: image.alt,
    asset: resolved(image.asset?._ref, assets),
  };
}

function refsInBody(body: PortableTextBlock[] | null) {
  const ids: Array<string | null | undefined> = [];

  for (const block of body ?? []) {
    const image = block as ImageBlock;
    if (image._type === "image") ids.push(image.asset?._ref);
    if (image._type === "imagePair") {
      ids.push(image.left?.asset?._ref, image.right?.asset?._ref);
    }
  }

  return ids;
}

function hydrateBody(body: PortableTextBlock[] | null, assets: Map<string, SanityAsset>) {
  if (!body) return null;

  return body.map((block) => {
    const image = block as ImageBlock;
    if (image._type === "image") {
      return { ...image, asset: resolved(image.asset?._ref, assets) };
    }
    if (image._type === "imagePair") {
      return {
        ...image,
        left: hydrateImage(image.left ?? null, assets),
        right: hydrateImage(image.right ?? null, assets),
      };
    }
    return block;
  });
}

export async function loadPosts() {
  const { data } = await cachedSanity({
    query: postsQuery,
    perspective: "published",
    stega: false,
  });

  const cards = (data ?? []) as RawCard[];
  const assets = assetMap(
    await loadImageAssets(cards.map((card) => card.cover?.asset?._ref)),
  );

  return cards.map(
    (card): PostCard => ({
      ...card,
      cover: hydrateImage(card.cover, assets),
    }),
  );
}

export async function loadPost(slug: string) {
  const { data } = await cachedSanity({
    query: postQuery,
    params: { slug },
    perspective: "published",
    stega: false,
  });

  const post = (data ?? null) as RawPost | null;
  if (!post) return null;

  const assets = assetMap(
    await loadImageAssets([post.cover?.asset?._ref, ...refsInBody(post.body)]),
  );

  return {
    ...post,
    cover: hydrateImage(post.cover, assets),
    body: hydrateBody(post.body, assets),
  } as Post;
}

export async function loadSitemapPosts() {
  const { data } = await cachedSanity({
    query: sitemapPostsQuery,
    perspective: "published",
    stega: false,
  });

  return (data ?? []) as { slug: string; updatedAt: string }[];
}

export async function loadPostSlugs() {
  const { data } = await cachedSanity({
    query: postSlugsQuery,
    perspective: "published",
    stega: false,
  });

  return (data ?? []) as { slug: string }[];
}
