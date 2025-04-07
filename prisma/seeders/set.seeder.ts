import type {PrismaClient, Set} from "@prisma/client";
import type {SET} from "~/data/data.types";

export default function (prisma: PrismaClient, dataSet: SET) {
  const set: Set = {
    id: Number(dataSet.code),
    name: dataSet.name,
    releasedAt: dataSet.released_at
  }

  return prisma.set.upsert({
    where: {name: set.name},
    update: set,
    create: set,
  })
}
