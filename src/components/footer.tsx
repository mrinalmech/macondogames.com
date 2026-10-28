"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/site";

function isCurrentPage(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function Footer() {
  const pathname = usePathname();

  return (
    <footer className="mt-auto bg-black">
      <nav
        aria-label="Footer"
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-1 px-4 py-4 sm:px-6"
      >
        {navLinks.map((link) => {
          const active = isCurrentPage(pathname, link.href);
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
    </footer>
  );
}
