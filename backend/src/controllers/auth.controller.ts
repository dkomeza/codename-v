import { signJWT } from "@/services/auth.service";
import { PrismaClient } from "@prisma/client";
import type { Role, SignUpData } from "@shared/types/auth";

const prisma = new PrismaClient();

export const register = async (data: SignUpData & { type: Role }) => {
  const userExists = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (userExists) {
    throw new Error("User with this email already exists!");
  }

  const hashedPassword = await Bun.password.hash(data.password);

  const newUser = await prisma.user.create({
    data: {
      name: data.name,
      surname: data.surname,
      email: data.email,
      password: hashedPassword,
      type: data.type,
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
