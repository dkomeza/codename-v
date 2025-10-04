import React from "react";
import { useParams, useNavigate } from "react-router";
import NotificationMenu from "@/components/notifications/notificationMenu";
import { Button } from "@/components/ui/button";
import { Clock, MapPin } from "lucide-react";

type Event = {
  id: number;
  title: string;
  date: string;
  location: string;
  image: string;
  category: string;
};

// tymczasowe dane do testów
const events: Event[] = [
  { id: 1, title: "Warsztaty integracyjne", date: "Null", location: "Null", image: "pigeon.png", category: "Polecane" },
  { id: 2, title: "Sprzątanie parku", date: "Null", location: "Null", image: "pigeon.png", category: "Ochrona Środowiska" },
  { id: 3, title: "Spotkanie organizacyjne", date: "Null", location: "Null", image: "pigeon.png", category: "Polecane" },
  { id: 4, title: "Turniej piłki nożnej", date: "Null", location: "Null", image: "pigeon.png", category: "Pomoc społeczna i humanitarna" },
];

function CategoryPage() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const navigate = useNavigate();

  if (!categoryName) return null;

  const filteredEvents = events.filter(e => e.category === categoryName);

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => navigate("/")}>Powrót</Button>
        <NotificationMenu />
      </div>

      <h2 className="text-xl font-semibold">{categoryName}</h2>

      <div className="flex flex-col gap-4 justify-start">
        {filteredEvents.map(event => (
          <div key={event.id} className="relative w-64 h-64 rounded-lg overflow-hidden shadow-lg select-none">
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
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;