import { CorporateFareRounded, HomeRounded, MenuRounded, PeopleRounded } from "@mui/icons-material";
import { NavLink as Link, Outlet } from "react-router";

function AdminLayout() {
  const pages = [
    {
      name: "Główna",
      href: "/admin/",
      icon: HomeRounded,
    },
    {
      name: "Użytkownicy",
      href: "/admin/users",
      icon: PeopleRounded,
    },
    {
      name: "Organizacje",
      href: "/admin/organizations",
      icon: CorporateFareRounded,
    },
    { name: "Menu", href: "/admin/menu", icon: MenuRounded },
  ];
  return (
    <div className="flex flex-row h-full w-full">
      <nav className="user-nav flex flex-col top-0 left-0 h-full w-24 bg-white border-r border-gray-200 justify-start items-center py-6 gap-4">
        {pages.map((page) => (
          <Link
            key={page.name}
            to={page.href}
            className="p-4 hover:bg-gray-200 text-[#707070] aria-[current=page]:text-[#8C2342] flex flex-col items-center"
          >
            <page.icon />
            <span className="text-xs font-light mt-2">{page.name}</span>
          </Link>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}

export default AdminLayout;
