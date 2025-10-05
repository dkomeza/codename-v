import {
  CalendarMonthRounded,
  FavoriteRounded,
  HomeRounded,
  MenuRounded,
} from "@mui/icons-material";
import { NavLink as Link, Outlet } from "react-router";

function MainLayout() {
  const pages = [
    {
      name: "Główna",
      href: "/",
      icon: HomeRounded,
    },
    {
      name: "Kalendarz",
      href: "/calendar",
      icon: CalendarMonthRounded,
    },
    {
      name: "Ulubione",
      href: "/favorites",
      icon: FavoriteRounded,
    },
    { name: "Menu", href: "/menu", icon: MenuRounded },
  ];
  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 overflow-auto p-4 bg-gray-50 pb-18">
        <Outlet />
      </main>
      <nav className="flex justify-around bg-white/40 backdrop-blur-sm border-t border-gray-200 p-2 fixed bottom-0 left-0 right-0 h-18 rounded-t-2xl">
        {pages.map((page) => (
          <Link
            key={page.name}
            to={page.href}
            className="p-4  text-[#707070]  aria-[current=page]:text-[#8C2342] flex flex-col items-center"
          >
            <page.icon />
            <span className="text-xs font-light">{page.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default MainLayout;
