import { EventSchema } from "@/schemas/event.schema";
import { z } from "zod";

export interface CalendarEvent {
  date: Date;
  title: string;
  description: string;
}

export type Event = z.infer<typeof EventSchema>;
