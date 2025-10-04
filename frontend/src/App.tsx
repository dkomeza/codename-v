import { Route, Routes } from "react-router";
import { Login, Signup } from "@/pages/auth";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
