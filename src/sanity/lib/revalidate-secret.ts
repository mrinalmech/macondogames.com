import { timingSafeEqual } from "node:crypto";

export function secretMatches(provided: string | null, expected: string | undefined) {
  if (!expected || !provided) return false;
  const left = Buffer.from(provided);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}
