import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function generateHMAC( secret: string, payload: string | Buffer){
  return crypto.createHmac("sha256", secret).update(payload).digest("hex")
}