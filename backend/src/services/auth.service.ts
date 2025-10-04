import jwt from "jsonwebtoken";
import redis from "@/config/redis.config";

const JWT_SECRET = Bun.env.JWT_SECRET || "secret";
const REFRESH_TOKEN_EXPIRY = 60 * 60 * 24 * 3; // 3 days

type TokenPair = {
  accessToken: string;
  refreshToken: string;
};

export async function generateTokenPair(userId: string): Promise<TokenPair> {
  const accessToken = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = Bun.randomUUIDv7();

  await redis.set(refreshToken, userId, "EX", REFRESH_TOKEN_EXPIRY);

  return { accessToken, refreshToken };
}

export async function refreshAccessToken(
  refreshToken: string
): Promise<string> {
  const userId = await redis.get(refreshToken);
  if (!userId) {
    throw new Error("Invalid refresh token");
  }

  await redis.expire(refreshToken, REFRESH_TOKEN_EXPIRY); // Prolong the expiry

  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "15m",
  });
}

export async function verifyAccessToken(token: string): Promise<string> {
  try {
    const { userId } = jwt.verify(token, JWT_SECRET) as { userId: string };
    return userId;
  } catch {
    throw new Error("Invalid access token");
  }
}

export async function logout(refreshToken: string): Promise<void> {
  await redis.del(refreshToken);
}
