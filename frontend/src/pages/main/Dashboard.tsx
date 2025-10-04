import React from 'react'
import NotificationMenu from '@/components/notifications/notificationMenu'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

type Event = {
  id: number;
  title: string;
  date: string;
  location: string;
  image: string;
};

const events: Event[] = [
  { id: 1, title: "Warsztaty integracyjne", date: "Null", location: "Null", image: "pigeon.png" },
  { id: 2, title: "Sprzątanie parku", date: "Null", location: "Null", image: "pigeon.png" },
  { id: 3, title: "Spotkanie organizacyjne", date: "Null", location: "Null", image: "pigeon.png" },
  { id: 4, title: "Turniej piłki nożnej", date: "Null", location: "Null", image: "pigeon.png" },
];

function Dashboard() {
  const [scrollIndex, setScrollIndex] = useState(0);

  const handlePrev = () => setScrollIndex(prev => Math.max(prev - 1, 0));
  const handleNext = () => setScrollIndex(prev => Math.min(prev + 1, events.length - 1));

  const [query, setQuery] = useState("");
  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center">
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Szukaj wydarzeń..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setScrollIndex(0);
            }}
            className="w-full"
          />
        </div>
        <div className="">
          <NotificationMenu/>
        </div>
      </div>
      <div className="relative flex items-center space-x-2">
        <Button onClick={handlePrev} variant="outline" className="h-32 w-10 flex items-center justify-center">
          <ChevronLeft />
        </Button>

        <div className="flex overflow-hidden w-full">
          <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${scrollIndex * 16}rem)` }}>
            {filteredEvents.map((event) => {
              const eventDate = new Date(event.date);
              const dayMonth = `${eventDate.getDate()}.${eventDate.getMonth() + 1}`;
              const hoursMinutes = `${eventDate.getHours().toString().padStart(2, "0")}:${eventDate.getMinutes().toString().padStart(2, "0")}`;

              return (
                <div key={event.id} className="relative w-64 h-64 flex-shrink-0 mr-4 rounded-lg overflow-hidden cursor-pointer shadow-lg">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 w-full bg-black bg-opacity-80 backdrop-blur-sm p-2 text-white flex flex-col">
                    <p className="font-semibold truncate">{event.title}</p>
                    <div className="flex justify-between items-center text-xs mt-1">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-red-500" />
                        <span>{dayMonth} {hoursMinutes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Button onClick={handleNext} variant="outline" className="h-32 w-10 flex items-center justify-center">
          <ChevronRight />
        </Button>
      </div>

    </div>
  )
}

export default Dashboard