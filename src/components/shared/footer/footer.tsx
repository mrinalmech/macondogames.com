"use client";

import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faFacebookF,
  faInstagram,
  faSteam,
  faTwitch,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { VcrMark } from "@/components/shared/vcr-mark";
import { VcrNav } from "@/components/shared/vcr-nav-link";
import { navLinks } from "@/lib/site";
import styles from "./footer.module.scss";

config.autoAddCss = false;

const socialLinks = [
  {
    href: "https://store.steampowered.com/app/1073970/",
    label: "Steam",
    icon: faSteam,
  },
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
        <VcrNav
          label="Footer"
          links={navLinks}
          pathname={pathname}
          className="flex items-center justify-center gap-1"
        />
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
                <VcrMark name="vcr-icon" render={() => <FontAwesomeIcon icon={icon} />} />
              </a>
            </li>
          ))}
        </ul>
        <p className={styles.copy}>Copyright © {year} | Macondo Games Pvt. Ltd.</p>
      </div>
    </footer>
  );
}
