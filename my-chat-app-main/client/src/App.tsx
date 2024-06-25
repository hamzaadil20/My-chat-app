import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Home from "./pages/home/Home";
import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="p-4 h-screen flex  justify-center items-center">
      <Routes>
        <Route path="/" element={authUser ? <Home />: <Navigate to="/login"/>} />
        <Route path="/login" element={authUser ? <Navigate to="/"/> : <Login/>} />
        <Route path="/signup" element={authUser ? <Navigate to="/"/> : <SignUp/>} />
      </Routes>
      <Toaster/>
    </div>
  );
};

export default App;
