import { PrismaClient } from "@prisma/client";
import { type NextFunction, type Request, type Response } from "express";
import * as jwt from "jsonwebtoken";

const JWT_SECRET = Bun.env.JWT_SECRET || "secret";
const prisma = new PrismaClient();

export const checkDuplicateEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const currEmail = req.body.email;

    const foundUser = await prisma.user.findFirst({
        select: {
          email: true
        },
        where: {
          email: {
            equals: currEmail
          }
        }
    });

    if (foundUser) {
      res.status(400).json('Duplicate user email!');
    }

    next();
  } catch (e: any) {
    res.status(500).json({message: e.message})
  }
};

type JWTPayload = {
  id: string
};



export const signJWT = (userId: string) => {
  return jwt.sign({id: userId}, JWT_SECRET, {
    expiresIn: 86400
  });
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (res.locals.type !== 0) {
    res.status(403).json({message: 'You are forbidden to access this endpoint!'});
  }

  next();
};

export const isOrganiser = (req: Request, res: Response, next: NextFunction) => {
  if (res.locals.type !== 1) {
    res.status(403).json({message: 'You are forbidden to access this endpoint!'});
  }

  next();
};

export const isCoordinator = (req: Request, res: Response, next: NextFunction) => {
  if (res.locals.type !== 2) {
    res.status(403).json({message: 'You are forbidden to access this endpoint!'});
  }

  next();
};
