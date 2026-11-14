import { Monitor } from "@/components/blog/monitor/monitor";
import { formatPublished } from "@/sanity/lib/format";
import type { PostCard } from "@/sanity/types";
import { ReadMore } from "./read-more/read-more";
import styles from "./post-list.module.scss";

export function PostList({ posts }: { posts: PostCard[] }) {
  if (posts.length === 0) {
    return <p className={styles.empty}>No posts yet.</p>;
  }

  return (
    <ul className={styles.list}>
      {posts.map((post, index) => (
        <li key={post._id}>
          <Monitor
            image={post.cover}
            priority={index === 0}
            control={<ReadMore href={`/blog/${post.slug}`} title={post.title} />}
          >
            <h2 className={styles.title}>{post.title}</h2>
            <p className={styles.meta}>
              <time dateTime={post.publishedAt}>{formatPublished(post.publishedAt)}</time>
              {post.postedBy ? ` · Posted by ${post.postedBy}` : null}
            </p>
            {post.excerpt ? <p className={styles.excerpt}>{post.excerpt}</p> : null}
          </Monitor>
        </li>
      ))}
    </ul>
  );
}
