import Link from "next/link";
import { logs } from "@/lib/home";

export function DevLog() {
  return (
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
  );
}
