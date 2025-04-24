const environmentVaraibles = {
  DB_URL: process.env.DATABASE_URL || "",
  REDIS_URL: process.env.UPSTASH_REDIS_REST_URL || "",
  REDIS_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN || "",
  COOKIE_SESSION_KEY: process.env.COOKIE_SESSION_KEY || "session-id",
  // add more here
};

type configType = typeof environmentVaraibles;

export const config: configType = { ...environmentVaraibles };
