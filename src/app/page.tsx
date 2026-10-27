import type { Metadata } from "next";
import { Bangers } from "next/font/google";
import Link from "next/link";
import { characters, features, logs } from "@/lib/home";
import { site } from "@/lib/site";

const bangers = Bangers({
  weight: "400",
  subsets: ["latin"],
});

const accentGlow = {
  ember: "border-ember/50 text-ember shadow-[0_0_24px_rgba(255,106,61,0.25)]",
  hot: "border-hot/50 text-hot shadow-[0_0_24px_rgba(255,60,172,0.28)]",
  signal:
    "border-signal/50 text-signal shadow-[0_0_24px_rgba(77,232,224,0.25)]",
} as const;

export const metadata: Metadata = {
  title: { absolute: `${site.name} — ${site.featuredGame.title}` },
  description: `${site.featuredGame.tagline} ${site.featuredGame.logline}`,
};

export default function Home() {
  const [suit, shoot, level] = site.featuredGame.tagline.split(". ").map(
    (part, index, parts) =>
      index < parts.length - 1 ? `${part}.` : part,
  );

  return (
    <main className="flex w-full flex-1 flex-col">
      <section className="relative overflow-hidden border-b border-hot/20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,60,172,0.16),transparent_42%),radial-gradient(circle_at_90%_10%,rgba(77,232,224,0.14),transparent_38%),repeating-linear-gradient(-18deg,transparent,transparent_12px,rgba(255,225,77,0.04)_12px,rgba(255,225,77,0.04)_13px)]"
        />
        <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-hot">
              {site.featuredGame.title} · {site.featuredGame.status}
            </p>
            <h1
              className={`${bangers.className} hero-tagline mt-5 text-5xl leading-[0.9] text-volt sm:text-7xl lg:text-8xl`}
            >
              <span className="block text-hot drop-shadow-[0_0_18px_rgba(255,60,172,0.55)]">
                {suit}
              </span>
              <span className="block text-signal drop-shadow-[0_0_18px_rgba(77,232,224,0.5)]">
                {shoot}
              </span>
              <span className="block text-volt drop-shadow-[0_0_18px_rgba(245,230,99,0.45)]">
                {level}
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-steel">
              {site.featuredGame.logline} Dispense justice around the globe,
              with guns — three operatives, cartoon chrome, and a world that
              still looks like Saturday morning.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={site.featuredGame.steamUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-volt bg-volt px-6 py-3 font-mono text-xs uppercase tracking-[0.22em] text-void shadow-[0_0_28px_rgba(245,230,99,0.45)] transition hover:bg-transparent hover:text-volt"
              >
                Wishlist on Steam
              </a>
              <Link
                href="/press"
                className="border border-signal/40 px-6 py-3 font-mono text-xs uppercase tracking-[0.22em] text-signal hover:bg-signal/10"
              >
                Press kit
              </Link>
            </div>
          </div>

          <aside className="relative min-h-[280px] border border-signal/30 bg-panel/80 p-6 shadow-[0_0_50px_rgba(255,60,172,0.12)]">
            <div className="pointer-events-none absolute inset-3 border border-dashed border-hot/30" />
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-hot">
              Broadcast // Key art
            </p>
            <p className="mt-8 font-display text-4xl tracking-[0.14em] text-foreground sm:text-5xl">
              GLOBAL
              <br />
              <span className="text-signal">STEEL</span>
            </p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-steel">
              2D run-and-gun. Armor-suits. Hordes. Co-op. Trailer and stills
              drop here — wishlist now so Steam pings you first.
            </p>
            <div className="mt-10 h-1 w-24 bg-gradient-to-r from-hot via-volt to-signal" />
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.24em] text-ember">
              Macondo Games · TBA
            </p>
          </aside>
        </div>
      </section>

      <section
        id="lineup"
        className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-ember">
          Lineup // Operatives
        </p>
        <h2 className="mt-3 font-display text-3xl tracking-[0.1em] sm:text-4xl">
          Three playstyles. One cartoon war.
        </h2>
        <p className="mt-4 max-w-2xl text-steel">
          Control three characters with different reads — replay the same
          stage as a wall, a blur, or a gunline.
        </p>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {characters.map((character) => (
            <article
              key={character.code}
              className={`border bg-panel/80 p-6 ${accentGlow[character.accent]}`}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.3em]">
                Operative {character.code}
              </p>
              <div className="my-6 grid h-28 place-items-center border border-white/10 bg-void/60">
                <SuitMark accent={character.accent} />
              </div>
              <h3 className="font-display text-2xl tracking-[0.08em] text-foreground">
                {character.callsign}
              </h3>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.28em]">
                {character.playstyle}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-steel">
                {character.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="features"
        className="border-y border-signal/15 bg-void/60"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-hot">
            Gameplay // Breakdown
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-[0.1em] sm:text-4xl">
            The good, the bad, and the upgrades.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="border border-signal/20 bg-panel p-6 hover:border-hot/40 hover:shadow-[0_0_30px_rgba(255,60,172,0.12)]"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-volt">
                  {feature.kicker}
                </p>
                <h3 className="mt-3 font-display text-xl tracking-[0.1em]">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-steel">
                  {feature.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="devlog"
        className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-signal">
              Signal // Dev log
            </p>
            <h2 className="mt-3 font-display text-3xl tracking-[0.1em] sm:text-4xl">
              From the steelworks
            </h2>
          </div>
          <Link
            href="/blog"
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-hot hover:text-volt"
          >
            All transmissions →
          </Link>
        </div>
        <ul className="mt-10 grid gap-4 lg:grid-cols-3">
          {logs.map((log) => (
            <li key={log.title}>
              <Link
                href="/blog"
                className="block h-full border border-signal/15 bg-panel p-6 hover:border-signal/50"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-signal">
                  {log.date}
                </p>
                <h3 className="mt-3 font-display text-xl tracking-[0.08em]">
                  {log.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-steel">
                  {log.excerpt}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

function SuitMark({ accent }: { accent: keyof typeof accentGlow }) {
  const fill = {
    ember: "#ff6a3d",
    hot: "#ff3cac",
    signal: "#4de8e0",
  }[accent];

  return (
    <svg
      viewBox="0 0 64 64"
      className="h-16 w-16"
      aria-hidden
      fill="none"
    >
      <path
        d="M22 18 L32 8 L42 18 V26 H22 Z"
        stroke={fill}
        strokeWidth="2"
      />
      <path d="M18 26 H46 V42 H18 Z" stroke={fill} strokeWidth="2" />
      <path d="M18 30 H10 V44 H18" stroke={fill} strokeWidth="2" />
      <path d="M46 30 H54 V44 H46" stroke={fill} strokeWidth="2" />
      <path d="M24 42 V56 H18" stroke={fill} strokeWidth="2" />
      <path d="M40 42 V56 H46" stroke={fill} strokeWidth="2" />
      <path d="M26 20 H38" stroke={fill} strokeWidth="2" />
    </svg>
  );
}
