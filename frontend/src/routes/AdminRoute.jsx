import {Routes, Route } from "react-router-dom";

import LoginPage from "../admin/LoginPage";
import Dashboard from "../admin/Dashboard";
import SpecialistDetails from "../admin/SpecialistDetails";
import ComplaintPage from "../admin/ComplaintPage";
import ContactPage from "../admin/ContactPage";
import LogOut from "../admin/LogOut";

function AdminRoute() {

  return (
    
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/specialist-details/:id" element={<SpecialistDetails/>} />
          <Route path="/contact" element={<ContactPage/>} />
          <Route path="/complaints" element={<ComplaintPage/>} /> 
          <Route path="/logout" element={<LogOut/>} /> 
          
        </Routes>
      
  );
}


export default  AdminRoute ;
