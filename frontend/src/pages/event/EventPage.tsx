import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Heart, ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

type Event = {
    id: number;
    title: string;
    date: string;
    location: string;
    image: string;
    description: string;
    desc_loc: string;
    favorite: boolean;
    spotsAvailable: boolean;
};

const events: Event[] = [
    {
        id: 1,
        title: "Warsztaty integracyjne",
        date: "2025-10-10 10:00",
        location: "Szkoła Podstawowa nr 1",
        image: "https://h3.heroes.net.pl/uploaded/buildings/dung/overview.jpg",
        description: "Warsztaty mające na celu integrację uczestników poprzez gry i zabawy zespołowe.",
        desc_loc: "Sala gimnastyczna",
        favorite: true,
        spotsAvailable: false,
    },
    {
        id: 2,
        title: "Sprzątanie parku",
        date: "2025-10-12 09:00",
        location: "Park Miejski",
        image: "https://h3.heroes.net.pl/uploaded/buildings/necro/overview.jpg",
        description: "Akcja sprzątania parku w ramach wolontariatu ekologicznego.",
        desc_loc: "Pod fontanną",
        favorite: false,
        spotsAvailable: true,
    },
];

function EventPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const eventId = Number(id);
    const [eventsState, setEventsState] = useState(events);
    const event = eventsState.find((e) => e.id === eventId);
    const [showDialog, setShowDialog] = useState(false);

    if (!event) return (
        <div>
            <Button
                onClick={() => navigate(-1)}
                className="absolute top-4 left-4 p-2 rounded-full bg-red-600/70 hover:bg-black/10 transition-colors"
            >
                <ArrowLeft className="w-6 h-6" />
            </Button>
            <p className="absolute top-12 left-8 p-6">Nie znaleziono wydarzenia.</p>
        </div>
    )

    const toggleFavourite = () => {
        setEventsState((prev) =>
            prev.map((e) =>
                e.id === event.id ? { ...e, favorite: !e.favorite } : e
            )
        );
    };

    const handleStartConversation = () => {
        // dla Maksa ;)
        alert("Rozpoczynasz konwersację z organizatorem wydarzenia!");
        setShowDialog(false);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="relative">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-64 object-cover"
                />
                <Button
                    onClick={() => navigate(-1)}
                    className="absolute top-4 left-4 p-2 rounded-full bg-red-600/70 hover:bg-black/10 transition-colors"
                >
                    <ArrowLeft className="w-6 h-6" />
                </Button>
                <Button
                    onClick={() => setShowDialog(true)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-red-600/70 hover:bg-black/10 transition-colors"
                >
                    <Mail className="w-6 h-6" />
                </Button>
            </div>

            <div className="p-6 flex-1 space-y-4">
                <h1 className="text-2xl font-bold">{event.title}</h1>

                <div className="flex items-center space-x-4">
                    <p className="text-gray-600">{event.date}</p>
                    <span
                        className={`px-2 py-1 rounded text-white text-sm ${event.spotsAvailable ? "bg-green-500" : "bg-red-500"
                            }`}
                    >
                        {event.spotsAvailable ? "Wolne miejsca" : "Brak miejsc"}
                    </span>
                </div>
                <h1 className="text-gray-600 font-bold">Opis: </h1>
                <p className="text-gray-900">{event.description}</p>
                <h1 className="text-gray-600 font-bold">Lokalizacja: </h1>
                <p className="text-gray-900">{event.location}</p>
            </div>

            <div className="flex items-center justify-between p-6 border-t">
                <button
                    onClick={toggleFavourite}
                    className="p-2 rounded-full bg-white/70 hover:bg-black/10 transition-colors"
                >
                    <Heart
                        className={`w-6 h-6 ${event.favorite ? "fill-red-500 text-red-500" : "text-red-500"
                            }`}
                    />
                </button>

                <Button
                    className="w-14 bg-red-600 hover:bg-red-700 text-white flex-1 ml-4"
                    onClick={() => alert("Zapisano!")}
                >
                    Zapisz się
                </Button>
            </div>

            {showDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-80 space-y-4">
                        <p>Czy chcesz rozpocząć konwersację z organizatorem wydarzenia?</p>
                        <div className="flex justify-end space-x-2">
                            <Button onClick={handleStartConversation}>Tak</Button>
                            <Button variant="outline" onClick={() => setShowDialog(false)}>
                                Nie
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EventPage;
