import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (url.pathname.startsWith("/api")) {
    const origin = req.headers.get("origin");
    const allowedOrigin = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "");
    if (origin && origin.replace(/\/$/, "") !== allowedOrigin) {
      return new NextResponse(
        JSON.stringify({ message: "Forbidden: Invalid origin" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  if (url.pathname.startsWith("/dashboard")) {
    const session = await auth();

    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/dashboard/:path*"],
};
