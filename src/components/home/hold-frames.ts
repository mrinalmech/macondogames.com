import type { StaticImageData } from "next/image";

// A repeated picture is a hold, stored once.
export function holdFrames(frame: StaticImageData, count: number) {
  return Array.from({ length: count }, () => frame);
}
