import { cacheLife } from "next/cache";
import { sanity } from "next-sanity/live/cache-life";
import { sanityFetch } from "@/sanity/lib/live";
import type { SanityAsset } from "@/sanity/types";

const assetQuery = `*[_id in $ids]{
  _id,
  url,
  mimeType,
  "width": metadata.dimensions.width,
  "height": metadata.dimensions.height
}`;

export type StoredAsset = SanityAsset & { _id: string };

// A published edit refreshes the post text. These reads do not wear that tag,
// so a picture already on the page stays cached. A new file is a new id.
async function readImageAssets(ids: string[]): Promise<StoredAsset[]> {
  "use cache";

  if (ids.length === 0) {
    cacheLife(sanity);
    return [];
  }

  const { data } = await sanityFetch({
    query: assetQuery,
    params: { ids },
    perspective: "published",
    stega: false,
  });

  return (data ?? []) as StoredAsset[];
}

export function loadImageAssets(ids: readonly (string | null | undefined)[]) {
  const unique = [...new Set(ids.filter((id): id is string => Boolean(id)))].sort();
  return readImageAssets(unique);
}
