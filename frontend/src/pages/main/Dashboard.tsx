import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from "react-router";
import NotificationMenu from '@/components/notifications/notificationMenu';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heart, Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

type Event = {
  id: number;
  title: string;
  date: string;
  location: string;
  image: string;
  category: string;
  favorite: boolean
};

// konieczna zamiana statycznych danych na pobierane
const events: Event[] = [
  { id: 1, title: "Warsztaty integracyjne", date: "Null", location: "Null", image: "pigeon.png", category: "Polecane", favorite: true },
  { id: 2, title: "Sprzątanie parku", date: "Null", location: "Null", image: "pigeon.png", category: "Ochrona Środowiska", favorite: false },
  { id: 3, title: "Spotkanie organizacyjne", date: "Null", location: "Null", image: "pigeon.png", category: "Polecane", favorite: true },
  { id: 4, title: "Turniej piłki nożnej", date: "Null", location: "Null", image: "pigeon.png", category: "Pomoc społeczna i humanitarna", favorite: false },
];

function Dashboard() {
  const categories = useMemo(
    () => Array.from(new Set(events.map(e => e.category))),
    [events]
  );

  const [favoriteEvents, setFavoriteEvents] = useState<Event[]>(events);
  const toggleFavorite = (id: number) => {
    setFavoriteEvents(prev =>
      prev.map(ev =>
        ev.id === id ? { ...ev, favorite: !ev.favorite } : ev
      )
    );
  };

  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const filteredEvents = favoriteEvents.filter(e => e.title.toLowerCase().includes(query.toLowerCase()));

  const [scrollIndices, setScrollIndices] = useState<{ [key: string]: number }>(
    categories.reduce((acc, cat) => ({ ...acc, [cat]: 0 }), {})
  );

  const [visibleCards, setVisibleCards] = useState(1);
  const containerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const updateVisibleCards = () => {
      if (containerRefs.current[categories[0]]) {
        const w = containerRefs.current[categories[0]]!.offsetWidth;
        setVisibleCards(Math.floor(w / (16 * 16)) || 1); // 16rem ~ 256px
      }
    };
    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const handlePrev = (category: string) => {
    setScrollIndices(prev => ({ ...prev, [category]: Math.max(prev[category] - 1, 0) }));
  };

  const handleNext = (category: string, eventsLength: number) => {
    const maxIndex = Math.max(eventsLength - visibleCards, 0);
    setScrollIndices(prev => ({ ...prev, [category]: Math.min(prev[category] + 1, maxIndex) }));
  };

  const eventsByCategory = categories.map(cat => ({
    category: cat,
    events: filteredEvents.filter(e => e.category === cat),
  }));

  return (
    <div className="p-4 space-y-6">
      {/* Pasek wyszukiwania */}
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Szukaj wydarzeń..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setScrollIndices(categories.reduce((acc, cat) => ({ ...acc, [cat]: 0 }), {}));
          }}
          className="w-full"
        />
        <NotificationMenu />
      </div>

      {/* Eventy według kategorii */}
      {eventsByCategory.map(({ category, events }) => (
        <div key={category} className="space-y-2">
          <div className="flex items-center cursor-pointer hover:text-red-500"
            onClick={() => navigate(`/${encodeURIComponent(category)}`)}
          >
            <h2 className="text-lg font-semibold">{category}</h2>
            <ChevronRight className="w-5 h-5 text-red-500 select-none" />
          </div>

          {events.length === 0 ? (
            <p className="text-sm text-muted-foreground">Brak wyników</p>
          ) : (
            <div className="relative flex items-center space-x-2">
              <Button
                onClick={() => handlePrev(category)}
                disabled={scrollIndices[category] === 0}
                variant="outline"
                className="h-32 w-10 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed select-none"
              >
                <ChevronLeft />
              </Button>

              <div ref={el => containerRefs.current[category] = el} className="flex overflow-hidden w-full">
                <div
                  className="flex transition-transform duration-300"
                  style={{ transform: `translateX(-${scrollIndices[category] * 16}rem)` }}
                >
                  {events.map(event => (
                    <div key={event.id} className="relative w-64 h-64 flex-shrink-0 mr-4 rounded-lg overflow-hidden cursor-pointer shadow-lg select-none"
                      onClick={() => navigate(`/event/${encodeURIComponent(event.id)}`)}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(event.id);
                        }}
                        className="absolute top-2 right-2 p-1 rounded-full bg-white/70 hover:bg-black/10 transition-colors"
                      >
                        <Heart
                          className={`w-6 h-6 ${event.favorite ? "fill-red-500 text-red-500" : "text-red-500"
                            }`}
                        />
                      </button>
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 w-full bg-black bg-opacity-80 backdrop-blur-sm p-2 text-white flex flex-col">
                        <p className="font-semibold truncate select-text">{event.title}</p>
                        <div className="flex justify-between items-center text-xs mt-1">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3 text-red-500" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span className='select-text'>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => handleNext(category, events.length)}
                disabled={scrollIndices[category] >= Math.max(events.length - visibleCards, 0)}
                variant="outline"
                className="h-32 w-10 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed select-none"
              >
                <ChevronRight />
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
;
