import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

interface CalendarEvent {
  date: Date;
  title: string;
  description: string;
}

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const events: CalendarEvent[] = [
    {
      date: new Date(2025, 9, 10),
      title: "Spotkanie zespołu",
      description: "Cotygodniowe spotkanie projektowe",
    },
    {
      date: new Date(2025, 9, 15),
      title: "Deadline projektu",
      description: "Ostateczny termin oddania projektu",
    },
    {
      date: new Date(2025, 9, 15),
      title: "Urodziny szefa",
      description: "Przygotować prezent i życzenia",
    },
    {
      date: new Date(2025, 9, 15),
      title: "Urodziny starego",
      description: "PIWO",
    },
  ];

  // Pobiera eventy dla wybranej daty
  const getEventsForSelectedDate = () => {
    if (!date) return [];
    return events.filter((event) => event.date.toDateString() === date.toDateString());
  };

  // Lista dat z eventami (do kropiek)
  const eventDates = events.map((event) => event.date);

  const selectedDateEvents = getEventsForSelectedDate();

  return (
    <div className="flex flex-col items-center p-4">
      <div className="mb-8">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          modifiers={{
            event: eventDates,
          }}
          modifiersClassNames={{
            event:
              "relative after:content-[''] after:absolute after:bottom-0.5 after:left-1/2 after:transform after:-translate-x-1/2 after:w-1 after:h-1 after:bg-[#8C2342] after:rounded-full after:z-10",
          }}
        />
      </div>

      <div className="w-9/12 space-y-5">
        {selectedDateEvents.length > 0 ? (
          selectedDateEvents.map((event, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-[#8C2342] text-base">{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">{event.description}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-600 text-base text-center py-4">
            Brak wydarzeń dla wybranej daty
          </p>
        )}
      </div>
    </div>
  );
}
