import { Bangers } from "next/font/google";
import Link from "next/link";
import { site } from "@/lib/site";

const bangers = Bangers({
  weight: "400",
  subsets: ["latin"],
});

export function Hero() {
  const [suit, shoot, level] = site.featuredGame.tagline.split(". ").map(
    (part, index, parts) =>
      index < parts.length - 1 ? `${part}.` : part,
  );

  return (
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
  );
}
