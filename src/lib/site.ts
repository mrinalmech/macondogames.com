export const site = {
  name: "Macondo Games",
  shortName: "MACONDO",
  tagline: "Independent studio. Worlds of steel, signal, and story.",
  featuredGame: {
    title: "Global Steel",
    status: "In development",
    logline:
      "A tactical indie title set in a fractured industrial future — placeholder copy until the public reveal.",
  },
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/press", label: "Press" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
] as const;

export type NavHref = (typeof navLinks)[number]["href"];
