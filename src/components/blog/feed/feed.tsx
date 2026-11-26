import Image from "next/image";
import { formatPublished } from "@/sanity/lib/format";
import { loadFeed } from "./load-feed";
import { PlatformIcon } from "./platform-icon";
import styles from "./feed.module.scss";

const labels = {
  steam: "Steam",
  youtube: "YouTube",
} as const;

export async function Feed() {
  const posts = await loadFeed();
  if (posts.length === 0) return null;

  return (
    <ul className={styles.list} aria-label="Latest from Steam and YouTube">
      {posts.map((post) => (
        <li key={post.id}>
          <a className={styles.post} href={post.href} target="_blank" rel="noreferrer">
            <PlatformIcon platform={post.platform} className={styles[post.platform]} />
            <span className={styles.text}>
              <span className={styles.name}>{labels[post.platform]}</span>
              <span className={styles.title}>{post.title}</span>
            </span>
            {post.image ? <FeedImage src={post.image} /> : null}
            {post.excerpt ? <span className={styles.excerpt}>{post.excerpt}</span> : null}
            <time className={styles.date} dateTime={post.publishedAt}>
              {formatPublished(post.publishedAt)}
            </time>
          </a>
        </li>
      ))}
    </ul>
  );
}

// The tube glass is about 14rem across. Steam and YouTube pictures are resized
// to that. Any other host stays a plain image so the feed still renders.
function FeedImage({ src }: { src: string }) {
  if (!canOptimize(src)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img className={styles.image} src={src} alt="" />
    );
  }

  return (
    <span className={styles.frame}>
      <Image src={src} alt="" fill sizes="14rem" className={styles.image} />
    </span>
  );
}

function canOptimize(src: string) {
  try {
    const host = new URL(src).hostname;
    return host === "clan.fastly.steamstatic.com" || host.endsWith(".ytimg.com");
  } catch {
    return false;
  }
}
