import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Goal } from "./Components/Goal";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import { Signup } from "./Components/SignUp";
import DashBoard from "./Pages/Dashboard";
import Leaderboard from "./Pages/Leaderboard";
import { Recommendation } from "./Pages/Recommendation";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dash" element={<DashBoard />} />
        <Route path="/goals" element={<Goal />} />
        <Route path='/leaderboard' element={<Leaderboard/>}/>
        <Route path='/recom' element={<Recommendation/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
