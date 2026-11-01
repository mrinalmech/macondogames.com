"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { headerNavLinks, isCurrentPage, site } from "@/lib/site";
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
// Gap between the M and the G, as a fraction of the logo image width.
const logoGap = 74.5 / 137;
// Where the open panel's left edge meets the bottom of the screen.
const menuFoot = 0.2;

function NavLink({
  href,
  label,
  pathname,
}: {
  href: (typeof headerNavLinks)[number]["href"];
  label: string;
  pathname: string;
}) {
  const active = isCurrentPage(pathname, href);

  return (
    <Link
      href={href}
      className="vcr-nav-link"
      aria-current={active ? "page" : undefined}
    >
      <span className="vcr-nav-label">{label}</span>
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);

  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  useLayoutEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;

    let frame = 0;
    let current = Number.NaN;

    const apply = () => {
      const next = Math.min(1, window.scrollY / barFadeDistance);
      if (Math.abs(current - next) < 0.001) return;
      current = next;
      fill.style.setProperty("--bar-fill", String(next));
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
    const navDesktop = getComputedStyle(document.documentElement)
      .getPropertyValue("--nav-desktop")
      .trim();
    const desktop = window.matchMedia(`(min-width: ${navDesktop})`);
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };

    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useLayoutEffect(() => {
    const logo = logoRef.current;
    const nav = navRef.current;
    if (!logo || !nav) return;

    const apply = () => {
      const logoRect = logo.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();
      if (logoRect.width === 0 || navRect.width === 0) return;

      const cutX = logoRect.left - navRect.left + logoRect.width * logoGap;
      const cutY = logoRect.top - navRect.top + logoRect.height / 2;
      const footX = navRect.width * menuFoot;
      const footY = navRect.height;
      const dx = footX - cutX;
      const dy = footY - cutY;
      const topX = cutX + ((0 - cutY) / dy) * dx;

      nav.style.setProperty("--menu-cut-x", `${cutX}px`);
      nav.style.setProperty("--menu-cut-y", `${cutY}px`);
      nav.style.setProperty("--menu-foot-x", `${footX}px`);
      nav.style.setProperty("--menu-top-x", `${topX}px`);
      nav.style.setProperty(
        "--menu-angle",
        `${(Math.atan2(dx, dy) * 180) / Math.PI}deg`,
      );
      nav.style.setProperty(
        "--menu-link-shift",
        `${logoRect.height / 2 + 28}px`,
      );
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(logo);
    observer.observe(nav);
    window.addEventListener("resize", apply);
    window.visualViewport?.addEventListener("resize", apply);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", apply);
      window.visualViewport?.removeEventListener("resize", apply);
    };
  }, []);

  useLayoutEffect(() => {
    // The hero sizes from its container width. Hiding the scrollbar widens
    // that box, so replace the bar with the same amount of padding.
    const gap = open ? window.innerWidth - document.documentElement.clientWidth : 0;
    document.body.style.overflow = open ? "hidden" : "";
    document.body.style.paddingRight = gap > 0 ? `${gap}px` : "";

    const blocked = [
      document.getElementById("content"),
      document.querySelector("footer"),
      document.querySelector<HTMLElement>('a[href="#content"]'),
    ];

    for (const node of blocked) {
      if (node) node.inert = open;
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      for (const node of blocked) {
        if (node) node.inert = false;
      }
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-[70]">
      <div
        className={`${styles.bar} flex w-full items-center justify-between pb-3 pl-7 pr-4 pt-5 sm:pr-6`}
        data-open={open ? "" : undefined}
      >
        <div ref={fillRef} className={styles.barFill} aria-hidden />
        <Link ref={logoRef} href="/" className="vcr-logo-link -translate-y-1">
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
          {headerNavLinks.map((link) => (
            <NavLink key={link.href} pathname={pathname} {...link} />
          ))}
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

      <div
        className={`${styles.scrim} ${open ? styles.scrimOpen : ""}`}
        aria-hidden
      />
      <nav
        ref={navRef}
        id="mobile-nav"
        className={`${styles.mobileNav} ${open ? styles.mobileNavOpen : ""}`}
        aria-label="Mobile"
        aria-hidden={open ? undefined : true}
        inert={open ? undefined : true}
      >
        <div className={styles.mobileSheet}>
          <ul className={styles.mobileLinks}>
            {headerNavLinks.map((link) => (
              <li key={link.href}>
                <NavLink pathname={pathname} {...link} />
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
