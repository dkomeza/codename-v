import prisma from "@/config/postgres.config";
import { Router } from "express";

export const schoolRouter = Router();

// GET /schools
schoolRouter.get("/", async (req, res) => {
  const schools = await prisma.school.findMany({
    // take: 100,
    orderBy: { name: "asc" },
  });
  res.json(schools);
});
