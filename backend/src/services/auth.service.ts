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

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];

  if (!token) {
    res.status(403).json({message: 'Token not provided!'});
  }

  try {
    const data = jwt.verify((token as string).replace('Bearer ', ''), JWT_SECRET) as JWTPayload;

    const userFound = prisma.user.findFirst({
      select: {
        id: true,
        type: true
      },
      where: {
        id: data.id
      }
    });

    res.locals.userId = userFound.id;
    res.locals.userType = userFound.type;

    if (!userFound) {
      res.status(401).json({message: 'User not present in database!'});
    }

    next();
  } catch(e: any) {
    res.status(500).json({message: e.message});
  }
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
