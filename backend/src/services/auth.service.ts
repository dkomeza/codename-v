const JWT_SECRET = Bun.env.JWT_SECRET || "secret";

type TokenPair = {
  accessToken: string;
  refreshToken: string;
};
