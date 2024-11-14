import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";

export const BookingDetailsPage = () => {
  const { id } = useParams(); // Get the booking ID from the URL
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`http://localhost:5000/bookings/${id}`);
        if (response.ok) {
          const data = await response.json();
          setBooking(data);
        } else {
          console.error("Booking not found");
        }
      } catch (error) {
        console.error("Error fetching booking details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  if (!booking) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center text-red-500">
        Booking not found
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6 sm:px-8 lg:px-16 mt-16">
      <Navbar userType="customer" />
      <div className="max-w-7xl mx-auto">
        {/* Booking Info Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <div className="flex flex-col sm:flex-row gap-8">
            {/* Booking Info */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold leading-tight tracking-[-0.015em] text-gray-800">
                {booking.serviceType}
              </h3>
              <p className="text-lg text-gray-600 mt-2">
                Scheduled on {booking.bookingDetails.date}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Status:{" "}
                <span
                  className={`inline-block py-1 px-3 text-sm font-semibold rounded-full ${
                    booking.status === "Upcoming"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {booking.status}
                </span>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Duration: {booking.bookingDetails.duration}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Total Price:{" "}
                <span className="font-semibold">
                  {booking.bookingDetails.totalPrice}
                </span>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Service Notes:{" "}
                <span className="font-semibold">
                  {booking.bookingDetails.serviceNotes}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Specialist Info Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Specialist Details
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32 sm:min-h-40 sm:w-40"
              style={{
                backgroundImage: `url(${booking.specialist.profileImage})`,
              }}
            ></div>
            <div className="flex flex-col justify-center">
              <p className="text-xl font-bold text-gray-900">
                {booking.specialist.name}
              </p>
              <p className="text-sm text-gray-600">
                {booking.specialist.title}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {booking.specialist.bio}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Rating: {booking.specialist.rating} ⭐
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Price: {booking.specialist.price}
              </p>
            </div>
          </div>
        </div>

        {/* Customer Info Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Customer Details
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32 sm:min-h-40 sm:w-40"
              style={{
                backgroundImage: `url(${booking.customer.profileImage})`,
              }}
            ></div>
            <div className="flex flex-col justify-center">
              <p className="text-xl font-bold text-gray-900 mt-2">
                {booking.customer.name}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {booking.customer.contact}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {booking.customer.phone}
              </p>
            </div>
          </div>
        </div>

        {/* Cancel Booking Button */}
        {booking.status === "Upcoming" && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => alert("Booking canceled!")}
              className="px-6 py-3 bg-red-600 text-white rounded-lg text-lg font-semibold hover:bg-red-700 transition-all duration-300"
            >
              Cancel Booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingDetailsPage;
