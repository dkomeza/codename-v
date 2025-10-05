import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Mail, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

type Event = {
  id: number;
  title: string;
  date: string;
  endDate: string;
  location: string;
  image: string;
  description: string;
  category: string;
  favorite: boolean;
  participated: boolean;
  spotsAvailable: boolean;
  reviewsCount: number;
  averageRating: number;
};

const events: Event[] = [
  {
    id: 1,
    title: "Warsztaty integracyjne",
    date: "2025-10-05 10:00:00",
    endDate: "2025-01-05T14:00:00",
    location: "Sala 101, Akademia XYZ",
    image: "https://h3.heroes.net.pl/uploaded/buildings/dung/overview.jpg",
    description: "Opis wydarzenia integracyjnego...",
    category: "Polecane",
    favorite: true,
    participated: true,
    spotsAvailable: true,
    reviewsCount: 12,
    averageRating: 4.31,
  },
  {
    id: 2,
    title: "Sprzątanie parku",
    date: "2025-10-10 09:00:00",
    endDate: "2025-10-10T12:00:00",
    location: "Park Miejski",
    image: "https://h3.heroes.net.pl/uploaded/buildings/necro/overview.jpg",
    description: "Opis wydarzenia ekologicznego...",
    category: "Ochrona Środowiska",
    favorite: false,
    participated: false,
    spotsAvailable: false,
    reviewsCount: 3,
    averageRating: 2.33,
  },
];

function EventPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const event = events.find((e) => e.id === Number(id));

  const [eventFavourite, setEventFavourite] = useState<boolean>(event?.favorite ?? false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [showApplyDialog, setApplyDialog] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);

  if (!event) return null;

  const hasEnded = new Date(event.endDate).getTime() < Date.now();

  const handleStartConversation = () => {
    // dla Maksa ;)
    alert("Rozpoczynasz konwersację z organizatorem wydarzenia!");
    setApplyDialog(false);
  };

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
    <div className="space-y-4">
      <div className="relative">
        <img src={event.image} alt={event.title} className="w-full h-64 object-cover" />
        <Button
          onClick={() => navigate(-1)}
          className="absolute top-2 left-2 p-2 rounded-full bg-red-600/80 hover:bg-red-600/60 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Button
          onClick={() => alert("Czy chcesz rozpocząć konwersację z organizatorem wydarzenia?")}
          className="absolute top-2 right-2 p-2 rounded-full bg-red-600/80 hover:bg-red-600/60 transition-colors"
        >
          <Mail className="w-5 h-5" />
        </Button>
      </div>
      <div className="p-10 flex-1 space-y-4">
        <h1 className="text-2xl font-bold">{event.title}</h1>

        <div className="flex items-center space-x-4">
          <p className="text-gray-600">{event.date}</p>
          <span
            className={`px-2 py-1 rounded text-white text-sm ${
              event.spotsAvailable ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {event.spotsAvailable ? "Wolne miejsca" : "Brak miejsc"}
          </span>
        </div>
        <h1 className="text-gray-600 font-bold">Opis: </h1>
        <p className="text-gray-900">{event.description}</p>
        <h1 className="text-gray-600 font-bold">Lokalizacja: </h1>
        <p className="text-gray-900">{event.location}</p>
        {hasEnded && event.participated && (
          <div className="w-60 flex justify-between items-center px-2 py-1">
            <span>{event.reviewsCount} opinii</span>
            <div className="flex items-center space-x-1">
              <span className="text-sm">{event.averageRating.toFixed(2)}</span>
              {renderStars(event.averageRating)}
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center p-6 gap-4">
        <Button
          onClick={() => setEventFavourite((prev) => !prev)}
          aria-label="Ulubione"
          className="p-2 rounded-full bg-white/70 hover:bg-black/10 transition-colors"
        >
          <Heart
            className={`w-6 h-6 ${eventFavourite ? "fill-red-500 text-red-500" : "text-red-500"}`}
          />
        </Button>

        {hasEnded && event.participated ? (
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            onClick={() => setShowReviewDialog(true)}
          >
            Dodaj opinię o wydarzeniu
          </Button>
        ) : null}
        {!event.participated && !hasEnded && (
          <Button
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            onClick={() => setApplyDialog(true)}
          >
            Zapisz się
          </Button>
        )}
      </div>
      {showApplyDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-80 space-y-4">
            <p>Czy chcesz rozpocząć konwersację z organizatorem wydarzenia?</p>
            <div className="flex justify-end space-x-2">
              <Button onClick={handleStartConversation}>Tak</Button>
              <Button variant="outline" onClick={() => setApplyDialog(false)}>
                Nie
              </Button>
            </div>
          </div>
        </div>
      )}
      {showReviewDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <h3 className="text-lg font-semibold mb-4">Dodaj opinię</h3>
            <div className="flex space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <button key={i} onClick={() => setSelectedRating(i)} className="transition-colors">
                  <Star
                    className={`w-8 h-8 cursor-pointer ${
                      i <= selectedRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            <textarea
              placeholder="Twój komentarz..."
              className="w-full border border-gray-300 rounded p-2 mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                onClick={() => setShowReviewDialog(false)}
              >
                Anuluj
              </button>
              <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
                Dodaj
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventPage;
