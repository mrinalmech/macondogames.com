import Image from "next/image";
import type { SanityImage } from "@/sanity/types";
import styles from "./blog-image.module.scss";

function keepsFrames(mimeType: string | null) {
  return mimeType === "image/gif" || mimeType === "image/webp";
}

export function BlogImage({
  image,
  priority = false,
  frame = false,
}: {
  image: SanityImage;
  priority?: boolean;
  frame?: boolean;
}) {
  const asset = image.asset;

  if (!asset?.url || !asset.width || !asset.height) return null;

  const gif = asset.mimeType === "image/gif";
  const className = [styles.image, gif ? styles.gif : null, frame ? styles.frame : null]
    .filter(Boolean)
    .join(" ");

  return (
    <Image
      src={asset.url}
      alt={image.alt ?? ""}
      {...(frame
        ? { fill: true as const, sizes: "(min-width: 54rem) 45rem, 88vw" }
        : { width: asset.width, height: asset.height })}
      className={className}
      quality={90}
      priority={priority}
      // The optimizer flattens animation. GIFs and the animated webp stay whole.
      unoptimized={keepsFrames(asset.mimeType)}
    />
  );
}
