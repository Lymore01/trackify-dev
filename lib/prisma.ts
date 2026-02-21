import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const rawUrl = process.env.DIRECT_URL ?? "";
const connectionString = rawUrl
  .replace(/[?&]sslmode=[^&]*/g, (match) => (match.startsWith("?") ? "?" : ""))
  .replace(/\?$/, "");

// Bypass TLS cert validation for self-signed/private CA certs (e.g. Supabase pooler)
// rejectUnauthorized: false in pg.Pool alone is not sufficient when the server forces SSL
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const pool = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 30000,
});
const adapter = new PrismaPg(pool);

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: ["query", "info", "warn", "error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
