// get current user

import { prisma } from "@/lib/prisma";
import { cache } from "react";
import { getUserFromSession } from "./session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type FullUser = Exclude<
  Awaited<ReturnType<typeof getUserFromDb>>,
  undefined | null
>;

type User = Exclude<
  Awaited<ReturnType<typeof getUserFromDb>>,
  undefined | null
>;

type SessionUser = {
  id: string;
  email: string;
};

function _getCurrentUser(options: {
  withFullUser: true;
  redirectIfNotFound: true;
}): Promise<FullUser>;
function _getCurrentUser(options: {
  withFullUser: true;
  redirectIfNotFound?: false;
}): Promise<User | null>;
function _getCurrentUser(options: {
  withFullUser?: false;
  redirectIfNotFound: true;
}): Promise<User>;
function _getCurrentUser(options: {
  withFullUser?: false;
  redirectIfNotFound?: false;
}): Promise<User | null>;

async function _getCurrentUser({
  withFullUser = false,
  redirectIfNotFound = false,
}) {
  const user = (await getUserFromSession(
    await cookies()
  )) as SessionUser | null;

  if (user == null) {
    if (redirectIfNotFound) return redirect("/login");
    return null;
  }

  const fullUser = withFullUser ? await getUserFromDb(user.id) : null;

  if (withFullUser) {
    if (!fullUser) throw new Error("User not found in the database");
    return fullUser;
  }

  return user;
}

export const getCurrentUser = cache(_getCurrentUser);

async function getUserFromDb(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user ?? null;
}
