import { sendEvents } from "@/auth/webhooks/webhook";
import { apiResponse } from "@/lib/utils";
import { fetchApplicationByShortId } from "@/services/appServices";
import {
  addClickTracking,
  hasAlreadyTracked,
} from "@/services/trackingServices";
import { NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";

async function fetchGeoLocationInfo() {
  try {
    const response = await fetch(`https://ipinfo.io/?token=${process.env.IPINFO_TOKEN}`);
    if (!response.ok) {
      throw new Error(`Geo fetch failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching geolocation info:", err);
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const { shortId, ip, userAgent } = await req.json();

    if (!shortId) {
      return apiResponse(
        { success: false, message: "shortId is required" },
        400
      );
    }

    const deviceInfo = new UAParser(userAgent || "").getResult();

    const geo = await fetchGeoLocationInfo();

    // todo: uncomment
    // const alreadyTracked = await hasAlreadyTracked(ip, shortId);
    // if (alreadyTracked) {
    //   return apiResponse(
    //     {
    //       success: false,
    //       message: "This link has already been tracked from this IP",
    //     },
    //     200
    //   );
    // }

    const payload = {
      shortId,
      ip: geo.ip || ip || "unknown",
      geo: geo,
      deviceInfo: { type: deviceInfo.device.type as UAParser.IDevice['type'] },
    };

    console.log("deviceInfo: ", deviceInfo);

    // Track the click
    await addClickTracking(payload);

    // Fetch app info and send webhook
    const appData = await fetchApplicationByShortId(shortId);

    if (!appData) {
      return apiResponse(
        { success: false, message: "Application not found" },
        404
      );
    }

    await sendEvents({
      appId: appData.appId ?? "",
      evt: "link_clicked",
      data: payload,
      endpoints: appData.App?.endpoint ?? [],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/track error:", error);
    return apiResponse({ error: "Internal Server Error" }, 500);
  }
}