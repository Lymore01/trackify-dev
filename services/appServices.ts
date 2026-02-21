import { prisma } from "@/lib/prisma";
import { ValidationError } from "@/lib/exceptions";

export async function createApp(appName: string, userId: string) {
  const existingApp = await prisma.app.findFirst({
    where: {
      name: appName,
      userId: userId,
    },
  });

  if (existingApp) {
    throw new ValidationError("An application with this name already exists");
  }

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
    orderBy: {
      createdAt: "desc",
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

export async function fetchApplicationByShortId(shortId: string) {
  return await prisma.urlShort.findUnique({
    where: {
      shortId,
    },
    include: {
      App: {
        select: {
          endpoint: true,
          name: true,
        },
      },
    },
  });
}
