import {
  deleteUser,
  getAdminDashboardData,
  getUsers,
  modifyUser,
} from "@/controllers/admin.controller";
import { register } from "@/controllers/auth.controller";
import { authenticate, authenticateAdmin } from "@/middleware/auth.middleware";
import { NewUserSchema } from "@shared/schemas/admin.schema";
import { Router } from "express";

const adminRouter = Router();
adminRouter.use(authenticate);
adminRouter.use(authenticateAdmin);

export default adminRouter;

adminRouter.get("/", async (req, res) => {
  const pageSize = 20;

  const data = await getAdminDashboardData(pageSize);
  res.status(200).json(data);
});

adminRouter.get("/users", async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 50;

  try {
    const data = await getUsers(page, limit);
    res.status(200).json(data);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
});

adminRouter.post("/users", async (req, res) => {
  const result = NewUserSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ message: "Invalid request data", errors: result.error.message });
  }

  const newUserData = result.data;

  try {
    await register({
      ...newUserData,
      confirmPassword: newUserData.password,
    });
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
});

adminRouter.put("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const result = NewUserSchema.partial().safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ message: "Invalid request data", errors: result.error.message });
  }

  const updateData = result.data;

  try {
    await modifyUser(userId, updateData);

    return res.status(200).json({ message: "User updated successfully" });
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
});

adminRouter.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    await deleteUser(userId);

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
});
