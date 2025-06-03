import { fetchUrlByShortId } from "@/services/urlServices";
import { NextRequest } from "next/server";

export function getClientIp(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.headers.get("x-real-ip") ?? null;
}

export async function trackClick(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const shortId = pathname.split("/")[2];
  const ip = getClientIp(req);
  const userAgent = req.headers.get("user-agent") || "unknown";

  const url = fetchUrlByShortId(shortId);

  if (!url) return;

  await fetch(`https://trackify-dev-69k7.vercel.app/api/track`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ shortId, ip, userAgent }),
  });
}
