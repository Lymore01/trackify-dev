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

export async function updateApp(appId: string, appName: string) {
  return prisma.app.update({
    where: {
      id: appId,
    },
    data: {
      name: appName,
    },
  });
}

export async function deleteApp(appId: string, userId: string) {
  return prisma.app.deleteMany({
    where: {
      id: appId,
      userId: userId,
    },
  });
}
