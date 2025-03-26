import {PrismaClient} from '@prisma/client'
import {Sets} from "~/data/sets";
import {set1Cards} from "~/data/set1";
import {set2Cards} from "~/data/set2";
import {set3Cards} from "~/data/set3";
import {set4Cards} from "~/data/set4";
import {set5Cards} from "~/data/set5";
import {set6Cards} from "~/data/set6";
import {set7Cards} from "~/data/set7";
import setSeeder from "~/prisma/seeders/set.seeder";
import cardSeeder from "~/prisma/seeders/card.seeder";
import userSeeder from "~/prisma/seeders/user.seeder";

const prisma = new PrismaClient()

async function main() {
  for (const set of Sets) {
    await setSeeder(prisma, set);
  }

  for (const card of set1Cards) {
    await cardSeeder(prisma, 1, card)
  }

  for (const card of set2Cards) {
    await cardSeeder(prisma, 2, card)
  }

  for (const card of set3Cards) {
    await cardSeeder(prisma, 3, card)
  }

  for (const card of set4Cards) {
    await cardSeeder(prisma, 4, card)
  }

  for (const card of set5Cards) {
    await cardSeeder(prisma, 5, card)
  }

  for (const card of set6Cards) {
    await cardSeeder(prisma, 6, card)
  }

  for (const card of set7Cards) {
    await cardSeeder(prisma, 7, card)
  }

  await userSeeder(prisma, {
    email: 'josh@lorcanalogy.com',
    password: 'password',
    name: 'Josh Evensen',
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
