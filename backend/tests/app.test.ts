import { test, expect } from "bun:test";
import "@/app";

import { healthCheck } from "@shared/api";

test("Health check", async () => {
  const health = await healthCheck();
  expect(health.status).toBe("ok");
});
