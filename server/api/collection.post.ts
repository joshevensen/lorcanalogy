import {PrismaClient} from "@prisma/client";

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  const body = await readBody(event)

  return prisma.collection.upsert({
    where: {id: {userId: body.userId, cardId: body.cardId}},
    update: {
      plain: body.plain,
      foil: body.foil,
      notes: body.notes,
    },
    create: {
      userId: body.userId,
      cardId: body.cardId,
      plain: body.plain,
      foil: body.foil,
      notes: body.notes,
    }
  });
})
