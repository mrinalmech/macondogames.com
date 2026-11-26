import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Article } from "@/components/blog/article/article";
import { BlogTitle } from "@/components/blog/blog-title/blog-title";
import { Feed } from "@/components/blog/feed/feed";
import { Holder } from "@/components/shared/holder/holder";
import { loadPost, loadPostSlugs } from "@/sanity/lib/posts";
import styles from "../page.module.scss";

// The slug decides whether this is an article or a 404, so the route waits
// for it instead of streaming a shell first.
export const instant = false;

export async function generateStaticParams() {
  const posts = await loadPostSlugs();

  return posts;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadPost(slug);

  if (!post) return { title: "Blog" };

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await loadPost(slug);

  if (!post) notFound();

  return (
    <main className="flex flex-1 flex-col">
      <article className={styles.page} data-floor>
        <div className={styles.inner}>
          <BlogTitle />
          <div className={styles.layout}>
            <Article post={post} />
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
