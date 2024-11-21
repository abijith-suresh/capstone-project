import { Link } from "react-router-dom";

export default function BookingCard({ booking, onCancel }) {
  return (
    <Link
      to={`/${localStorage.getItem("accountType")}/booking/${
        booking.bookingId
      }`}
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform cursor-pointer active:scale-95 border border-gray-200 hover:border-gray-500 w-full mb-6"
    >
      <div className="flex justify-between items-start">
        {/* Left Section: Specialist and Service Info */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800">
            {booking.specialist.name} - {booking.service}
          </h3>
          <p className="text-sm text-gray-600">
            {new Date(booking.appointmentTime).toLocaleString()}
          </p>

          <div className="mt-2 flex space-x-4">
            <span
              className={`inline-block py-1 px-3 text-sm font-semibold rounded-full ${
                booking.status === "Upcoming"
                  ? "bg-green-100 text-green-700"
                  : booking.status === "Completed"
                  ? "bg-blue-100 text-blue-700"
                  : booking.status === "Canceled"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {booking.status}
            </span>
          </div>
        </div>

        {/* Right Section: Price and Action Buttons */}
        <div className="flex flex-col items-end ml-6">
          <span className="text-gray-800 font-semibold">
            {booking.specialist.price}
          </span>

          <button className="mt-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 ease-in-out active:scale-95">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}
