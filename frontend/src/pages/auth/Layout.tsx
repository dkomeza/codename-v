import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router";

export default function AuthLayout() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 bg-[#D85773]/20 rounded-bl-3xl relative">
        <img
          src="/pigeon.png"
          className="absolute object-cover bottom-0 left-1/2 -translate-x-1/2"
        />
        <div className="absolute bg-[#D85773]/20 w-6 h-6 bottom-0 right-0 translate-y-full -z-10"></div>
      </div>
      <div className="p-6 pb-12 space-y-12 bg-gradient-to-b from-white to-[#DCDCDC] rounded-tr-3xl">
        <Outlet />
      </div>
    </div>
  );
}
