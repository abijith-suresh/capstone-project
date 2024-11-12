import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";
import AboutPage from "./pages/AboutPage";
import ContactUsPage from "./pages/ContactUsPage";
import DashboardPage from "./pages/DashboardPage";
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


const user = {
  name: "John Doe",
  accountType: "customer",
  email: "johndoe@example.com",
  phone: "+1234567890",
  profilePicture: "https://via.placeholder.com/150",
};

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
          <Route path="/customer/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<UserProfile user={user} />} />
          <Route path="/bookings" element={<BookingsPage user={user} />} />
          <Route path="/specialist/:id" element={<SpecialistDetailsPage />} />
          <Route path="/bookings/:id" element={<BookingDetailsPage />} />
          <Route path="/create-booking/:id" element={<CreateBooking />} />
          <Route path="/specialist/complete-profile" element={<AddSpecialistDetailsPage />} />
          <Route path="/customer/complete-profile" element={<AddCustomerDetailsPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
