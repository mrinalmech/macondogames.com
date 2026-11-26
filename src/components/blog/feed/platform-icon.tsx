"use client";

import { config } from "@fortawesome/fontawesome-svg-core";
import { faSteam, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FeedPlatform } from "./load-feed";

config.autoAddCss = false;

const icons = {
  steam: faSteam,
  youtube: faYoutube,
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
