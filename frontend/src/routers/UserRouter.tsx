import { useAuth } from "@/context/AuthContext";
import CalendarPage from "@/pages/calendar/CalendarPage";
import EventPage from "@/pages/event/EventPage";
import FavoritesPage from "@/pages/favorites/FavoritesPage";
import CategoryPage from "@/pages/main/CategoryPage";
import Dashboard from "@/pages/main/Dashboard";
import MainLayout from "@/pages/main/MainLayout";
import MenuPage from "@/pages/menu/MenuPage";
import HistoryPage from "@/pages/history/HistoryPage";
import { Route, Routes } from "react-router";

export default function UserRouter() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/:categoryName" element={<CategoryPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Route>
      <Route path="/event/:id" element={<EventPage />} />
    </Routes>
  );
}
