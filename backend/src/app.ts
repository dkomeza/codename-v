import express from "express";
import type { HealthCheckResponse } from "@shared/types";
import { getPackageVersion } from "@/config/server.config";

const app = express();
const PORT = Bun.env.PORT || 5000;
const VERSION = getPackageVersion();

// Required to make sure that the container is healthy
app.get("/health", (_req, res) => {
  const healthCheckResponse: HealthCheckResponse = {
    status: "ok",
    version: VERSION,
    latency: 0, // This will be updated in the health check
  };

  res.json(healthCheckResponse);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
