import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const deleteOrganizationById = async (req: any, res: any) => {
  try {
    const { organizationId } = req.body;

    await prisma.organization.delete({
      where: {
        id: organizationId
      }
    });

    res.status(200).json({ message: `Organizacja o id: ${organizationId} została usunięta!`});
  } catch (e: any) {
    res.status(500).json({ message: 'Błąd serwera!' });
  }
};

export const update = () => {
  
};

export const getOrganizationById = async (req: any, res: any) => {
  try {
    const { organizationId } = req.body;

    const organization = await prisma.organization.findFirst({
      where: {
        id: organizationId
      }
    });

    if (!organization) {
      res.status(404).json({message: `Nie ma organizacji o id: ${organizationId}!`});
    }

    res.status(200).json();
  } catch (e: any) {
    res.status(500).json({ message: 'Błąd serwera!' });
  }
};

export const getAllOrganizations = async (req: any, res: any) => {
  try {
    res.status(200).json(await prisma.organization.findMany());
  } catch (e: any) {
    res.status(500).json({ message: 'Błąd serwera!' });
  }
};
