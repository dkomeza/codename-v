import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



export class OrgService {
  async createOrganization(organizationName: string) {
    return await prisma.organization.create({
      data: { organizationName },
    });
  }

  async getOrganizationById(id: string) {
    return await prisma.organization.findUnique({
      where: { id },
      include: {
        User: {
          select: {
            id: true,
            name: true,
            surname: true,
            email: true,
            type: true,
          },
        },
        Event: {
          include: {
            categoryIdRel: true,
          },
        },
        Application: {
          include: {
            userIdRel: {
              select: {
                id: true,
                name: true,
                surname: true,
                email: true,
              },
            },
            eventIdRel: {
              select: {
                id: true,
                title: true,
                date: true,
              },
            },
          },
        },
      },
    });
  }

  async getAllOrganizations() {
    return await prisma.organization.findMany({
      include: {
        _count: {
          select: {
            User: true,
            Event: true,
            Application: true,
          },
        },
      },
    });
  }

  async updateOrganization(id: string, organizationName: string) {
    return await prisma.organization.update({
      where: { id },
      data: { organizationName },
    });
  }

  async deleteOrganization(id: string) {
    // Check for dependencies
    const org = await prisma.organization.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            User: true,
            Event: true,
            Application: true,
          },
        },
      },
    });

    if (!org) {
      throw new Error("Organization not found");
    }

    if (org._count.User > 0 || org._count.Event > 0 || org._count.Application > 0) {
      throw new Error("Cannot delete organization with existing users, events, or applications");
    }

    return await prisma.organization.delete({
      where: { id },
    });
  }

  async getOrganizationUsers(id: string) {
    return await prisma.user.findMany({
      where: { organizationId: id },
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        type: true,
        birthDate: true,
      },
    });
  }

  async getOrganizationEvents(id: string) {
    return await prisma.event.findMany({
      where: { organizationId: id },
      include: {
        categoryIdRel: true,
        _count: {
          select: {
            Application: true,
            Opinion: true,
          },
        },
      },
    });
  }

  async getOrganizationApplications(id: string) {
    return await prisma.application.findMany({
      where: { organizationId: id },
      include: {
        userIdRel: {
          select: {
            id: true,
            name: true,
            surname: true,
            email: true,
          },
        },
        eventIdRel: {
          select: {
            id: true,
            title: true,
            date: true,
            location: true,
          },
        },
      },
    });
  }
}
