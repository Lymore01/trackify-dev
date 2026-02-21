import { defineConfig } from "@prisma/config";
import "dotenv/config";

const rawUrl = process.env.DIRECT_URL ?? "";
const url = rawUrl
  .replace(/[?&]sslmode=[^&]*/g, (m) => (m.startsWith("?") ? "?" : ""))
  .replace(/\?$/, "");

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url,
  },
});
