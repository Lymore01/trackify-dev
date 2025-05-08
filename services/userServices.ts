import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";

export async function fetchUser(email: string) {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
  });
}

export async function fetchUserById(id: string, select?: Partial<Record<keyof User, boolean>>) {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: select,
  });
}

export async function createUser(_data: {
  name: string;
  email: string;
  password: string;
  salt: string;
}) {
  return prisma.user.create({
    data: _data,
  });
}

export async function updateApiKey({
  userId,
  apiKey,
}: {
  userId: string;
  apiKey: string;
}) {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      apiKey: apiKey,
    },
  });
}
