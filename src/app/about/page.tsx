import type { Metadata } from "next";
import { PageFrame } from "@/components/page-frame";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "About Macondo Games, an independent studio.",
};

export default function AboutPage() {
  return (
    <PageFrame
      kicker="Studio // About"
      title={site.name}
      description="Macondo Games is an independent studio. This page is a placeholder for origin story, team, and the ethos behind Global Steel."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <article className="border border-signal/15 bg-panel p-6">
          <h2 className="font-display text-xl tracking-[0.1em]">Mission</h2>
          <p className="mt-3 text-sm leading-relaxed text-steel">
            Ship focused games with industrial atmosphere, readable systems, and
            a human core. Exact wording TBD.
          </p>
        </article>
        <article className="border border-signal/15 bg-panel p-6">
          <h2 className="font-display text-xl tracking-[0.1em]">Now building</h2>
          <p className="mt-3 text-sm leading-relaxed text-steel">
            {site.featuredGame.title} — {site.featuredGame.status.toLowerCase()}.
            Team bios, portraits, and hiring notes will replace this block.
          </p>
        </article>
      </div>
    </PageFrame>
  );
}
