import {Routes, Route } from "react-router-dom";
import UserProfile from "../pages/UserProfile";
import SpecialistDashboardPage from "../specialist/SpecialistDashboardPage";
import HomePage from "../pages/HomePage";
import AppointmentsPage from "../specialist/AppointmentsPage";
import AddSpecialistDetailsPage from "../specialist/AddSpecialistDetailsPage"


export default function SpecialistRoute(){

    return(
        <Routes>
          <Route path="/dashboard" element={< SpecialistDashboardPage/>} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/complete-profile" element={<AddSpecialistDetailsPage />} />
          <Route path="/profile" element={<UserProfile/>} />
          <Route path="/logout" element={<HomePage/>} />   
        </Routes>
      
    );
}