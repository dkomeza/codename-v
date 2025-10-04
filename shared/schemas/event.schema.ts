import { z } from "zod";

export const EventSchema = z.object({
  title: z.string().min(1).max(100),
  images: z.array(z.string().min(1)).min(1).max(5), // URLs to images (upload handled separately)
  description: z.string().max(10000).optional(),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  capacity: z.number().min(1),
  location: z.string().min(1).max(200), // GPS coordinates or address
});
