import {PrismaClient} from "@prisma/client";

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();

  return prisma.collection.findMany({
    where: {userId: 1},
    include: {card: true},
    orderBy: {
      card: {
        setNumber: 'asc'
      }
    }
  });
})
