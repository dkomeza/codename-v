import { useAuth } from "@/context/AuthContext";
import AdminLayout from "@/pages/admin/Layout";
import Organizations from "@/pages/admin/Organizations";
import Users from "@/pages/admin/Users";
import { Navigate, Route, Routes } from "react-router";

export default function AdminRouter() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "ADMIN") {
    console.log(user);
    return <Navigate to="/" replace />;
  }

  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<div>Admin Dashboard</div>} />
        <Route path="/users" element={<Users />} />
        <Route path="/organizations" element={<Organizations />} />
        <Route path="/*" element={<div>Empty</div>} />
      </Route>
    </Routes>
  );
}
