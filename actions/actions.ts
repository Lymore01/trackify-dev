"use server"

import { removeUserFromSession } from "@/auth/core/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logOut() {
  await removeUserFromSession(await cookies());
  redirect("/login");
}

