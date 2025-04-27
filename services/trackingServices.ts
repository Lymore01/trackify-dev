import { prisma } from "@/lib/prisma";

export async function addClickTracking({
  shortId,
  ip,
  geo,
  deviceInfo,
}: {
  shortId: string;
  ip: string | null;
  geo: any | null;
  deviceInfo: any;
}) {
  return prisma.clickTracker.create({
    data: {
      url: { connect: { shortId } },
      ip: ip || "unknown",
      country: geo?.country || "unknown",
      userAgent: deviceInfo.ua || "unknown",
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
        select: {
          id: true,
          ip: true,
          country: true,
          userAgent: true,
          createdAt: true,
        },
      },
    },
  });
}
