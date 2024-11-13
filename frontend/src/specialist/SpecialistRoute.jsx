import {Routes, Route } from "react-router-dom";
import UserProfile from "../pages/UserProfile";
import SpecialistDashboardPage from "../pages/SpecialistDashboardPage";
import HomePage from "../pages/HomePage";


export default function SpecialistRoute(){

    return(
        <Routes>
          <Route path="/dashboard" element={< SpecialistDashboardPage/>} />
      
          <Route path="/profile" element={<UserProfile/>} />
          <Route path="/logout" element={<HomePage/>} />   
        </Routes>
      
    );
}