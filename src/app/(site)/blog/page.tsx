import type { Metadata } from "next";
import { BlogTitle } from "@/components/blog/blog-title/blog-title";
import { PostList } from "@/components/blog/post-list/post-list";
import { loadPosts } from "@/sanity/lib/posts";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing from Macondo Games on making Global Steel, a 2D run-and-gun platformer inspired by 1980s cartoons and arcade shooters.",
};

export default async function BlogPage() {
  const posts = await loadPosts();

  return (
    <main className="flex flex-1 flex-col">
      <article className={styles.page} data-floor>
        <div className={styles.inner}>
          <BlogTitle />
          <PostList posts={posts} />
        </div>
      </article>
    </main>
  );
}
