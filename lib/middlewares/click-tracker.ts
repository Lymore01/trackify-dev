import { NextRequest } from "next/server";
import { config } from "@/config/config";

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
  const referrer = req.headers.get("referer") || "direct";

  // Extract UTM parameters
  const searchParams = req.nextUrl.searchParams;
  const utm = {
    source: searchParams.get("utm_source"),
    medium: searchParams.get("utm_medium"),
    campaign: searchParams.get("utm_campaign"),
  };

  const baseUrl = config.BASE_URL || req.nextUrl.origin;

  await fetch(`${baseUrl}/api/track`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ shortId, ip, userAgent, utm, referrer }),
  });
}
