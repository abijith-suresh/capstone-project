import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import BookingCard from "../components/BookingCard";

export default function AppointmentsPage() {
  const [bookings, setBookings] = useState([]);

  // Fetch bookings data from the API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:5000/bookings");
        const data = await response.json();

        // Filter bookings to only show "Completed" status
        const completedBookings = data.filter(
          (booking) => booking.status === "Completed"
        );

        // Sort the completed bookings by date (earliest first)
        const sortedBookings = completedBookings.sort((a, b) => {
          return (
            new Date(a.bookingDetails.date) - new Date(b.bookingDetails.date)
          );
        });

        setBookings(sortedBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = (bookingId) => {
    setBookings((prevBookings) =>
      prevBookings.filter((b) => b.id !== bookingId)
    );
  };

  return (
    <>
      <Navbar userType="specialist" />

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 mt-20">
        <h1 className="text-4xl font-semibold text-gray-900 text-center px-4">
          Your Completed Appointments
        </h1>
        <p className="mt-1 text-sm text-gray-500 text-center px-4">
          View and manage your completed Appointments.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-8">
          <div className="md:col-span-2">
            <div className="space-y-6">
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onCancel={handleCancelBooking}
                  />
                ))
              ) : (
                <p className="text-gray-600">
                  You have no completed appointments.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
