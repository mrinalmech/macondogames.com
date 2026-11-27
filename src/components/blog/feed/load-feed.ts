import { cacheLife } from "next/cache";

const steamApp = 1073970;
const instagramAccount = "17841444851031089";
const perSource = 6;
const rowCap = 6;
const platformCap = 3;

export type FeedPlatform = "steam" | "instagram";

export type FeedPost = {
  id: string;
  platform: FeedPlatform;
  title: string;
  href: string;
  publishedAt: string;
  excerpt: string;
  image: string;
};

// Steam and Instagram do not call this site when something is posted.
// The page cache lasts until Sanity changes. A stale time of 5 minutes is
// long enough to freeze this list into that page, so a new post stays missing.
// Under 5 minutes, the list stays out of that page and is fetched on its own.
// The server asks each source again after a minute.
export async function loadFeed(): Promise<FeedPost[]> {
  "use cache";
  cacheLife({ stale: 60, revalidate: 60, expire: 60 * 60 });

  const [steam, instagram] = await Promise.all([
    loadSteam().catch(empty),
    loadInstagram().catch(empty),
  ]);

  return merge([steam, instagram]);
}

function empty(error: unknown): FeedPost[] {
  console.error(error);
  return [];
}

async function loadSteam(): Promise<FeedPost[]> {
  // The default list leaves community announcements out.
  const response = await fetch(
    `https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=${steamApp}&count=${perSource}&maxlength=0&feeds=steam_community_announcements`,
    { cache: "no-store" },
  );
  if (!response.ok) throw new Error(`Steam news ${response.status}`);

  const body = (await response.json()) as {
    appnews?: {
      newsitems?: Array<{
        gid?: string;
        title?: string;
        url?: string;
        date?: number;
        contents?: string;
      }>;
    };
  };

  return (body.appnews?.newsitems ?? []).flatMap((item) => {
    if (!item.gid || !item.title || !item.url || !item.date) return [];

      const contents = item.contents ?? "";

      return [
      {
        id: `steam-${item.gid}`,
        platform: "steam" as const,
        title: item.title,
        href: item.url,
        publishedAt: new Date(item.date * 1000).toISOString(),
        excerpt: excerpt(steamText(contents)),
        image: steamImage(contents),
      },
    ];
  });
}

async function loadInstagram(): Promise<FeedPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return [];

  const response = await fetch(
    `https://graph.facebook.com/v27.0/${instagramAccount}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=${perSource}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    },
  );
  if (!response.ok) throw new Error(`Instagram media ${response.status}`);

  const body = (await response.json()) as {
    data?: Array<{
      id?: string;
      caption?: string;
      media_type?: string;
      media_url?: string;
      thumbnail_url?: string;
      permalink?: string;
      timestamp?: string;
    }>;
    error?: unknown;
  };
  if (body.error) throw new Error("Instagram media error");

  return (body.data ?? []).flatMap((item) => {
    if (!item.id || !item.permalink || !item.timestamp) return [];
    const copy = instagramCopy(item.caption ?? "");
    // A video's media_url is the file. The picture is the thumbnail.
    const image = item.media_type === "VIDEO" ? item.thumbnail_url : item.media_url;

    return [
      {
        id: `instagram-${item.id}`,
        platform: "instagram" as const,
        title: copy.title,
        href: item.permalink,
        publishedAt: item.timestamp,
        excerpt: copy.excerpt,
        image: https(image ?? ""),
      },
    ];
  });
}

function instagramCopy(caption: string) {
  const trimmed = caption.trim();
  const lineEnd = trimmed.indexOf("\n");
  const title = (lineEnd === -1 ? trimmed : trimmed.slice(0, lineEnd)).trim();
  const rest = lineEnd === -1 ? "" : trimmed.slice(lineEnd + 1);
  return { title: title || "Instagram", excerpt: excerpt(rest) };
}

// Two lines of the tube. The rest of a long description stays on the post.
function excerpt(value: string) {
  const text = value.replace(/\s+/g, " ").trim();
  if (text.length <= 240) return text;
  const cut = text.slice(0, 240);
  const space = cut.lastIndexOf(" ");
  return (space > 160 ? cut.slice(0, space) : cut).trim();
}

function steamText(contents: string) {
  return contents
    .replace(/\[img[\s\S]*?\[\/img\]/gi, " ")
    .replace(/\[url=(?:"[^"]*"|'[^']*'|[^\]]+)\]([\s\S]*?)\[\/url\]/gi, "$1")
    .replace(/\[[^\]]+\]/g, " ");
}

function steamImage(contents: string) {
  const quoted = contents.match(/\[img[^\]\n]*\bsrc="([^"]+)"/i);
  const bare = contents.match(/\[img\]([^[]+)\[\/img\]/i);
  const src = (quoted?.[1] ?? bare?.[1] ?? "").trim();
  return https(src.replaceAll("{STEAM_CLAN_IMAGE}", "https://clan.fastly.steamstatic.com/images"));
}

function https(src: string) {
  return src.startsWith("https://") ? src : "";
}

function merge(groups: FeedPost[][]) {
  const ranked = groups.flat().sort(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
  );
  const counts: Record<FeedPlatform, number> = { steam: 0, instagram: 0 };
  const posts: FeedPost[] = [];

  for (const post of ranked) {
    if (counts[post.platform] >= platformCap) continue;
    posts.push(post);
    counts[post.platform] += 1;
    if (posts.length === rowCap) break;
  }

  return posts;
}
