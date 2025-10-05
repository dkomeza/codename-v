import { authenticate } from "@/middleware/auth.middleware";
import { Router } from "express";
import { OrgController } from "../controllers/org.controller";

const router = Router();
router.use(authenticate);
const orgController = new OrgController();

// Base routes
router.post("/", orgController.create.bind(orgController));
router.get("/", orgController.getAll.bind(orgController));
router.get("/:id", orgController.getById.bind(orgController));
router.put("/:id", orgController.update.bind(orgController));
router.delete("/:id", orgController.delete.bind(orgController));

// Related resources
router.get("/:id/users", orgController.getUsers.bind(orgController));
router.get("/:id/events", orgController.getEvents.bind(orgController));
router.get("/:id/applications", orgController.getApplications.bind(orgController));

export const orgRouter = router;
