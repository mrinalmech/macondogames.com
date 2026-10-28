"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { headerNavLinks, site } from "@/lib/site";
import styles from "./navbar.module.scss";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-black">
      <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-3 tracking-[0.28em]"
        >
          <span className="grid h-8 w-8 place-items-center border border-signal/50 bg-panel text-[10px] font-display text-signal shadow-[0_0_12px_rgba(77,232,224,0.25)]">
            MG
          </span>
          <span className="font-display text-sm text-foreground group-hover:text-signal">
            {site.shortName}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {headerNavLinks.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className="vcr-nav-link"
                aria-current={active ? "page" : undefined}
              >
                <span className="vcr-nav-label">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className={`${styles.button} grid h-10 w-10 place-items-center md:hidden`}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="relative block h-[15px] w-5" aria-hidden>
            <span
              className={`absolute left-0 top-0 block h-px w-5 origin-center bg-current transition ${open ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 top-[7px] block h-px w-5 bg-current transition ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute left-0 top-[14px] block h-px w-5 origin-center bg-current transition ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="bg-black px-4 py-4 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {headerNavLinks.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="vcr-nav-link min-h-11 w-full"
                    aria-current={active ? "page" : undefined}
                  >
                    <span className="vcr-nav-label">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
