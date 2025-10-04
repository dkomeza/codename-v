import prisma from "@/config/postgres.config";
import { Router } from "express";

export const schoolRouter = Router();

// GET /schools
schoolRouter.get("/", async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const pageSize = parseInt(req.query.pageSize as string) || 50;

  const skip = (page - 1) * pageSize;

  const schools = await prisma.school.findMany({
    take: pageSize,
    skip,
    orderBy: { name: "asc" },
  });
  res.json(schools);
});
