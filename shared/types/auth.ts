import type { LoginSchema, SignUpSchema } from "@/schemas/auth.schema";
import { z } from "zod";

export type User = {
  id: string;
  name: string;
  surname: string;
  email: string;
};

export type AuthToken = {
  token: string;
};

export type LoginData = z.infer<typeof LoginSchema>;
export type SignUpData = z.infer<typeof SignUpSchema>;
