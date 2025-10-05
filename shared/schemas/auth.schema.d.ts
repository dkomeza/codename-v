import { z } from "zod";
export declare const LoginSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export declare const SignUpSchema: z.ZodObject<{
    name: z.ZodString;
    surname: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
    email: z.ZodEmail;
    birthDate: z.ZodCoercedDate<unknown>;
}, z.core.$strip>;
