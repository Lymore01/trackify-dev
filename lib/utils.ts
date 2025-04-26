import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto";
import { NextResponse } from "next/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const delay = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function generateHMAC(secret: string, payload: string | Buffer) {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

export function getDaysDifference(dateString: string) {
  const givenDate = new Date(dateString);
  const today = new Date();

  const differenceInMilliseconds = today.getTime() - givenDate.getTime();

  const differenceInDays = Math.floor(
    differenceInMilliseconds / (1000 * 60 * 60 * 24)
  );

  return differenceInDays;
}

// api repsonse
export function apiResponse(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

export const generateShortId: () => string = () => {
  return Math.random().toString(36).substring(2, 7);
}