import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import BookingCard from "../components/BookingCard";

export default function BookingsPage({ user }) {
  const [bookings, setBookings] = useState([]);

  // Fetch bookings data from the API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:5000/bookings");
        const data = await response.json();

        // Sort the bookings: First by status (Upcoming first), then by date (earliest first)
        const sortedBookings = data.sort((a, b) => {
          const statusOrder = a.status === "Upcoming" ? -1 : 1;
          const dateOrder =
            new Date(a.bookingDetails.date) - new Date(b.bookingDetails.date);

          return statusOrder || dateOrder;
        });

        setBookings(sortedBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = (bookingId) => {
    // This is where you would call an API to cancel the booking, or update local state
    setBookings((prevBookings) =>
      prevBookings.filter((b) => b.id !== bookingId)
    );
  };

  return (
    <>
      <Navbar userType={user.accountType} />

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 mt-20">
        <h1 className="text-4xl font-semibold text-gray-900 text-center px-4">
          Your Bookings
        </h1>
        <p className="mt-1 text-sm text-gray-500 text-center px-4">
          View and manage your bookings.
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
                <p className="text-gray-600">You have no bookings.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
