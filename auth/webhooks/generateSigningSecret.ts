import crypto from "crypto";

export async function generateSigningSecret() {
  const prefix = "whsec_";
  return prefix.concat(crypto.randomBytes(16).toString("hex").normalize());
}
