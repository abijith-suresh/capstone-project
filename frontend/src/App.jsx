import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";
import AboutPage from "./pages/AboutPage";
import ContactUsPage from "./pages/ContactUsPage";
import CustomerDashboardPage from "./pages/CustomerDashboardPage";
import FaqPage from "./pages/FaqPage";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import UserProfile from "./pages/UserProfile";
import BookingsPage from "./pages/BookingsPage";
import SpecialistDetailsPage from "./pages/SpecialistDetailsPage";
import BookingDetailsPage from "./pages/BookingDetailsPage";
import CreateBooking from "./pages/CreateBooking";
import AddSpecialistDetailsPage from "./pages/AddSpecialistDetailsPage";
import AddCustomerDetailsPage from "./pages/AddCustomerDetailsPage";
import SpecialistDashboardPage from "./pages/SpecialistDashboardPage";
import AdminRoute from "./admin/AdminRoute";
import CustomerRoute from "./customer/CustomerRoute";
import SpecialistRoute from "./specialist/SpecialistRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          {/* <Route path="/customer/dashboard" element={<CustomerDashboardPage />} />
          <Route path="/specialist/dashboard" element={<SpecialistDashboardPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/specialist/:id" element={<SpecialistDetailsPage />} />
          <Route path="/bookings/:id" element={<BookingDetailsPage />} />
          <Route path="/create-booking/:id" element={<CreateBooking />} />
          <Route path="/specialist/complete-profile" element={<AddSpecialistDetailsPage />} />
          <Route path="/customer/complete-profile" element={<AddCustomerDetailsPage />} /> */}

          <Route path="/admin/*" element={<AdminRoute />} /> 
          <Route path="/customer/*" element={<CustomerRoute />} /> 
          <Route path="/specialist/*" element={<SpecialistRoute />} /> 
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
