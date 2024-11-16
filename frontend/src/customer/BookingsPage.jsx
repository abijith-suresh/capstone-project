import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import BookingCard from "../components/BookingCard";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  // Fetch bookings data from the API
  useEffect(() => {
    const fetchBookings = async () => {
      const id = localStorage.getItem("userId");
      try {
        const response = await fetch(
          `http://localhost:9002/api/customer/${id}/bookings`
        );
        const data = await response.json();

        const sortedBookings = data.sort((a, b) => {
          const statusOrder = a.status === "Upcoming" ? -1 : 1;
          const dateOrder = new Date(a.bookingDate) - new Date(b.bookingDate);

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
    setBookings((prevBookings) =>
      prevBookings.filter((b) => b.id !== bookingId)
    );
  };

  return (
    <>
      <Navbar userType="customer" />

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 mt-20">
        <h1 className="text-4xl font-semibold text-gray-900 text-center px-4">
          Your Bookings
        </h1>
        <p className="mt-1 text-sm text-gray-500 text-center px-4">
          View and manage your bookings.
        </p>

        {/* Horizontal Card Layout */}
        <div className="mt-6 flex flex-col">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <BookingCard
                key={booking.bookingId}
                booking={booking}
                onCancel={handleCancelBooking}
              />
            ))
          ) : (
            <p className="text-gray-600">You have no bookings.</p>
          )}
        </div>
      </div>
    </>
  );
}
