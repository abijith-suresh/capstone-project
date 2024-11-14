import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import BookingCard from "../components/BookingCard";

export default function SpecialistDashboardPage() {
  const [bookings, setBookings] = useState([]);
  const [specialistId, setSpecialistId] = useState(null);

  // Fetch bookings when the component is mounted
  useEffect(() => {
    const loggedInSpecialistId = localStorage.getItem("specialistId");
    setSpecialistId(loggedInSpecialistId);

    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:5000/bookings");
        const data = await response.json();

        // Filter bookings by specialist ID and status "Upcoming"
        const specialistBookings = data.filter(
          (booking) =>
            booking.specialist.id === loggedInSpecialistId &&
            booking.status === "Upcoming"
        );

        setBookings(specialistBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    if (loggedInSpecialistId) {
      fetchBookings();
    }
  }, []); // Empty dependency array ensures it runs once on mount

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar userType={localStorage.getItem("userRole")} />

      {/* Main Content */}
      <div className="pt-32 pb-12 px-6 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {/* Page Title */}
          <div className="flex justify-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Your Upcoming Appointments
            </h2>
          </div>

          {/* Booking Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <p className="col-span-4 text-center text-lg text-gray-500">
                No upcoming appointments at the moment.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
