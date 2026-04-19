import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const session = await getToken({ req, secret });

  const isLoggedIn = !!session;
  const isLoginPage = path === "/";
  const isProtected = path.startsWith("/orders");

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/orders", req.url));
  }
}

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|icon.svg|apple-icon.png).*)",
  ],
};
