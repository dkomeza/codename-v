import prisma from "@/config/postgres.config";

export async function clearDatabase() {
  await prisma.$transaction([
    prisma.event.deleteMany(),
    prisma.eventCategory.deleteMany(),
    prisma.message.deleteMany(),
    prisma.chat.deleteMany(),

    prisma.school.deleteMany(),
    prisma.secureUpload.deleteMany(),

    prisma.organization.deleteMany(),
    prisma.user.deleteMany(),
  ]);
}
