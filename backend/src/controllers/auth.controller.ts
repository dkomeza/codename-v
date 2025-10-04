import { signJWT } from "@/services/auth.service";
import { PrismaClient } from "@prisma/client";
import type { SignUpData } from "@shared/types/auth";

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

export const register = async (data: SignUpData) => {
  const hashedPassword = await Bun.password.hash(data.password);

  const newUser = await prisma.user.create({
    data: {
      name: data.name,
      surname: data.surname,
      email: data.email,
      password: hashedPassword,
      type: "VOLUNTEER",
      birthDate: data.birthDate,
    },
  });

  return signJWT(newUser.id);
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

  if (!(await Bun.password.verify(password, userFound!.password))) {
    throw new Error("Invalid password or email!");
  }

  return signJWT(userFound.id);
};
