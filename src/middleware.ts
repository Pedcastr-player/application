import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL("/podcasts", request.url));
}

export const config = {
  matcher: "/",
};
