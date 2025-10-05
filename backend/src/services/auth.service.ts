import { type NextFunction, type Request, type Response } from "express";
import * as jwt from "jsonwebtoken";

const JWT_SECRET = Bun.env.JWT_SECRET || "secret";

type JWTPayload = {
  id: string;
};

export const signJWT = (userId: string) => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: 86400,
  });
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (res.locals.type !== 0) {
    res.status(403).json({ message: "You are forbidden to access this endpoint!" });
  }

  next();
};

export const isOrganiser = (req: Request, res: Response, next: NextFunction) => {
  if (res.locals.type !== 1) {
    res.status(403).json({ message: "You are forbidden to access this endpoint!" });
  }

  next();
};

export const isCoordinator = (req: Request, res: Response, next: NextFunction) => {
  if (res.locals.type !== 2) {
    res.status(403).json({ message: "You are forbidden to access this endpoint!" });
  }

  next();
};
