// service layer
import { prisma } from "@/lib/prisma";

export async function createApp(appName: string, userId: string) {
  return prisma.app.create({
    data: {
      name: appName,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export async function fetchApplications(userId: string) {
  return prisma.app.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      name: true,
      plan: true,
      updatedAt: true,
      user: {
        select: {
          name: true,
        },
      },
    },
  });
}
