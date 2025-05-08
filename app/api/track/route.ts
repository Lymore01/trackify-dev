import { prisma } from "@/lib/prisma";
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

    // Trigger a "link_clicked" webhook event if successfull
    // get the webhook for the link
    const data = await prisma.urlShort.findUnique({
      where: {
        shortId,
      },
      include: {
        App: {
          select: {
            endpoint: {
              select: {
                url: true,
              },
            },
          },
        },
      },
    });

    const endpointUrl = data?.App?.endpoint?.[0]?.url;

    // send the event

    await fetch(
      "https://a2fa-2c0f-6300-c05-e800-a1dd-67e5-4ce0-cd01.ngrok-free.app/webhook",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          linkId: "ABC123",
          eventType: "link_clicked",
          clickTime: "2025-05-06T14:30:00Z"
        }),
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/track error:", error);
    return apiResponse({ error: "Internal Server Error" }, 500);
  }
}
