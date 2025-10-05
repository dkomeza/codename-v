import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Notification = {
  id: number;
  title: string;
  date: string;
  read: boolean;
};

// zastąpić dane testowe wyszukiwaniem powiadomień, zalecam znalezienie eventów do których pozostało 3 dni i mniej
const notifications: Notification[] = [
  {
    id: 1,
    title: "Warsztaty integracyjne",
    date: "2025-10-07 15:00",
    read: false,
  },
  {
    id: 2,
    title: "Sprzątanie parku",
    date: "2025-10-10 09:00",
    read: true,
  },
  {
    id: 3,
    title: "Spotkanie organizacyjne",
    date: "2025-10-12 18:30",
    read: false,
  },
];

function NotificationMenu() {
  const [notifs, setNotifications] = useState<Notification[]>(notifications);

  const unreadCount = notifs.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative inline-block cursor-pointer">
          <img
            src="/pigeon.png"
            alt="Notification pigeon"
            width={32}
            height={32}
            className="rounded-sm"
          />
          {unreadCount > 0 && (
            <Badge
              className="absolute -bottom-1 -right-1 bg-red-500 border-grey-500 text-white text-xs px-1 py-0 rounded-full"
              variant="secondary"
            >
              {unreadCount}
            </Badge>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuItem
          className={`flex flex-col items-start space-y-1 px-3 py-2 cursor-pointer`}>
          Twoje powiadomienia
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {notifs.length === 0 ? (
          <div className="p-2 text-sm text-muted-foreground">Brak powiadomień</div>
        ) : (
          notifs.map((n) => (
            <DropdownMenuItem
              key={n.id}
              onClick={() => handleMarkAsRead(n.id)}
              className={`flex flex-col items-start space-y-1 px-3 py-2 cursor-pointer 
              ${n.read ? "text-muted-foreground" : "font-semibold text-foreground hover:bg-accent"}`}
            >
              <span>{n.title}</span>
              <span className="text-xs text-gray-400">{n.date}</span>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NotificationMenu