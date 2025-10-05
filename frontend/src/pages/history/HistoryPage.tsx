import { Clock, Heart, MapPin, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

type Event = {
  id: number;
  title: string;
  date: string;
  location: string;
  image: string;
  favorite: boolean;
  endDate: string;
  reviewsCount: number;
  averageRating: number;
};

const pastEvents: Event[] = [
  {
    id: 1,
    title: "Warsztaty integracyjne",
    date: "2025-07-01",
    location: "Warszawa",
    image: "https://h3.heroes.net.pl/uploaded/buildings/dung/overview.jpg",
    favorite: true,
    endDate: "2025-07-01T18:00:00",
    reviewsCount: 24,
    averageRating: 4.55,
  },
  {
    id: 2,
    title: "Sprzątanie parku",
    date: "2025-06-12",
    location: "Kraków",
    image: "https://h3.heroes.net.pl/uploaded/buildings/necro/overview.jpg",
    favorite: false,
    endDate: "2025-06-12T15:00:00",
    reviewsCount: 10,
    averageRating: 3.87,
  },
];

function HistoryPage() {
  const [events, setEvents] = useState<Event[]>(pastEvents);
  const navigate = useNavigate();

  const toggleFavourite = (id: number) => {
    setEvents((prev) =>
      prev.map((ev) => (ev.id === id ? { ...ev, favorite: !ev.favorite } : ev))
    );
  };

  const filteredEvents = events.filter((e) => new Date(e.endDate).getTime() < Date.now());

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => {
          const diff = rating - i;
          if (diff >= 1) {
            return <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />;
          } else if (diff >= 0.5) {
            return (
              <Star
                key={i}
                className="w-4 h-4 text-yellow-400"
                style={{
                  fill: "url(#halfGradient)",
                }}
              />
            );
          } else {
            return <Star key={i} className="w-4 h-4 text-yellow-400" />;
          }
        })}
        <svg width="0" height="0">
          <defs>
            <linearGradient id="halfGradient">
              <stop offset="50%" stopColor="#facc15" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Historia wydarzeń</h2>
      <div className="flex flex-col gap-4 justify-start">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="relative w-64 h-64 rounded-lg overflow-hidden shadow-lg select-none cursor-pointer"
            onClick={() => navigate(`/event/${event.id}`)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavourite(event.id);
              }}
              className="absolute top-2 right-2 p-1 rounded-full bg-white/70 hover:bg-black/10 transition-colors"
            >
              <Heart
                className={`w-6 h-6 ${
                  event.favorite ? "fill-red-500 text-red-500" : "text-red-500"
                }`}
              />
            </button>
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
            <div className="absolute bottom-14 left-0 w-full flex justify-between items-center bg-black text-white px-2 py-1">
              <span>{event.reviewsCount} opinii</span>
              <div className="flex items-center space-x-1">
                <span className="text-sm">{event.averageRating.toFixed(2)}</span>
                {renderStars(event.averageRating)}
              </div>
            </div>
            <div className="absolute bottom-0 h-14 w-full bg-black backdrop-blur-sm p-2 text-white flex flex-col">
              <p className="font-semibold truncate">{event.title}</p>
              <div className="flex justify-between items-center text-xs mt-1">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-red-500" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryPage;
