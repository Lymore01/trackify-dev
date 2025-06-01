import crypto from "crypto";

export function hashPassword(password: string, salt: string) {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password.normalize(), salt, 64, (err, hash) => {
      if (err) reject(err);
      resolve(hash.toString("hex"));
    });
  });
}

export async function comparePassword({
  password,
  hashedPassword,
  salt,
}: {
  password: string;
  hashedPassword: string;
  salt: string;
}) {
  const inputHashedPassword = (await hashPassword(password, salt)) as string;

  return crypto.timingSafeEqual(
    Buffer.from(inputHashedPassword, "hex"),
    Buffer.from(hashedPassword, "hex")
  );
}

export function generateSalt() {
  return crypto.randomBytes(16).toString("hex").normalize();
}

