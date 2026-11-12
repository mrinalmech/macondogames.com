import { BlogImage } from "@/components/blog/blog-image/blog-image";
import { Body } from "@/components/blog/article/body/body";
import { formatPublished } from "@/sanity/lib/format";
import type { Post } from "@/sanity/types";
import styles from "./article.module.scss";

export function Article({ post }: { post: Post }) {
  return (
    <>
      <header className={styles.header}>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.meta}>
          <time dateTime={post.publishedAt}>{formatPublished(post.publishedAt)}</time>
          {post.postedBy ? ` · Posted by ${post.postedBy}` : null}
        </p>
      </header>
      {post.cover?.asset?.url ? (
        <figure className={styles.cover}>
          <BlogImage image={post.cover} priority />
        </figure>
      ) : null}
      <Body value={post.body} />
    </>
  );
}
