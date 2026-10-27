import type { Metadata } from "next";
import { PageFrame } from "@/components/page-frame";

export const metadata: Metadata = {
  title: "Press",
  description: "Press kit placeholder for Macondo Games and Global Steel.",
};

export default function PressPage() {
  return (
    <PageFrame
      kicker="Media // Press"
      title="Press kit"
      description="Logos, screenshots, fact sheets, and trailer links will live here. This is a structural placeholder for journalists and partners."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {[
          {
            title: "Studio fact sheet",
            body: "Founding notes, location, and contact for Macondo Games.",
          },
          {
            title: "Global Steel overview",
            body: "Genre, platforms, release window, and short/long descriptions.",
          },
          {
            title: "Asset pack",
            body: "Logo lockups, key art, and screenshot ZIP — coming soon.",
          },
          {
            title: "Boilerplate",
            body: "Approved copy blocks for articles and roundups.",
          },
        ].map((item) => (
          <article
            key={item.title}
            className="border border-signal/15 bg-panel p-6"
          >
            <h2 className="font-display text-xl tracking-[0.1em]">
              {item.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-steel">
              {item.body}
            </p>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-ember">
              Placeholder
            </p>
          </article>
        ))}
      </div>
    </PageFrame>
  );
}
