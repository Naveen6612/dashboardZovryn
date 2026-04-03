import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const role = request.cookies.get("role")?.value;

  const isLoginPage = request.nextUrl.pathname === "/login";

  // If NOT logged in → go to login
  if (!role && !isLoginPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If already logged in → don't go to login again
  if (role && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
