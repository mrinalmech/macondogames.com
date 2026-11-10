export const shots: { src: string; alt: string }[] = [
  {
    src: "/press/global-steel-command.png",
    alt: "Three operators at a world-map console inside a circular command room.",
  },
  {
    src: "/press/global-steel-wasteland.png",
    alt: "A blue-suited hero with energy rings standing in a wasteland between soldiers and a tank.",
  },
  {
    src: "/press/global-steel-hall-guards.png",
    alt: "A blue-suited runner crossing a candlelit hall toward two sword-wielding guards.",
  },
  {
    src: "/press/global-steel-stained-glass.png",
    alt: "A blue-suited hero facing a winged, flaming figure in a ruined hall of stained glass.",
  },
  {
    src: "/press/global-steel-castle.png",
    alt: "A blue-suited hero on a ruined road, with a radio message that the castle is just up ahead.",
  },
];

export const companyLogo = {
  src: "/press/company-logo.png",
  alt: "Macondo Games",
  width: 567,
  height: 567,
};

export const gameLogo = {
  src: "/press/game-logo.png",
  alt: "Global Steel",
  width: 1610,
  height: 752,
};

export const downloads = {
  screenshots: {
    href: "/press/download/screenshots",
    filename: "global-steel-screenshots.zip",
    label: "Download screenshots",
    files: shots.map((shot) => shot.src),
  },
  logos: {
    href: "/press/download/logos",
    filename: "press-logos.zip",
    label: "Download logos",
    files: [companyLogo.src, gameLogo.src],
  },
} as const;
