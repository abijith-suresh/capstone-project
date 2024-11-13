import {Routes, Route } from "react-router-dom";

import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import UserDetails from "./UserDetails";
import NotFoundPage from './NotFoundPage';
import ContactPage from "./ContactPage";

function AdminRoute() {

  return (
    
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/user-details" element={<UserDetails/>} />
          <Route path="/contact" element={<ContactPage/>} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      
  );
}


export default  AdminRoute ;
