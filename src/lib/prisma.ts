import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

// Singleton pattern — required in Next.js dev mode, where hot-reload would
// otherwise instantiate a new PrismaClient (and a new connection pool) on
// every file change, eventually exhausting Neon's connection limit.
// See: https://www.prisma.io/docs/guides/nextjs

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set — check your .env.local file.");
}

const adapter = new PrismaNeon({ connectionString });

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}