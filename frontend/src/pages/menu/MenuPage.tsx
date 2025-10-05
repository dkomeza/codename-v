import React from "react";
import { Link } from "react-router";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { NotepadText, Settings, History, Info } from "lucide-react";

function MenuPage() {
    //wywalić stąd usera i użyć pobranych danych
    const user = {
        name: "Jan Kowalski",
        school: "Szkoła Podstawowa nr 1",
        hours: 42,
    };

    const menuItems = [
        { name: "Certyfikaty", icon: <NotepadText className="w-8 h-8" />, link: "/certs" },
        { name: "Ustawienia", icon: <Settings className="w-8 h-8" />, link: "/settings" },
        { name: "Historia", icon: <History className="w-8 h-8" />, link: "/history" },
        { name: "O aplikacji", icon: <Info className="w-8 h-8" />, link: "/about" },
    ];

    return (
        <div className="p-6 space-y-8">
            <div className="flex items-center rounded-full p-6 space-x-6 bg-red-400">
                <img
                    src="pigeon.png"
                    alt="Logo"
                    className="w-16 h-16 object-cover"
                />
                <div className="text-center">
                    <p className="text-3xl font-bold">{user.hours}</p>
                    <p className="text-sm font-bold">Liczba godzin</p>
                </div>
            </div>

            <div className="flex flex-col items-center space-y-8">
                <Card className="inline-block w-auto max-w-xl flex flex-row items-center space-x-4 rounded-xl p-4">
                    <Avatar>
                        <AvatarImage src="pigeon.png" />
                        <AvatarFallback>{user.name}</AvatarFallback>
                    </Avatar>
                    <CardContent className="flex flex-col justify-center">
                        <p className="text-xl font-semibold">{user.name}</p>
                        <p className="text-gray-500">{user.school}</p>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-6">
                    {menuItems.map((item) => (
                        <Link
                            to={item.link}
                            key={item.name}
                            className="flex flex-col items-center justify-center rounded-xl p-4 w-40 h-40 cursor-pointer hover:shadow-lg transition-shadow bg-white"
                        >
                            {item.icon}
                            <p className="mt-2 font-medium text-center">{item.name}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MenuPage;