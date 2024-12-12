import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";
import MapComponent from "../components/MapComponent";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const BookingDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false); // To handle multiple clicks
  const [error, setError] = useState(null);

  // Generalized function to handle booking status updates
  const handleUpdateBookingStatus = async (status) => {
    try {
      setIsUpdating(true);
      const response = await fetch(
        `http://localhost:9001/api/booking/${booking.bookingId}/status?status=${status}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        toast.success(`Booking has been marked as ${status}!`, {
          position: "top-center",
          duration: 3000,
          style: {
            background: "#1F2937",
            color: "#FFF",          
            borderRadius: "10px",  
            padding: "16px",        
            fontSize: "16px",       
          },
        })
      } else {
        toast.error( "Failed to update booking status.", {
          position: "top-center",
          duration: 3000,
          style: {
            background: "#1F2937", 
            color: "#FFF",          
            borderRadius: "10px",  
            padding: "16px",        
            fontSize: "16px",       
          },
        });
      }
    } catch (error) {
      console.error(`Error updating booking status to ${status}`, error);
      toast.error( `An error occurred while updating the booking status to ${status}.`, {
        position: "top-center",
        duration: 3000,
        style: {
          background: "#1F2937", 
          color: "#FFF",          
          borderRadius: "10px",  
          padding: "16px",        
          fontSize: "16px",       
        },
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Fetch booking details when the component mounts
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`http://localhost:9001/api/booking/${id}`);
        if (response.ok) {
          const data = await response.json();
          setBooking(data);
        } else {
          console.error("Booking not found");
          setError("Booking not found");
        }
      } catch (error) {
        console.error("Error fetching booking details:", error);
        setError("Error fetching booking details");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
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
      <Navbar userType={localStorage.getItem("accountType")} />

      <div className="max-w-7xl mx-auto">
        {/* Booking Info Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <div className="flex flex-col sm:flex-row gap-8">
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
            </div>
          </div>
        </div>

        {/* Specialist Info Section */}
        {localStorage.getItem("accountType") === "customer" && (
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

                <div className="text-sm text-gray-600 mt-2 flex items-center">
                  Rating:{" "}
                  <span className="ml-1 font-semibold">
                    {booking.specialist.rating || "No ratings yet"}
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
                </div>

                <p className="text-sm text-gray-600 mt-2">
                  Price: {booking.specialist.price}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Customer Info Section */}
        {localStorage.getItem("accountType") === "specialist" && (
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
                  {booking.customer.phone || "Phone number not available"}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {booking.customer.address || "Address not available"}
                </p>
              </div>
            </div>
          </div>
        )}

        {localStorage.getItem("accountType") === "specialist" && (
          <MapComponent address={booking.customer.address} />
        )}

        {/* Cancel Booking Button for Customer */}
        {booking.status !== "Completed" &&
          booking.status !== "Canceled" &&
          localStorage.getItem("accountType") === "customer" && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => handleUpdateBookingStatus("Canceled")}
                disabled={isUpdating}
                className="px-5 py-2 bg-red-600 text-white rounded-lg text-lg font-semibold hover:bg-red-700 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                {isUpdating ? "Canceling..." : "Cancel Booking"}
              </button>
            </div>
          )}

        {/* Accept or Decline Booking Button for Specialist */}
        {booking.status === "Pending" &&
          localStorage.getItem("accountType") === "specialist" && (
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => handleUpdateBookingStatus("Upcoming")}
                disabled={isUpdating}
                className="px-5 py-2 bg-green-600 text-white rounded-lg text-lg font-semibold hover:bg-green-700 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                {isUpdating ? "Accepting..." : "Accept Booking"}
              </button>

              <button
                onClick={() => handleUpdateBookingStatus("Canceled")}
                disabled={isUpdating}
                className="px-5 py-2 bg-red-600 text-white rounded-lg text-lg font-semibold hover:bg-red-700 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                {isUpdating ? "Declining..." : "Decline Booking"}
              </button>
            </div>
          )}

        {/* Mark as Completed Button for Specialist (when booking is "Upcoming") */}
        {booking.status === "Upcoming" &&
          localStorage.getItem("accountType") === "specialist" && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => handleUpdateBookingStatus("Completed")}
                disabled={isUpdating}
                className="px-5 py-2 bg-emerald-600 text-white rounded-lg text-lg font-semibold hover:bg-emerald-700 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                {isUpdating ? "Marking as Completed..." : "Mark as Completed"}
              </button>
            </div>
          )}
      </div>
    </div>
  );
};

export default BookingDetailsPage;
