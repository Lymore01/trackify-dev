import { prisma } from "@/lib/prisma";

export async function addClickTracking({
  shortId,
  ip,
  geo,
  deviceInfo,
  utm,
  referrer,
}: {
  shortId: string;
  ip: string | null;
  geo: any | null;
  deviceInfo: Pick<UAParser.IDevice, "type">;
  utm?: { source?: string; medium?: string; campaign?: string };
  referrer?: string | null;
}) {
  return prisma.clickTracker.create({
    data: {
      url: { connect: { shortId } },
      ip: ip || "unknown",
      country: geo?.country || "unknown",
      region: geo?.region,
      userAgent: deviceInfo.type || "unknown",
      utmSource: utm?.source,
      utmMedium: utm?.medium,
      utmCampaign: utm?.campaign,
      referrer: referrer || "direct",
    },
  });
}

export async function getClickTrackingPerIp(ip: string) {
  const clickCounts = await prisma.clickTracker.groupBy({
    by: ["ip", "urlId"],
    _count: {
      id: true,
    },
    orderBy: {
      _count: {
        id: "desc",
      },
    },
  });
  return clickCounts;
}

export async function getClickTrackingPerShortId(shortId: string) {
  return await prisma.urlShort.findMany({
    where: {
      shortId,
    },
    select: {
      clicks: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          ip: true,
          country: true,
          region: true,
          userAgent: true,
          createdAt: true,
          utmSource: true,
          utmCampaign: true,
          utmMedium: true,
          referrer: true,
        },
      },
    },
  });
}

export async function hasAlreadyTracked(ip: string, shortId: string) {
  return await prisma.clickTracker.findFirst({
    where: {
      ip,
    },
  });
}
