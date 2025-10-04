import { getPackageVersion } from "@/config/server.config";
import type { HealthCheckResponse } from "@shared/types";
import express from "express";
import cron from "node-cron";
import { adminRouter, authRouter, eventRouter, schoolRouter } from "./routers";
import { checkSchools, syncSchools } from "./services/msip.service";
import chatRouter from "./routers/chat.router";
import { Server, Socket } from 'socket.io';
import { handleSocketIo } from "./services/chat.service";

const app = express();
const PORT = Bun.env.PORT || 5000;
const VERSION = getPackageVersion();

app.use(express.json());
app.use("/auth", authRouter);
app.use("/schools", schoolRouter);
app.use("/events", eventRouter);
app.use("/admin", adminRouter);
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

cron.schedule("0 2 * * *", async () => {
  try {
    await syncSchools();
  } catch (err) {
    console.error("❌ School sync failed:", err);
  }
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  checkSchools();
});

const io = new Server(server, {
  // path: "/ws",
  cors: { origin: "*" },
});

io.on("connect", handleSocketIo)
