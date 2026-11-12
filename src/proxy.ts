import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const apex = "https://macondogames.com";

// The one WordPress permalink. Every other path on the blog host is an
// index of that same post: home, category, tags, author, dates, and the feed.
const legacyPost = "/2022/04/20/80s-animation-deep-dive";

function hostname(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "";
  return forwarded.split(",")[0].trim().split(":")[0].toLowerCase();
}

export function proxy(request: NextRequest) {
  const host = hostname(request);
  const path = request.nextUrl.pathname.replace(/\/+$/, "") || "/";

  if (host === "blog.macondogames.com") {
    // Old image files have no page. Let them 404 instead of returning HTML.
    if (path.startsWith("/wp-content")) return NextResponse.next();

    const target =
      path === legacyPost ? `${apex}/blog/80s-animation-deep-dive` : `${apex}/blog`;
    return NextResponse.redirect(target, 301);
  }

  if (host === "www.macondogames.com" || host === "dev.macondogames.com") {
    const target = new URL(request.nextUrl.pathname + request.nextUrl.search, apex);
    return NextResponse.redirect(target, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
