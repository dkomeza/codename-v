import { useAuth } from "@/context/AuthContext";
import MainLayout from "@/pages/main/MainLayout";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";

export default function UserRouter() {
  const { user } = useAuth();

  useEffect(() => {
    console.log("Current user:", user);
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<div>Dashboard</div>} />
      </Route>
    </Routes>
  );
}
