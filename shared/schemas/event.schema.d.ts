import { z } from "zod";
export declare const EventSchema: z.ZodObject<{
    title: z.ZodString;
    images: z.ZodArray<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    date: z.ZodString;
    capacity: z.ZodNumber;
    location: z.ZodString;
    category: z.ZodString;
}, z.core.$strip>;
