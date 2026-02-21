import { getUserFromSession } from "@/auth/core/session";
import { NextResponse, type NextRequest } from "next/server";
import { trackClick } from "./lib/middlewares/click-tracker";
import { ratelimit } from "./lib/ratelimit";

const privateRoutePattern = /^\/dashboard(\/|$)/;
const publicRoutePattern =
  /^\/(login|signup|forgot-password|reset-password)(\/|$)/;
const redirectRoutesPattern = /^\/u\/[^/]+$/;

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Only rate-limit API routes — not every dashboard navigation
  if (pathname.startsWith("/api/")) {
    const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
    const { success, limit, reset, remaining } = await ratelimit.limit(
      `ratelimit_${ip}`,
    );

    if (!success) {
      return new NextResponse("Too Many Requests", {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
      });
    }
  }

  const response = (await proxyAuth(request)) ?? NextResponse.next();
  return response;
}

export async function proxyAuth(request: NextRequest) {
  if (privateRoutePattern.test(request.nextUrl.pathname)) {
    return handlePrivateRoutes(request);
  }
  if (publicRoutePattern.test(request.nextUrl.pathname)) {
    return handlePublicRoutes(request);
  }
  if (redirectRoutesPattern.test(request.nextUrl.pathname)) {
    return handleRedirectRoutes(request);
  }
}

export async function handlePrivateRoutes(request: NextRequest) {
  const user = await getUserFromSession(request.cookies);

  if (user == null) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export async function handlePublicRoutes(request: NextRequest) {
  const user = await getUserFromSession(request.cookies);
  if (user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}

export async function handleRedirectRoutes(request: NextRequest) {
  // Fire-and-forget — don't block the redirect waiting for tracking to complete
  trackClick(request).catch(() => {});
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
