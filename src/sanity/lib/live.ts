import { createClient } from "next-sanity";
import { defineLive, type StrictDefinedFetchType } from "next-sanity/live";
import { dataset, projectId } from "@/sanity/env";

const token = process.env.SANITY_API_READ_TOKEN;

if (!token) {
  throw new Error("Missing SANITY_API_READ_TOKEN");
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-11-12",
  useCdn: true,
  perspective: "published",
});

const live = defineLive({
  client,
  serverToken: token,
  browserToken: token,
  strict: true,
});

export const { sanityFetch, SanityLive } = live;

export const cachedSanity: StrictDefinedFetchType = async (options) => {
  "use cache";
  return sanityFetch(options);
};
