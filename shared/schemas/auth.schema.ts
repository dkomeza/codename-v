import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, { message: "Hasło musi mieć conajmniej 8 znaków" })
  .max(128, { message: "Hasło może mieć maksymalnie 128 znaków" })
  .regex(/[A-Z]/, "Hasło musi zawierać przynajmniej jedną wielką literę")
  .regex(/[a-z]/, "Hasło musi zawierać przynajmniej jedną małą literę")
  .regex(/[0-9]/, "Hasło musi zawierać przynajmniej jedną cyfrę")
  .refine((s) => !/\s/.test(s), "Hasło nie może zawierać spacji");

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export const SignUpSchema = z.object({
  name: z.string().min(1),
  surname: z.string().min(1),
  email: z.email(),
  password: passwordSchema,
  birthDate: z.date(),
  school: z.string(),
});
