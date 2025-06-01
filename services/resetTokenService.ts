import { prisma } from "@/lib/prisma";

export async function storeEmailToken({
  token,
  email,
  expiresAt,
}: {
  token: string;
  email: string;
  expiresAt: Date;
}) {
  return await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expiresAt,
    },
  });
}

export async function resetToken({
  email,
  token,
}: {
  token: string;
  email: string;
}) {
  return await prisma.passwordResetToken.findFirst({
    where: {
      email,
      token,
      expiresAt: {
        gte: new Date(),
      },
    },
  });
}

export async function deleteResetToken(token: string) {
  return await prisma.passwordResetToken.delete({
    where: { token },
  });
}
