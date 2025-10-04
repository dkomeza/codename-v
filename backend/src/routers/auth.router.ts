import { getUserByToken, login, register } from "@/controllers/auth.controller";
import { checkDuplicateEmail, verifyToken } from "@/services/auth.service";
import express from "express";
const authRouter = express.Router();

authRouter.get('/', [verifyToken], getUserByToken);

authRouter.post('/login', login);

authRouter.post('/register', [checkDuplicateEmail], register);

export default authRouter;
