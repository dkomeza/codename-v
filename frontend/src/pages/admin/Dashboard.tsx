import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router";

export default function AuthLayout() {
  const { user } = useAuth();

  if (!user || user.type !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 bg-[#D85773]/20 rounded-bl-3xl relative">Admin dashboard</div>
    </div>
  );
}
