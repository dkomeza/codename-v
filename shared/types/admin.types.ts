import type { NewUserSchema } from "@/schemas/admin.schema";
import { z } from "zod";

export type User = {
  id: string;
  name: string;
  surname: string;
  email: string;
  type: "ADMIN" | "COORDINATOR" | "VOLUNTEER";
};

export type Organization = {
  id: string;
  organizationName: string;
};

export type AdminUsersRequest = {
  page: number;
  limit: number;
  token: string;
};

export type AdminNewUser = z.infer<typeof NewUserSchema>;
