import * as jwt from "jsonwebtoken";

const JWT_SECRET = Bun.env.JWT_SECRET || "secret";

export const signJWT = (userId: string) => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: 86400,
  });
};
