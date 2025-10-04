import prisma from "@/config/postgres.config";
import type { User } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: User | null;
    }
  }
}

const JWT_SECRET = Bun.env.JWT_SECRET || "secret";

type JWTPayload = {
  id: string;
};

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["x-access-token"] || req.headers["authorization"];

  if (!token) {
    res.status(403).json({ message: "Token not provided!" });
  }

  try {
    const data = jwt.verify((token as string).replace("Bearer ", ""), JWT_SECRET) as JWTPayload;

    const userFound = await prisma.user.findFirst({
      where: {
        id: data.id,
      },
    });

    if (!userFound) {
      return res.status(404).json({ message: "User not found!" });
    }

    req.user = userFound;

    if (!userFound) {
      res.status(401).json({ message: "User not present in database!" });
    }

    next();
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
};

export const authenticateAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.type !== "ADMIN") {
    return res.status(403).json({ message: "Require Admin Role!" });
  }

  next();
};
