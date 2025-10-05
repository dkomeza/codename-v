import { z } from "zod";
export declare const NewUserSchema: z.ZodObject<{
    name: z.ZodString;
    surname: z.ZodString;
    email: z.ZodEmail;
    birthDate: z.ZodCoercedDate<unknown>;
    password: z.ZodString;
    type: z.ZodEnum<{
        ADMIN: "ADMIN";
        ORG: "ORG";
        COORDINATOR: "COORDINATOR";
        VOLUNTEER: "VOLUNTEER";
    }>;
}, z.core.$strip>;
export declare const ModifyUserSchema: z.ZodObject<{
    name: z.ZodString;
    surname: z.ZodString;
    email: z.ZodEmail;
    birthDate: z.ZodCoercedDate<unknown>;
    password: z.ZodOptional<z.ZodString>;
    type: z.ZodEnum<{
        ADMIN: "ADMIN";
        ORG: "ORG";
        COORDINATOR: "COORDINATOR";
        VOLUNTEER: "VOLUNTEER";
    }>;
}, z.core.$strip>;
