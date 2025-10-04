import { useAuth } from "@/context/AuthContext";
import CalendarPage from "@/pages/calendar/CalendarPage";
import MainLayout from "@/pages/main/MainLayout";
import { Navigate, Route, Routes } from "react-router";

export default function UserRouter() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<div>User dashboard</div>} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Route>
    </Routes>
  );
}
