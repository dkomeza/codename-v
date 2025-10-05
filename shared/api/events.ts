import { validateResponse } from ".";
import type { CalendarEvent } from "../types/event.types";
import { url } from "./const";

export async function getAllEvents(days: number): Promise<CalendarEvent[]> {
  const response = await fetch(`${url}/event/${days}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(days),
  });

  try {
    const body = await validateResponse<CalendarEvent[]>(response);
    return body;
  } catch (error) {
    throw error;
  }
}
