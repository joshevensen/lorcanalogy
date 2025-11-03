import { prisma } from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  try {
    return await prisma.set.findMany({
      orderBy: { id: "asc" },
    });
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch sets",
    });
  }
});
