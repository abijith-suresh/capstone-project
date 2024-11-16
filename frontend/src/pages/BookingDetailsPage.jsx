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
        const response = await fetch(`http://localhost:9001/api/booking/${id}`);
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
    return <LoadingSpinner />;
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
              <h3 className="text-2xl font-semibold text-gray-800">
                {booking.service}
              </h3>
              <p className="text-lg text-gray-600 mt-2">
                Scheduled on{" "}
                {new Date(booking.appointmentTime).toLocaleString()}
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
                  {booking.status || "Pending"}
                </span>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Total Price:{" "}
                <span className="font-semibold">{booking.price}</span>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Service Notes:{" "}
                <span className="font-semibold">
                  {booking.bookingNotes || "No Notes"}
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
              className={`bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32 sm:min-h-40 sm:w-40 flex items-center justify-center ${
                booking.specialist.profileImage
                  ? ""
                  : "bg-gray-200 text-gray-900 font-semibold text-7xl"
              }`}
              style={{
                backgroundImage: booking.specialist.profileImage
                  ? `url(${booking.specialist.profileImage})`
                  : "none",
              }}
            >
              {!booking.specialist.profileImage && (
                <span>{booking.specialist.name.charAt(0).toUpperCase()}</span>
              )}
            </div>

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
              <p className="text-sm text-gray-600 mt-2 flex items-center">
                Rating:{" "}
                <span className="ml-1 font-semibold">
                  {booking.specialist.rating}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#fcd34d"
                  className="w-4 h-4 ml-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
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
              className={`bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32 sm:min-h-40 sm:w-40 flex items-center justify-center ${
                booking.customer.profilePictureUrl
                  ? ""
                  : "bg-gray-200 text-gray-900 font-semibold text-7xl"
              }`}
              style={{
                backgroundImage: booking.customer.profilePictureUrl
                  ? `url(${booking.customer.profilePictureUrl})`
                  : "none",
              }}
            >
              {!booking.customer.profilePictureUrl && (
                <span>{booking.customer.name.charAt(0).toUpperCase()}</span>
              )}
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-xl font-bold text-gray-900 mt-2">
                {booking.customer.name}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {booking.customer.email}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {booking.customer.phoneNumber || "Phone number not available"}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {booking.customer.address || "Address not available"}
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
