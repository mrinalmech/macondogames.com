import Image from "next/image";
import type { SanityImage } from "@/sanity/types";
import styles from "./blog-image.module.scss";

function keepsFrames(mimeType: string | null) {
  return mimeType === "image/gif" || mimeType === "image/webp";
}

export function BlogImage({
  image,
  priority = false,
}: {
  image: SanityImage;
  priority?: boolean;
}) {
  const asset = image.asset;

  if (!asset?.url || !asset.width || !asset.height) return null;

  const gif = asset.mimeType === "image/gif";

  return (
    <Image
      src={asset.url}
      alt={image.alt ?? ""}
      width={asset.width}
      height={asset.height}
      className={gif ? `${styles.image} ${styles.gif}` : styles.image}
      quality={90}
      priority={priority}
      // The optimizer flattens animation. GIFs and the animated webp stay whole.
      unoptimized={keepsFrames(asset.mimeType)}
    />
  );
}
