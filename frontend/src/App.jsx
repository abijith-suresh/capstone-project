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

const user = {
  name: "John Doe",
  accountType: "customer",
  email: "johndoe@example.com",
  phone: "+1234567890",
  about:
    "I am a passionate software developer who loves creating beautiful web applications.",
  profilePicture: "https://via.placeholder.com/150",
};

const bookings = {
  current: [
    {
      id: "B001",
      eventName: "Tech Conference 2024",
      date: "2024-11-10 at 14:00",
      status: "Upcoming",
    },
    {
      id: "B002",
      eventName: "Marketing Workshop",
      date: "2024-11-15 at 09:00",
      status: "Upcoming",
    },
  ],
  past: [
    {
      id: "B003",
      eventName: "Product Launch 2023",
      date: "2023-09-10 at 10:00",
      status: "Completed",
    },
    {
      id: "B004",
      eventName: "Team Retreat 2023",
      date: "2023-08-05 at 12:00",
      status: "Completed",
    },
  ],
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
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<UserProfile user={user} />} />
          <Route
            path="/bookings"
            element={<BookingsPage user={user} bookings={bookings} />}
          />
          <Route path="/specialist/:id" element={<SpecialistDetailsPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
