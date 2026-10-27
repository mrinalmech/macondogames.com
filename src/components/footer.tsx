import Link from "next/link";
import { navLinks, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-signal/20 bg-void">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-display text-sm tracking-[0.28em] text-signal">
            {site.name}
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-steel">
            {site.tagline} Currently building{" "}
            <span className="text-foreground">{site.featuredGame.title}</span>.
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ember">
            Navigate
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-mono text-xs uppercase tracking-[0.18em] text-steel hover:text-signal"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-signal/10">
        <p className="mx-auto max-w-6xl px-4 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-steel/80 sm:px-6">
          © {site.name} · Placeholder site · GDPR notices live on Privacy
        </p>
      </div>
    </footer>
  );
}
