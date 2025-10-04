import { getPackageVersion } from "@/config/server.config";
import type { HealthCheckResponse } from "@shared/types";
import express from "express";
import authRouter from "./routers/auth.router";
import chatRouter from "./routers/chat.router";

const app = express();
const PORT = Bun.env.PORT || 5000;
const VERSION = getPackageVersion();

app.use(express.json());
app.use('/auth/', authRouter);
app.use('/chat/', chatRouter);

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
