import { useAuth } from "@/context/AuthContext";
import MainLayout from "@/pages/main/MainLayout";
import { Route, Routes } from "react-router";

export default function UserRouter() {
  const { user } = useAuth();

  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<div>Dashboard</div>} />
      </Route>
    </Routes>
  );
}
