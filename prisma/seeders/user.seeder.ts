import type {PrismaClient} from "@prisma/client";
import {Prisma} from "@prisma/client";

export default async function (prisma: PrismaClient, userData: Prisma.UserCreateInput) {
  const user = await prisma.user.upsert({
    where: {email: userData.email},
    update: {},
    create: userData,
  })

  // const allCards = await prisma.card.findMany();
  //
  // for (const card of allCards) {
  //   await prisma.collection.upsert({
  //     where: {
  //       id: {
  //         cardId: card.id,
  //         userId: user.id
  //       }
  //     },
  //     update: {},
  //     create: {
  //       cardId: card.id,
  //       userId: user.id,
  //     }
  //   })
  // }
}
