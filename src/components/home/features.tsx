import { features } from "@/lib/home";

export function Features() {
  return (
    <section id="features" className="border-y border-signal/15 bg-void/60">
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
  );
}
