import Redis from "ioredis";

const redis = new Redis({
  host: Bun.env.REDIS_HOST,
  port: parseInt(Bun.env.REDIS_PORT || "6379"),
  password: Bun.env.REDIS_PASSWORD || undefined,
});

export default redis;
