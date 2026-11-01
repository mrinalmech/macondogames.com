import Link from "next/link";
import { isCurrentPage } from "@/lib/site";

export function VcrNavLink({
  href,
  label,
  pathname,
}: {
  href: string;
  label: string;
  pathname: string;
}) {
  const active = isCurrentPage(pathname, href);

  return (
    <Link
      href={href}
      className="vcr-nav-link"
      aria-current={active ? "page" : undefined}
    >
      <span className="vcr-nav-label">{label}</span>
    </Link>
  );
}

export function VcrNav({
  label,
  links,
  pathname,
  className,
}: {
  label: string;
  links: readonly { href: string; label: string }[];
  pathname: string;
  className?: string;
}) {
  return (
    <nav aria-label={label} className={className}>
      {links.map((link) => (
        <VcrNavLink key={link.href} pathname={pathname} {...link} />
      ))}
    </nav>
  );
}
