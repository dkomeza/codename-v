import { saveEvent } from "@/controllers/event.controller";
import { EventSchema } from "@shared/schemas/event.schema";
import { Router } from "express";

export const eventRouter = Router();

eventRouter.get("/", async (req, res) => {});

eventRouter.post("/", async (req, res) => {
  const result = EventSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error.message });
  }

  const eventData = result.data;

  try {
    const urls = await saveEvent(eventData);
    return res.status(201).json({ message: "Event saved successfully", urls: urls });
  } catch (error) {
    return res.status(500).json({ error: "Failed to save event" });
  }
});

