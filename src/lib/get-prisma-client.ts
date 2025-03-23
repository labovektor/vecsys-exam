import { PrismaClient } from "@prisma/client";

const createPrismaClient = () =>
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export function getPrismaClient() {
  if (process.env.NODE_ENV === "development")
    globalForPrisma.prisma = createPrismaClient();

  return globalForPrisma.prisma ?? createPrismaClient();
}
