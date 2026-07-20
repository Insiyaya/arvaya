import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

// Lazy singleton — only instantiates when first accessed, so the app starts
// without a DATABASE_URL (frontend/dummy-data pages won't trigger this).
export function getPrisma(): PrismaClient {
  if (!globalThis.__prisma) {
    globalThis.__prisma = new PrismaClient();
  }
  return globalThis.__prisma;
}

// Named export for convenience in API routes
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    return getPrisma()[prop as keyof PrismaClient];
  },
});
