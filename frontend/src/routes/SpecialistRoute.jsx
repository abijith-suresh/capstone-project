import {Routes, Route } from "react-router-dom";
import SpecialistDashboardPage from "../specialist/SpecialistDashboardPage";
import HomePage from "../pages/HomePage";
import AppointmentsPage from "../specialist/AppointmentsPage";
import AddSpecialistDetailsPage from "../specialist/AddSpecialistDetailsPage"
import SpecialistUserProfile from "../specialist/SpecialistUserProfile";
import LogOut from "../specialist/LogOut";
import BookingDetailsPage from "../pages/BookingDetailsPage";



export default function SpecialistRoute(){

    return(
        <Routes>
          <Route path="/dashboard" element={< SpecialistDashboardPage/>} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/complete-profile" element={<AddSpecialistDetailsPage />} />
          <Route path="/profile" element={<SpecialistUserProfile/>} />
          <Route path="/booking/:id" element={<BookingDetailsPage />} />
          <Route path="/logout" element={<LogOut/>} />  
        </Routes>
      
    );
}