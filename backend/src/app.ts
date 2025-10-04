import { getPackageVersion } from "@/config/server.config";
import type { HealthCheckResponse } from "@shared/types";
import * as express from "express";
import cron from "node-cron";
import { authRouter, eventRouter, schoolRouter } from "./routers";
import { checkSchools, syncSchools } from "./services/msip.service";

const app = express();
const PORT = Bun.env.PORT || 5000;
const VERSION = getPackageVersion();

app.use(express.json());
app.use("/auth/", authRouter);
app.use("/schools/", schoolRouter);
app.use("/events/", eventRouter);

// Required to make sure that the container is healthy
app.get("/health", (_req, res) => {
  const healthCheckResponse: HealthCheckResponse = {
    status: "ok",
    version: VERSION,
    latency: 0, // This will be updated in the health check
  };

  res.json(healthCheckResponse);
});

cron.schedule("0 2 * * *", async () => {
  try {
    await syncSchools();
  } catch (err) {
    console.error("❌ School sync failed:", err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  checkSchools();
});
