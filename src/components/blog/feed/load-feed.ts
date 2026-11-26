import { cacheLife } from "next/cache";

const steamApp = 1073970;
const youtubeChannel = "UCfYKziK0Ll8UZ9AiMTZT9DA";
const perSource = 6;
const rowCap = 6;
const platformCap = 3;

export type FeedPlatform = "steam" | "youtube";

export type FeedPost = {
  id: string;
  platform: FeedPlatform;
  title: string;
  href: string;
  publishedAt: string;
  excerpt: string;
  image: string;
};

// Steam and YouTube do not call this site when something is posted.
// The page cache lasts until Sanity changes. A stale time of 5 minutes is
// long enough to freeze this list into that page, so a new post stays missing.
// Under 5 minutes, the list stays out of that page and is fetched on its own.
// The server asks Steam and YouTube again after a minute.
export async function loadFeed(): Promise<FeedPost[]> {
  "use cache";
  cacheLife({ stale: 60, revalidate: 60, expire: 60 * 60 });

  const [steam, youtube] = await Promise.all([
    loadSteam().catch(empty),
    loadYoutube().catch(empty),
  ]);

  return merge(steam, youtube);
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

async function loadYoutube(): Promise<FeedPost[]> {
  const response = await fetch(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${youtubeChannel}`,
    { cache: "no-store" },
  );
  if (!response.ok) throw new Error(`YouTube feed ${response.status}`);

  const xml = await response.text();
  const posts: FeedPost[] = [];

  for (const entry of xml.split("<entry>").slice(1)) {
    const block = entry.split("</entry>")[0] ?? "";
    const id = text(block, "yt:videoId");
    const title = text(block, "title");
    const publishedAt = text(block, "published");
    const href = link(block);
    if (!id || !title || !publishedAt || !href) continue;

    posts.push({
      id: `youtube-${id}`,
      platform: "youtube",
      title,
      href,
      publishedAt,
      excerpt: excerpt(text(block, "media:description")),
      image: thumbnail(block),
    });
    if (posts.length === perSource) break;
  }

  return posts;
}

function text(block: string, tag: string) {
  const match = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`));
  return match ? decode(match[1] ?? "") : "";
}

function link(block: string) {
  const match = block.match(/<link\b[^>]*\bhref="([^"]+)"/);
  return match ? decode(match[1] ?? "") : "";
}

function thumbnail(block: string) {
  const match = block.match(/<media:thumbnail\b[^>]*\burl="([^"]+)"/);
  return https(match ? decode(match[1] ?? "") : "");
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

function decode(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function merge(steam: FeedPost[], youtube: FeedPost[]) {
  const ranked = [...steam, ...youtube].sort(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
  );
  const counts: Record<FeedPlatform, number> = { steam: 0, youtube: 0 };
  const posts: FeedPost[] = [];

  for (const post of ranked) {
    if (counts[post.platform] >= platformCap) continue;
    posts.push(post);
    counts[post.platform] += 1;
    if (posts.length === rowCap) break;
  }

  return posts;
}
