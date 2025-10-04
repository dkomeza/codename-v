import {
  CalendarMonthRounded,
  FavoriteRounded,
  HomeRounded,
  MenuRounded,
} from "@mui/icons-material";
import { NavLink, Routes } from "react-router";
// import Home from './org/Home';
// import Analytics from './org/Analytics';
// import Users from './org/Users';
// import Settings from './org/Settings';

const OrgDashboard = () => {
  const tabs = [
    { path: "/org/", label: "Główna", icon: <HomeRounded className="w-5 h-5" /> },
    {
      path: "/org/calendar",
      label: "Kalendarz",
      icon: <CalendarMonthRounded className="w-5 h-5" />,
    },
    { path: "/org/favorites", label: "Ulubione", icon: <FavoriteRounded className="w-5 h-5" /> },
    { path: "/org/menu", label: "Menu", icon: <MenuRounded className="w-5 h-5" /> },
  ];

  return (
    <div className="flex flex-col h-screen">
      {/* Content */}
      <main className="flex-1 overflow-auto p-4 bg-gray-50">
        <Routes>
          {/* <Route path="" element={<Home />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} /> */}
        </Routes>
      </main>

      {/* Bottom Tab Menu */}
      <nav className="flex justify-around bg-white border-t border-gray-200 p-2">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            end
            className={({ isActive }) =>
              `flex flex-col items-center text-sm hover:bg-gray-200 p-3 rounded-lg ${
                isActive ? "aria-[current=page]:text-[#8C2342]" : "text-[#707070]"
              }`
            }
          >
            {tab.icon}
            <span>{tab.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default OrgDashboard;
