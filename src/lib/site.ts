export const site = {
  name: "Macondo Games",
  url: "https://macondogames.com",
  description:
    "Macondo Games is an independent game studio in Panjim, Goa. Global Steel is a 2D run-and-gun platformer inspired by 1980s cartoons and arcade shooters.",
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

export function isCurrentPage(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}
