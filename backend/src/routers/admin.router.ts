import { getAdminDashboardData, getCoordinators, getOrgs } from "@/controllers/admin.controller";
import { authenticate, authenticateAdmin } from "@/middleware/auth.middleware";
import { Router } from "express";

const adminRouter = Router();
adminRouter.use(authenticate);
adminRouter.use(authenticateAdmin);

export default adminRouter;

adminRouter.get("/", async (req, res) => {
    const pageSize = 20;

  const data = await getAdminDashboardData(pageSize);
  res.status(200).json({ message: "Admin route accessed successfully." });
});
