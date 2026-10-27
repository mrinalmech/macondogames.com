export const characters = [
  {
    code: "01",
    callsign: "Heavy Suit",
    playstyle: "Suppression",
    accent: "ember" as const,
    body: "Walk the fire line. Thick armor, wide-bore cannons, and enough mass to hold a corridor while the rest of the team reloads.",
  },
  {
    code: "02",
    callsign: "Street Runner",
    playstyle: "Rush",
    accent: "hot" as const,
    body: "Hit the pavement first. Dash, slide, and close the gap — a close-range specialist built for Saturday-morning chaos.",
  },
  {
    code: "03",
    callsign: "Arc Gunner",
    playstyle: "Control",
    accent: "signal" as const,
    body: "Hold the skyline. Mid-to-long kits, chaining shots, and gadget fire that turns a hallway into a light show.",
  },
] as const;

export const features = [
  {
    kicker: "The Good",
    title: "Three playstyles",
    body: "Swap operatives mid-campaign. Each suit reads differently in motion so replays actually change how you fight.",
  },
  {
    kicker: "The Bad",
    title: "Bosses & locales",
    body: "Blast through cartoon-noir cities, industrial yards, and sky-high set pieces packed with hordes and named threats.",
  },
  {
    kicker: "The Upgrades",
    title: "Suits & steel",
    body: "Earn points, kit your armor, and rewrite your loadout so the next run does not play like the last.",
  },
  {
    kicker: "Co-op",
    title: "Shared screen",
    body: "Local co-op and Remote Play Together — Saturday-morning justice is better with a second controller.",
  },
] as const;

export const logs = [
  {
    date: "Dev log",
    title: "First transmission",
    excerpt:
      "Studio notes, Global Steel updates, and the first public look at how the cartoon steel is taking shape.",
  },
  {
    date: "Dev log",
    title: "Inside the steelworks",
    excerpt:
      "Level beats, enemy reads, and the tools behind a 2D run-and-gun that still feels like 1986.",
  },
  {
    date: "Dev log",
    title: "Community signal",
    excerpt:
      "Wishlist beats, playtest windows, and where to plug in once the broadcast goes live.",
  },
] as const;
