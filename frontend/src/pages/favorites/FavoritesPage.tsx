import { Clock, Heart, MapPin } from "lucide-react";
import { useState } from "react";

type Event = {
  id: number;
  title: string;
  date: string;
  location: string;
  image: string;
  category: string;
  favorite: boolean;
};

// tymczasowe dane do testów
const initialEvents: Event[] = [
  {
    id: 1,
    title: "Warsztaty integracyjne",
    date: "Null",
    location: "Null",
    image: "pigeon.png",
    category: "Polecane",
    favorite: true,
  },
  {
    id: 2,
    title: "Sprzątanie parku",
    date: "Null",
    location: "Null",
    image: "pigeon.png",
    category: "Ochrona Środowiska",
    favorite: false,
  },
  {
    id: 3,
    title: "Spotkanie organizacyjne",
    date: "Null",
    location: "Null",
    image: "pigeon.png",
    category: "Polecane",
    favorite: true,
  },
  {
    id: 4,
    title: "Turniej piłki nożnej",
    date: "Null",
    location: "Null",
    image: "pigeon.png",
    category: "Pomoc społeczna i humanitarna",
    favorite: false,
  },
];

function FavoritesPage() {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [removingIds, setRemovingIds] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setEvents((prev) => prev.map((ev) => (ev.id === id ? { ...ev, favorite: !ev.favorite } : ev)));

    const clicked = events.find((ev) => ev.id === id);
    if (clicked && clicked.favorite) {
      setRemovingIds((prev) => [...prev, id]);
      setEvents((prev) => prev.filter((ev) => ev.id !== id));
      setRemovingIds((prev) => prev.filter((rid) => rid !== id));
    }
  };

  const favoriteEvents = events.filter((e) => e.favorite);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Ulubione wydarzenia</h2>

      <div className="flex flex-col gap-4 justify-start">
        {favoriteEvents.map((event) => {
          const isRemoving = removingIds.includes(event.id);
          return (
            <div
              key={event.id}
              className={`relative w-64 h-64 rounded-lg overflow-hidden shadow-lg select-none transition-opacity duration-500 ${
                isRemoving ? "opacity-50 pointer-events-none" : "opacity-100"
              }`}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(event.id);
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
              <div className="absolute bottom-0 w-full bg-black bg-opacity-80 backdrop-blur-sm p-2 text-white flex flex-col">
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
          );
        })}

        {favoriteEvents.length === 0 && <p className="text-gray-500">Brak ulubionych wydarzeń.</p>}
      </div>
    </div>
  );
}

export default FavoritesPage;
