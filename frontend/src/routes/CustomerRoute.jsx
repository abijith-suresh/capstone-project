import {Routes, Route } from "react-router-dom";
import CustomerDashboardPage from "../customer/CustomerDashboardPage";

import UserProfile from "../pages/UserProfile";
import BookingsPage from "../customer/BookingsPage";
import SpecialistDetailsPage from "../customer/SpecialistDetailsPage";
import HomePage from "../pages/HomePage";
import CreateBooking from "../customer/CreateBooking";


export default function CustomerRoute(){

    return(
        <Routes>
          <Route path="/dashboard" element={< CustomerDashboardPage/>} />
          <Route path="/specialist-view/:id" element={<SpecialistDetailsPage />} />
          <Route path="/create-booking/:id" element={<CreateBooking />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/profile" element={<UserProfile/>} />
          <Route path="/logout" element={<HomePage/>} />
         
          
        </Routes>
      
    );
}