import { prisma } from "@/lib/prisma";
import { urlSchema } from "@/validations/urlValidations";
import { z } from "zod";

export async function createUrl(
  originalUrl: string,
  userId: string,
  appId: string,
  shortId: string,
  description?: string
) {
  return prisma.urlShort.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      App: {
        connect: {
          id: appId,
        },
      },
      shortId: shortId,
      original: originalUrl,
      description: description || "",
    },
  });
}

export async function fetchUrlByShortId(id: string) {
  return await prisma.urlShort.findUnique({
    where: {
      shortId: id,
    },
  });
}

export async function fetchUrl({
  userId,
  appId,
  originalUrl,
  shortId,
}: {
  userId?: string;
  appId?: string;
  originalUrl?: string;
  shortId?: string;
}): Promise<any> {
  const where: any = {};

  if (userId) where.userId = userId;
  if (originalUrl) where.original = originalUrl;
  if (appId) where.appId = appId;
  if (shortId) where.shortId = shortId;

  if (originalUrl) {
    return prisma.urlShort.findFirst({ where });
  }

  return prisma.urlShort.findMany({ where, include: { clicks: true } });
}

export async function deleteUrl(id: string) {
  return prisma.urlShort.delete({
    where: {
      id,
    },
  });
}

export async function updateUrl(
  id: string,
  data: Omit<Partial<z.infer<typeof urlSchema>>, "appId">
) {
  const payload: any = {};

  if (data.originalUrl) payload.original = data.originalUrl;
  if (data.description) payload.description = data.description;
  return prisma.urlShort.update({
    where: {
      id,
    },
    data: payload,
  });
}
