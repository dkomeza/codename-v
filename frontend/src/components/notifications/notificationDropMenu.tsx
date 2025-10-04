import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState } from "react";

const notifications = [
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

function NotificationDropMenu() {
  const [notifs] = useState(notifications);

  const unreadCount = notifs.filter((n) => !n.read).length;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="relative w-8 h-8 bg-gray-200 rounded-sm flex items-center justify-center hover:bg-gray-300">
          🔔
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[260px] bg-white rounded-md shadow-lg p-2"
          sideOffset={5}
        >
          {notifications.length === 0 ? (
            <div className="p-2 text-sm text-gray-500">Brak powiadomień</div>
          ) : (
            notifications.map((n) => (
              <DropdownMenu.Item
                key={n.id}
                className={`px-3 py-2 text-sm rounded-md cursor-pointer select-none 
                ${n.read ? "text-gray-500" : "font-semibold text-black"} 
                hover:bg-gray-100`}
              >
                <div>{n.title}</div>
                <div className="text-xs text-gray-400">{n.date}</div>
              </DropdownMenu.Item>
            ))
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default NotificationDropMenu