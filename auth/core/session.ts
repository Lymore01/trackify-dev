import userSchema from "@/schemas/userSchema";
import { z } from "zod";
import { redisClient } from "@/redis/redis";
import { config } from "@/config/config";

const sessionSchema = z.object({
  id: z.string(),
  email: z.string(),
});

type UserType = z.infer<typeof sessionSchema>;
const partialUserSchema = userSchema.partial();

const SESSION_EXPIRATION_SECONDS = 60 * 60 * 24 * 7; // 7 days
const COOKIE_SESSION_KEY = config.COOKIE_SESSION_KEY;
type Cookie = {
  set: (
    key: string,
    value: string,
    options: {
      secure?: boolean;
      httpOnly?: boolean;
      sameSite?: "strict" | "lax" | "none" | false;
      expires?: number;
    },
  ) => void;
  get: (key: string) =>
    | {
        name: string;
        value: string;
      }
    | undefined;
  delete: (key: string) => void;
};

export async function createSession(user: UserType, cookies: Cookie) {
  const sessionId = Array.from(crypto.getRandomValues(new Uint8Array(256)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  await redisClient.set(`Session:${sessionId}`, partialUserSchema.parse(user), {
    ex: SESSION_EXPIRATION_SECONDS,
  });

  setCookie(sessionId, cookies); // in the browser
}

export function setCookie(sessionId: string, cookies: Pick<Cookie, "set">) {
  cookies.set(COOKIE_SESSION_KEY, sessionId, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    expires: Date.now() + SESSION_EXPIRATION_SECONDS * 1000,
  });
}

export async function getUserFromSession(
  cookies: Pick<Cookie, "get">,
): Promise<UserType | null> {
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;

  if (!sessionId) return null;

  return await getSessionById(sessionId); //from redis
}

export async function getSessionById(sessionId: string) {
  const rawUser = await redisClient.get(`Session:${sessionId}`);

  const { success, data: user } = sessionSchema.safeParse(rawUser);

  return success ? user : null;
}

export async function removeUserFromSession(
  cookies: Pick<Cookie, "get" | "delete">,
) {
  // remove from cookie
  const sessionId = cookies.get(COOKIE_SESSION_KEY)?.value;
  if (!sessionId) return null;
  // remove from redis
  await redisClient.del(`Session:${sessionId}`);
  cookies.delete(COOKIE_SESSION_KEY);
}
