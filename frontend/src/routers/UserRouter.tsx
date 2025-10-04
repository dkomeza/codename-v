import { useAuth } from "@/context/AuthContext";
import { Navigate, Route, Routes } from "react-router";

export default function UserRouter() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route path="/dashboard" element={<div>Dashboard</div>} />
    </Routes>
  );
}
