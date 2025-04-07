import type {PrismaClient} from "@prisma/client";

export default async function (prisma: PrismaClient, userId: number) {
  const allCards = await prisma.card.findMany();

  for (const card of allCards) {
    await prisma.collection.upsert({
      where: {
        id: {
          cardId: card.id,
          userId: userId
        }
      },
      update: {},
      create: {
        cardId: card.id,
        userId: userId,
      }
    })
  }
}
