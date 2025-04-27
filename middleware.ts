import { getUserFromSession } from "@/auth/core/session";
import { NextResponse, type NextRequest } from "next/server";
import { trackClick } from "./lib/middlewares/click-tracker";

const privateRoutePattern = /^\/dashboard(\/|$)/;
const publicRoutePattern = /^\/(login|signup)(\/|$)/;
const redirectRoutesPattern = /^\/u\/[^/]+$/;

export async function middleware(request: NextRequest) {
  const response = (await middlewareAuth(request)) ?? NextResponse.next();
  return response;
}

export async function middlewareAuth(request: NextRequest) {
  if (privateRoutePattern.test(request.nextUrl.pathname)) {
    return handlePrivateRoutes(request);
  }
  if (publicRoutePattern.test(request.nextUrl.pathname)) {
    return handlePublicRoutes(request);
  }
  if(redirectRoutesPattern.test(request.nextUrl.pathname)) {
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
  await trackClick(request)
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
