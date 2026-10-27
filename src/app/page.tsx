import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${site.name} — ${site.featuredGame.title}` },
  description: site.featuredGame.logline,
};

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-16 sm:px-6">
      <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.36em] text-ember">
            Transmission // 01
          </p>
          <h1 className="mt-4 font-display text-4xl leading-tight tracking-[0.08em] text-foreground sm:text-6xl">
            {site.featuredGame.title}
          </h1>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.28em] text-signal">
            {site.featuredGame.status} · {site.name}
          </p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-steel">
            {site.featuredGame.logline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/press"
              className="border border-signal bg-signal/10 px-5 py-3 font-mono text-xs uppercase tracking-[0.22em] text-signal hover:bg-signal/20"
            >
              Press kit
            </Link>
            <Link
              href="/contact"
              className="border border-steel/40 px-5 py-3 font-mono text-xs uppercase tracking-[0.22em] text-steel hover:border-foreground hover:text-foreground"
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="relative min-h-[280px] border border-signal/25 bg-panel p-6 shadow-[0_0_40px_rgba(77,232,224,0.08)]">
          <div className="pointer-events-none absolute inset-3 border border-dashed border-signal/20" />
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-steel">
            Visual placeholder
          </p>
          <p className="mt-8 font-display text-2xl tracking-[0.16em] text-signal">
            GLOBAL
            <br />
            STEEL
          </p>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-steel">
            Key art, trailer embed, and store links will land here. Until then,
            this panel holds the broadcast.
          </p>
          <div className="mt-10 h-px w-full bg-gradient-to-r from-ember via-signal/40 to-transparent" />
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.24em] text-ember">
            Signal locked · awaiting assets
          </p>
        </div>
      </section>

      <section className="mt-20 grid gap-4 sm:grid-cols-3">
        {[
          {
            code: "01",
            title: "Tactical pressure",
            body: "Placeholder pillar: high-stakes decisions in industrial theaters.",
          },
          {
            code: "02",
            title: "Hand-forged worlds",
            body: "Placeholder pillar: dense environments, readable at a glance.",
          },
          {
            code: "03",
            title: "Indie pulse",
            body: "Placeholder pillar: a small team shipping a focused experience.",
          },
        ].map((pillar) => (
          <article
            key={pillar.code}
            className="border border-signal/15 bg-panel/70 p-5"
          >
            <p className="font-mono text-[10px] text-signal">{pillar.code}</p>
            <h2 className="mt-3 font-display text-lg tracking-[0.12em]">
              {pillar.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-steel">
              {pillar.body}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
