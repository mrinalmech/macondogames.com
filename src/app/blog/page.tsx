import type { Metadata } from "next";
import { PageFrame } from "@/components/page-frame";

export const metadata: Metadata = {
  title: "Blog",
  description: "Devlogs and studio news from Macondo Games.",
};

const posts = [
  {
    date: "TBD",
    title: "First transmission",
    excerpt:
      "A placeholder post for the studio blog — development notes, Global Steel updates, and behind-the-scenes writing.",
  },
  {
    date: "TBD",
    title: "Inside the steelworks",
    excerpt:
      "Placeholder slot for a process post: tools, iteration, and how the world of Global Steel is taking shape.",
  },
  {
    date: "TBD",
    title: "Community signal",
    excerpt:
      "Placeholder slot for mailing-list, Discord, or event announcements once those channels go live.",
  },
];

export default function BlogPage() {
  return (
    <PageFrame
      kicker="Logs // Blog"
      title="Studio feed"
      description="Devlogs and news will list here. Entries below are placeholders so the route, layout, and navigation are already wired."
    >
      <ul className="space-y-4">
        {posts.map((post) => (
          <li
            key={post.title}
            className="border border-signal/15 bg-panel p-6"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-signal">
              {post.date}
            </p>
            <h2 className="mt-2 font-display text-2xl tracking-[0.08em]">
              {post.title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-steel">
              {post.excerpt}
            </p>
          </li>
        ))}
      </ul>
    </PageFrame>
  );
}
