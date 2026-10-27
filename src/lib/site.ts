export const site = {
  name: "Macondo Games",
  shortName: "MACONDO",
  tagline: "Independent studio. Worlds of steel, signal, and story.",
  featuredGame: {
    title: "Global Steel",
    status: "In development",
    tagline: "SUIT UP. SHOOT 'EM UP. LEVEL UP.",
    logline:
      "A 2D run-and-gun inspired by Saturday-morning cartoons of the 80s.",
    steamUrl: "https://store.steampowered.com/app/1073970/Global_Steel/",
  },
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/press", label: "Press" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
] as const;

export const headerNavLinks = navLinks.filter(
  (link) => link.href !== "/" && link.href !== "/privacy",
);

export type NavHref = (typeof navLinks)[number]["href"];
