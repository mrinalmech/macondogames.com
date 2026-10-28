"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { headerNavLinks, site } from "@/lib/site";
import logo from "./logo.png";
import styles from "./navbar.module.scss";

function MenuGlyph({ open }: { open: boolean }) {
  const bar = "absolute left-0 block h-px w-5 bg-current";

  return (
    <span className="relative block h-[15px] w-5">
      <span
        className={`${bar} top-0 origin-center transition ${open ? "translate-y-[7px] rotate-45" : ""}`}
      />
      <span
        className={`${bar} top-[7px] transition ${open ? "opacity-0" : ""}`}
      />
      <span
        className={`${bar} top-[14px] origin-center transition ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
      />
    </span>
  );
}

const barFadeDistance = 80;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [fill, setFill] = useState(0);

  useLayoutEffect(() => {
    let frame = 0;

    const apply = () => {
      const next = Math.min(1, window.scrollY / barFadeDistance);
      setFill((current) => (Math.abs(current - next) < 0.001 ? current : next));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        apply();
      });
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

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
    <header className="sticky top-0 z-50">
      <div
        className={`${styles.bar} flex w-full items-center justify-between pb-3 pl-7 pr-4 pt-5 sm:pr-6`}
      >
        <div
          className={`${styles.barFill} ${open ? styles.barOpen : ""}`}
          style={{ opacity: open ? 1 : fill }}
          aria-hidden
        />
        <Link href="/" className="vcr-logo-link -translate-y-1">
          <span className="vcr-logo-mark">
            <Image
              src={logo}
              alt={site.name}
              loading="eager"
              className={styles.logo}
            />
            <svg
              className="vcr-logo-sweep"
              viewBox="0 0 137 159"
              aria-hidden="true"
            >
              <defs>
                <filter id="vcr-logo-red" colorInterpolationFilters="sRGB">
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 1.4 -1 -1 0 0"
                  />
                </filter>
                <mask
                  id="vcr-logo-red-mask"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="137"
                  height="159"
                >
                  <image
                    href={logo.src}
                    width="137"
                    height="159"
                    filter="url(#vcr-logo-red)"
                    preserveAspectRatio="none"
                  />
                </mask>
                <linearGradient id="vcr-logo-glint" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#fff" stopOpacity="0" />
                  <stop offset="42%" stopColor="#fff" stopOpacity="0" />
                  <stop offset="50%" stopColor="#fff" stopOpacity="0.85" />
                  <stop offset="58%" stopColor="#fff" stopOpacity="0" />
                  <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <g mask="url(#vcr-logo-red-mask)">
                <rect
                  className="vcr-logo-shine"
                  x="0"
                  y="0"
                  width="137"
                  height="159"
                  fill="url(#vcr-logo-glint)"
                />
              </g>
            </svg>
          </span>
        </Link>

        <nav
          className="edge-links hidden items-center gap-1 self-start md:flex"
          aria-label="Primary"
        >
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
          className="vcr-menu-button grid h-10 w-10 place-items-center self-start md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="vcr-menu-mark" aria-hidden>
            <span className="vcr-menu-ghost vcr-menu-chroma">
              <MenuGlyph open={open} />
            </span>
            <span className="vcr-menu-ghost vcr-menu-signal">
              <MenuGlyph open={open} />
            </span>
            <span className="vcr-menu-face">
              <MenuGlyph open={open} />
            </span>
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
