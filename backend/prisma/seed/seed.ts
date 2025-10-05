import { PrismaClient } from "@prisma/client";
import seedData from "./testData.json";

const prisma = new PrismaClient();

async function main() {
  //Delete existing data
  await prisma.user.deleteMany();

  // Create users
  for (const userData of seedData.users) {
    await prisma.user.create({
      data: userData,
    });
  }

  console.log("Database has been seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    return;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
