import { NextResponse } from "next/server";

export function proxy() {
  const response = NextResponse.next();

  // Keep HTML and app routes fresh after deployment so CDN edges do not serve
  // stale markup that points to old Next.js CSS/JS chunks.
  response.headers.set("Cache-Control", "no-store, max-age=0, must-revalidate");
  response.headers.set("CDN-Cache-Control", "no-store");
  response.headers.set("Vercel-CDN-Cache-Control", "no-store");

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|icons|images|videos|favicon.ico|robots.txt|sitemap.xml).*)"]
};
