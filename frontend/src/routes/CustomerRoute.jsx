import {Routes, Route } from "react-router-dom";
import CustomerDashboardPage from "../customer/CustomerDashboardPage";

import UserProfile from "../pages/UserProfile";
import BookingsPage from "../customer/BookingsPage";
import SpecialistDetailsPage from "../customer/SpecialistDetailsPage";
import HomePage from "../pages/HomePage";


export default function CustomerRoute(){
    const user = {
        name: "John Doe",
        accountType: "customer",
        email: "johndoe@example.com",
        phone: "+1234567890",
        profilePicture: "https://via.placeholder.com/150",
      };

    return(
        <Routes>
          <Route path="/dashboard" element={< CustomerDashboardPage/>} />
          <Route path="/specialist-view/:id" element={<SpecialistDetailsPage />} />
          <Route path="/bookings" element={<BookingsPage user={user} />} />
          <Route path="/profile" element={<UserProfile/>} />
          <Route path="/logout" element={<HomePage/>} />
         
          
        </Routes>
      
    );
}