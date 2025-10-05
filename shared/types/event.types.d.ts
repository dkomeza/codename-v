import { EventSchema } from "@/schemas/event.schema";
import { z } from "zod";
export type Event = z.infer<typeof EventSchema>;
