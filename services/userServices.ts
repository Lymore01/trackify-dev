import { prisma } from "@/lib/prisma";

export async function fetchUser(email: string) {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
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
