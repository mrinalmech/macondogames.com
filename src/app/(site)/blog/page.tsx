import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogTitle } from "@/components/blog/blog-title/blog-title";
import { Feed } from "@/components/blog/feed/feed";
import { PostList } from "@/components/blog/post-list/post-list";
import { Holder } from "@/components/shared/holder/holder";
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
          <div className={styles.layout}>
            <PostList posts={posts} />
            <Holder>
              {/* The feed refreshes on its own, outside the page cache. */}
              <Suspense fallback={null}>
                <Feed />
              </Suspense>
            </Holder>
          </div>
        </div>
      </article>
    </main>
  );
}
