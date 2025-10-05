import prisma from "@/config/postgres.config";
import type { AdminNewUser } from "@shared/types/admin.types";

export async function getOrgs(page: number, limit: number) {
  return await prisma.organization.findMany({
    skip: (page - 1) * limit,
    take: limit,
    select: {
      id: true,
      organizationName: true,
    },
  });
}

export async function getCoordinators(page: number, limit: number) {
  return await prisma.user.findMany({
    where: {
      type: "COORDINATOR",
    },
    skip: (page - 1) * limit,
    take: limit,
  });
}

export async function getUsers(page: number, limit: number) {
  return await prisma.user.findMany({
    skip: (page - 1) * limit,
    take: limit,
    select: {
      id: true,
      name: true,
      surname: true,
      email: true,
      birthDate: true,
      type: true,
    },
  });
}

export async function modifyUser(id: string, data: Partial<AdminNewUser>) {
  await prisma.user.update({
    where: {
      id: id,
    },
    data: data,
  });
}

export async function deleteUser(id: string) {
  await prisma.$transaction([
    prisma.message.deleteMany({
      where: {
        senderUserId: id,
      },
    }),
    prisma.chat.deleteMany({
      where: {
        users: {
          some: {
            id: id,
          },
        },
      },
    }),
    prisma.user.delete({
      where: {
        id: id,
      },
    }),
  ]);
}

export async function getAdminDashboardData(limit: number) {
  const [orgs, coordinators, users] = await Promise.all([
    getOrgs(1, limit),
    getCoordinators(1, limit),
    getUsers(1, limit),
  ]);

  return {
    orgs,
    coordinators,
    users,
  };
}
