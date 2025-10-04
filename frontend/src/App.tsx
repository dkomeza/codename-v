import { Login, Signup } from "@/pages/auth";
import OrgDashboard from "@/pages/dashboard/OrgDashboard";
import AdminRouter from "@/routers/AdminRouter";
import UserRouter from "@/routers/UserRouter";
import { Route, Routes } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import AuthLayout from "./pages/auth/Layout";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<UserRouter />} />
        <Route path="/admin/*" element={<AdminRouter />} />

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="/org/*" element={<OrgDashboard />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
