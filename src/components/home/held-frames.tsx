import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";

export function HeldFrames({
  frames,
  first = 0,
  className,
  sizes,
  loading,
}: {
  frames: readonly StaticImageData[];
  first?: number;
  className: string;
  sizes?: string;
  loading?: "eager" | "lazy";
}) {
  return frames.map((frame, index) => (
    <Image
      key={index}
      src={frame}
      alt=""
      sizes={sizes}
      loading={loading}
      className={className}
      style={{ "--i": first + index } as CSSProperties}
    />
  ));
}
