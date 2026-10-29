"use client";

import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faFacebookF,
  faInstagram,
  faTwitch,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { isCurrentPage, navLinks } from "@/lib/site";
import styles from "./footer.module.scss";

config.autoAddCss = false;

const socialLinks = [
  { href: "https://x.com/macondogames_in", label: "X", icon: faXTwitter },
  {
    href: "https://www.facebook.com/macondostudios",
    label: "Facebook",
    icon: faFacebookF,
  },
  {
    href: "https://www.instagram.com/macondogames_in",
    label: "Instagram",
    icon: faInstagram,
  },
  {
    href: "https://www.youtube.com/channel/UCfYKziK0Ll8UZ9AiMTZT9DA",
    label: "YouTube",
    icon: faYoutube,
  },
  { href: "https://discord.gg/qVBvuy7Ny3", label: "Discord", icon: faDiscord },
  {
    href: "https://www.twitch.tv/macondogames",
    label: "Twitch",
    icon: faTwitch,
  },
];

export function Footer({ year }: { year: ReactNode }) {
  const pathname = usePathname();

  return (
    <footer className={`${styles.footer} mt-auto`}>
      <div className={`${styles.group} edge-links`}>
        <nav aria-label="Footer" className="flex items-center justify-center gap-1">
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
        <ul className={styles.social}>
          {socialLinks.map(({ href, label, icon }) => (
            <li key={href}>
              <a
                aria-label={label}
                className="vcr-icon-link"
                href={href}
                target="_blank"
                rel="noreferrer"
              >
                <span className="vcr-icon-mark">
                  <span className="vcr-icon-ghost vcr-icon-chroma" aria-hidden="true">
                    <FontAwesomeIcon icon={icon} />
                  </span>
                  <span className="vcr-icon-ghost vcr-icon-signal" aria-hidden="true">
                    <FontAwesomeIcon icon={icon} />
                  </span>
                  <FontAwesomeIcon className="vcr-icon-face" icon={icon} />
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className={styles.copy}>Copyright © {year} | Macondo Games Pvt. Ltd.</p>
      </div>
    </footer>
  );
}
