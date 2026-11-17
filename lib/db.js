import { PrismaClient } from "@prisma/client";
const g = globalThis;
export const prisma = g.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") g.prisma = prisma;
export const fa = (n) => Number(n).toLocaleString("fa-IR");
