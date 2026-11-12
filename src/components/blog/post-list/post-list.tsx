import Link from "next/link";
import { BlogImage } from "@/components/blog/blog-image/blog-image";
import { formatPublished } from "@/sanity/lib/format";
import type { PostCard } from "@/sanity/types";
import styles from "./post-list.module.scss";

export function PostList({ posts }: { posts: PostCard[] }) {
  if (posts.length === 0) {
    return <p className={styles.empty}>No posts yet.</p>;
  }

  return (
    <ul className={styles.list}>
      {posts.map((post, index) => (
        <li key={post._id}>
          <Link href={`/blog/${post.slug}`} className={styles.link}>
            {post.cover?.asset?.url ? (
              <BlogImage image={post.cover} priority={index === 0} />
            ) : null}
            <h2 className={styles.title}>{post.title}</h2>
            <p className={styles.meta}>
              <time dateTime={post.publishedAt}>{formatPublished(post.publishedAt)}</time>
              {post.postedBy ? ` · Posted by ${post.postedBy}` : null}
            </p>
            {post.excerpt ? <p className={styles.excerpt}>{post.excerpt}</p> : null}
          </Link>
        </li>
      ))}
    </ul>
  );
}
