import { prisma } from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  try {
    return await prisma.card.findMany({
      include: { Collection: true },
    });
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch cards",
    });
  }
});
