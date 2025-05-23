import {PrismaClient} from "@prisma/client";

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();

  return prisma.set.findMany();
})
