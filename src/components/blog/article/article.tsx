import { Monitor } from "@/components/blog/monitor/monitor";
import { Body } from "@/components/blog/article/body/body";
import { formatPublished } from "@/sanity/lib/format";
import type { Post } from "@/sanity/types";
import styles from "./article.module.scss";

export function Article({ post }: { post: Post }) {
  return (
    <Monitor image={post.cover} priority>
      <header className={styles.header}>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.meta}>
          <time dateTime={post.publishedAt}>{formatPublished(post.publishedAt)}</time>
          {post.postedBy ? ` · Posted by ${post.postedBy}` : null}
        </p>
      </header>
      <Body value={post.body} />
    </Monitor>
  );
}
