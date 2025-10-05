import { getEvents, getUploadByUrl, saveEvent } from "@/controllers/event.controller";
import { authenticate } from "@/middleware/auth.middleware";
import { saveFile } from "@/services/file.service";
import { EventSchema } from "@shared/schemas/event.schema";
import { Router } from "express";
import multer from "multer";

export const eventRouter = Router();
eventRouter.use(authenticate);

const upload = multer({ storage: multer.memoryStorage() });

eventRouter.get("/", async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 20;
  const { events, totalPages, currentPage } = await getEvents(page, pageSize);

  res.json({ events, totalPages, currentPage });
});

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

eventRouter.post("/upload/:url", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const { url } = req.params;
  const { secret } = req.body;

  const upload = await getUploadByUrl(url, secret);
  if (!upload) {
    return res.status(404).json({ error: "Upload not found" });
  }

  await saveFile(req.file.buffer, `uploads/${upload.url}`);

  res.json({ message: "File uploaded successfully" });
});
