"use client";

import { config } from "@fortawesome/fontawesome-svg-core";
import { faInstagram, faSteam } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FeedPlatform } from "./load-feed";

config.autoAddCss = false;

const icons = {
  steam: faSteam,
  instagram: faInstagram,
} as const;

export function PlatformIcon({
  platform,
  className,
}: {
  platform: FeedPlatform;
  className?: string;
}) {
  return <FontAwesomeIcon icon={icons[platform]} className={className} aria-hidden="true" />;
}
