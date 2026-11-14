import { revalidateTag } from "next/cache";
import { sanityCacheTag } from "@/sanity/lib/cache-tag";
import { secretMatches } from "@/sanity/lib/revalidate-secret";

export async function POST(request: Request) {
  const provided = request.headers.get("x-revalidate-secret");
  if (!secretMatches(provided, process.env.REVALIDATE_SECRET)) {
    return new Response(null, { status: 401 });
  }

  revalidateTag(sanityCacheTag, { expire: 0 });
  return Response.json({ revalidated: true });
}
