import {PrismaClient} from "@prisma/client";

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  const body = await readBody(event)

  console.log("body", body);

  return prisma.collection.upsert({
    where: {id: {userId: 1, cardId: body.cardId}},
    update: {
      plain: body.plain,
      foil: body.foil,
      notes: body.notes,
    },
    create: {
      userId: 1,
      cardId: body.cardId,
      plain: body.plain,
      foil: body.foil,
      notes: body.notes,
    }
  });
})
