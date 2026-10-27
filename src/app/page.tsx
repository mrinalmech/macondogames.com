import type { Metadata } from "next";
import { DevLog } from "@/components/home/dev-log";
import { Features } from "@/components/home/features";
import { Hero } from "@/components/home/hero";
import { Lineup } from "@/components/home/lineup";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${site.name} — ${site.featuredGame.title}` },
  description: `${site.featuredGame.tagline} ${site.featuredGame.logline}`,
};

export default function Home() {
  return (
    <main className="flex w-full flex-1 flex-col">
      <Hero />
      <Lineup />
      <Features />
      <DevLog />
    </main>
  );
}
