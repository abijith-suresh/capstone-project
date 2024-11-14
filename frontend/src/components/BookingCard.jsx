import { Link } from "react-router-dom";

export default function BookingCard({ booking, onCancel }) {
  return (
    <Link
      to={`/customer/booking/${booking.bookingId}`} 
      className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center hover:shadow-lg hover:scale-105 transition duration-300 cursor-pointer"
    >
      <div>
        <h3 className="text-2xl font-semibold text-gray-800">
          {booking.serviceType}
        </h3>
        <p className="text-sm text-gray-600">{booking.bookingDate}</p>
        <div className="mt-2 flex space-x-4">
          <span
            className={`inline-block py-1 px-3 text-sm font-semibold rounded-full ${
              booking.status === "Upcoming"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {booking.status}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
          View Details
        </button>
        {booking.status === "Upcoming" && (
          <button
            className="mt-2 px-4 py-2 text-sm font-semibold text-red-600 underline"
            onClick={(e) => {
              e.stopPropagation(); 
              onCancel(booking.id);
            }}
          >
            Cancel Booking
          </button>
        )}
      </div>
    </Link>
  );
}
