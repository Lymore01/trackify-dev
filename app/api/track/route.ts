import { apiResponse } from "@/lib/utils";
import {
  addClickTracking,
  getClickTrackingPerShortId,
} from "@/services/trackingServices";
import { updateUrl } from "@/services/urlServices";
import { NextResponse } from "next/server";
// import geoip from "geoip-lite";
import { UAParser } from "ua-parser-js";

export async function POST(req: Request) {
  try {
    const { shortId, ip, userAgent } = await req.json();

    // todo: add geolocation tracking
    //   const geo = ip ? geoip.lookup(ip) : null;
    const deviceInfo = new UAParser(userAgent).getResult();

    //   todo: uncomment this later
    /* const existing = await getClickTracking(ip);

  if (existing.length > 0) {
    return NextResponse.json({ success: false, message: "Already tracked" });
  } */

    await addClickTracking({
      shortId,
      ip: ip || "unknown",
      geo: null,
      deviceInfo: deviceInfo || null,
    });


    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/track error:", error);
    return apiResponse({ error: "Internal Server Error" }, 500);
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const linkId = searchParams.get("id");
    if (!linkId) {
      return apiResponse({ error: "Missing link ID" }, 400);
    }

    const clicks = await getClickTrackingPerShortId(linkId);

    return apiResponse({ clicks }, 200);
  } catch (error) {
    console.error("GET /api/track?id={id} error:", error);
    return apiResponse({ error: "Internal Server Error" }, 500);
  }
}
