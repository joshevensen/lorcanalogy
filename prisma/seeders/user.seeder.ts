import type {PrismaClient} from "@prisma/client";
import {Prisma} from "@prisma/client";

export default async function (prisma: PrismaClient, userData: Prisma.UserCreateInput) {
  return prisma.user.upsert({
    where: {authId: userData.authId},
    update: {},
    create: userData,
  })
}
