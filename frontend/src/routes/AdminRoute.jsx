import {Routes, Route } from "react-router-dom";

import LoginPage from "../admin/LoginPage";
import Dashboard from "../admin/Dashboard";
import UserDetails from "../admin/UserDetails";
import ComplaintPage from "../admin/ComplaintPage";
import ContactPage from "../admin/ContactPage";

function AdminRoute() {

  return (
    
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/user-details/:id" element={<UserDetails/>} />
          <Route path="/contact" element={<ContactPage/>} />
          <Route path="/complaints" element={<ComplaintPage/>} /> 
        </Routes>
      
  );
}


export default  AdminRoute ;
