import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Goal } from "./Components/Goal";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import { Signup } from "./Components/SignUp";
import DashBoard from "./Pages/Dashboard";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dash" element={<DashBoard />} />
        <Route path="/goals" element={<Goal />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
