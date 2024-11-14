import {Routes, Route } from "react-router-dom";
import CustomerDashboardPage from "../customer/CustomerDashboardPage";

import UserProfile from "../pages/UserProfile";
import BookingsPage from "../customer/BookingsPage";
import SpecialistDetailsPage from "../customer/SpecialistDetailsPage";
import HomePage from "../pages/HomePage";
import CreateBooking from "../customer/CreateBooking";
import AddCustomerDetailsPage from "../customer/AddCustomerDetailsPage";
import BookingDetailsPage from "../pages/BookingDetailsPage";


export default function CustomerRoute(){

    return(
        <Routes>
          <Route path="/dashboard" element={< CustomerDashboardPage/>} />
          <Route path="/specialist-view/:id" element={<SpecialistDetailsPage />} />
          <Route path="/complete-profile" element={<AddCustomerDetailsPage />} />
          <Route path="/create-booking/:id" element={<CreateBooking />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/booking/:id" element={<BookingDetailsPage />} />
          <Route path="/profile" element={<UserProfile/>} />
          <Route path="/logout" element={<HomePage/>} />
         
          
        </Routes>
      
    );
}
