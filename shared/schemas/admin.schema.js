import { z } from "zod";
export const NewUserSchema = z.object({
    name: z.string().min(1, "Imię jest wymagane"),
    surname: z.string().min(1, "Nazwisko jest wymagane"),
    email: z.email("Nieprawidłowy format email"),
    birthDate: z.coerce.date().max(new Date(), "Data urodzenia nie może być w przyszłości"),
    password: z.string().min(6, "Hasło musi mieć co najmniej 6 znaków"),
    type: z.enum(["ADMIN", "ORG", "COORDINATOR", "VOLUNTEER"], {
        error: "Błędny typ użytkownika",
    }),
});
export const ModifyUserSchema = z.object({
    name: z.string().min(1, "Imię jest wymagane"),
    surname: z.string().min(1, "Nazwisko jest wymagane"),
    email: z.email("Nieprawidłowy format email"),
    birthDate: z.coerce.date().max(new Date(), "Data urodzenia nie może być w przyszłości"),
    password: z.string().min(6, "Hasło musi mieć co najmniej 6 znaków").optional(),
    type: z.enum(["ADMIN", "ORG", "COORDINATOR", "VOLUNTEER"], {
        error: "Błędny typ użytkownika",
    }),
});
