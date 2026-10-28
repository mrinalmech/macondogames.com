export const site = {
  name: "Macondo Games",
  shortName: "MACONDO",
  tagline: "Independent studio. Worlds of steel, signal, and story.",
  featuredGame: {
    title: "Global Steel",
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
