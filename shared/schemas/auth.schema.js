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
export const SignUpSchema = z
    .object({
    name: z.string().min(2, { message: "Imię musi mieć conajmniej 2 znaki" }),
    surname: z.string().min(2, { message: "Nazwisko musi mieć conajmniej 2 znaki" }),
    password: passwordSchema,
    confirmPassword: z.string().min(1, { message: "Potwierdź hasło" }),
    email: z.email({
        error: "Podaj poprawny adres email",
    }),
    birthDate: z.coerce.date(),
})
    .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Hasła muszą być takie same",
});
