import { signJWT } from "@/services/auth.service";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserByToken = async (req: any, res: any) => {
  try {
    const user = prisma.user.findFirst({
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
      },
      where: {
        id: res.locals.userId,
      },
    });

    res.status(200).json(user);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

export const register = async (req: any, res: any) => {
  try {
    const { name, surname, email, type, password, organizationId, birthDate } = req.body;

    const user = await prisma.user.create({
      data: {
        name: name,
        surname: surname,
        email: email,
        type: type,
        password: Bun.password.hashSync(password, {
          algorithm: "bcrypt",
          cost: 12,
        }),
        organizationId: organizationId,
        birthDate: birthDate,
      },
    });

    res.status(201).json(user);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

export const login = async (email: string, password: string) => {
  const userFound = await prisma.user.findFirst({
    select: {
      id: true,
      password: true,
    },
    where: {
      email: email,
    },
  });

  if (!userFound) {
    throw new Error("Invalid password or email!");
  }

  if (!(await Bun.password.verify(userFound!.password, password))) {
    throw new Error("Invalid password or email!");
  }

  return signJWT(userFound.id);
};
