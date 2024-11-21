import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import BookingCard from "../components/BookingCard";

export default function SpecialistDashboardPage() {
  const [bookings, setBookings] = useState([]);

  // Fetch bookings when the component is mounted
  useEffect(() => {
    const id = localStorage.getItem("userId");

    const fetchBookings = async () => {
      try {
        const response = await fetch(`http://localhost:9005/api/specialists/${id}/bookings`);
        const data = await response.json();
    
        if (Array.isArray(data)) {
          const filteredBookings = data.filter(
            (booking) =>
              booking.status === "Upcoming" || booking.status === "Pending"
          );
          setBookings(filteredBookings);
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    

    if (id) {
      fetchBookings();
    }
  }, []); 
  
  return (
    <div className="min-h-screen">
      <Navbar userType={localStorage.getItem("userRole")} />

      {/* Main Content */}
      <div className="pt-32 pb-12 px-6 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {/* Page Title */}
          <div className="flex justify-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Your Upcoming Appointments
            </h2>
          </div>

          {/* Booking Cards */}
          <div className="grid grid-cols-1">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <BookingCard key={booking.bookingId} booking={booking} />
              ))
            ) : (
              <p className="text-center text-lg text-gray-500">
                No upcoming appointments at the moment.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
