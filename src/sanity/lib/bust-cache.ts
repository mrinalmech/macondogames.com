"use server";

import { updateTag } from "next/cache";
import { site } from "@/lib/site";
import { sanityCacheTag } from "@/sanity/lib/cache-tag";

// Content Lake can still return the previous published document for a moment.
const settleMs = 3000;

export async function bustSanityCache() {
  await new Promise((resolve) => setTimeout(resolve, settleMs));
  updateTag(sanityCacheTag);

  // This server is the live site in production. The request below is how a
  // local publish clears the copy cached on macondogames.com.
  if (process.env.NODE_ENV !== "development") return;
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) return;

  try {
    const response = await fetch(`${site.url}/api/revalidate`, {
      method: "POST",
      headers: { "x-revalidate-secret": secret },
      cache: "no-store",
    });
    if (!response.ok && response.status !== 404) {
      console.error(`Live site cache was not cleared (${response.status}).`);
    }
  } catch {
    console.error("Live site cache was not cleared.");
  }
}
