import { login, register } from "@/controllers/auth.controller";
import { authenticate } from "@/middleware/auth.middleware";
import { checkDuplicateEmail } from "@/services/auth.service";
import type { AuthToken, User } from "@shared/types/auth";
import express from "express";

import { LoginSchema, SignUpSchema } from "@shared/schemas/auth.schema";

const authRouter = express.Router();

authRouter.get("/", authenticate, (req, res) => {
  if (!req.user) {
    return res.status(404).json({ message: "User not found!" });
  }

  const user: User = {
    id: req.user.id,
    email: req.user.email,
    name: req.user.name,
    surname: req.user.surname,
    role: req.user.type as User["role"],
  };

  res.status(200).json({ user });
});

authRouter.post("/signin", async (req, res) => {
  const result = LoginSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ message: "Invalid request data", errors: result.error.message });
  }

  const { email, password } = result.data;

  try {
    const token = await login(email, password);
    const data: AuthToken = { token };

    return res.status(200).json(data);
  } catch (e: any) {
    return res.status(401).json({ message: e.message });
  }
});

authRouter.post("/signup", checkDuplicateEmail, async (req, res) => {
  const result = SignUpSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ message: "Invalid request data", errors: result.error.message });
  }

  try {
    const token = await register(result.data);
    const data: AuthToken = { token };

    return res.status(201).json(data);
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
});

export default authRouter;
