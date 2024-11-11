import { useState } from "react";
import Navbar from "../components/Navbar";

export default function BookingsPage({ user, bookings }) {
  const [activeTab, setActiveTab] = useState("current");
  const [dropdownLabel, setDropdownLabel] = useState("Current Bookings");

  // Handle tab selection and update dropdown label
  const handleTabSelection = (tab, label) => {
    setActiveTab(tab);
    setDropdownLabel(label);
  };

  return (
    <>
      <Navbar userType={user.accountType} />

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 mt-20">
        <h1 className="text-4xl font-semibold text-gray-900 text-center px-4">
          Your Bookings
        </h1>
        <p className="mt-1 text-sm text-gray-500 text-center px-4">
          View and manage your current and past bookings.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative my-4 w-56 sm:block md:hidden mx-auto">
            <input
              className="peer hidden"
              type="checkbox"
              name="select-1"
              id="select-1"
            />
            <label
              htmlFor="select-1"
              className="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-700 peer-checked:ring"
            >
              {dropdownLabel}
            </label>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
            <ul className="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
              <li
                onClick={() => handleTabSelection("current", "Current Bookings")}
                className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white"
              >
                Current Bookings
              </li>
              <li
                onClick={() => handleTabSelection("past", "Past Bookings")}
                className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white"
              >
                Past Bookings
              </li>
            </ul>
          </div>
          {/* Sidebar for Tab Selection */}
          <div className="hidden md:block col-span-1">
            <ul className="space-y-4">
              <li
                onClick={() => handleTabSelection("current")}
                className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-semibold text-gray-900 hover:bg-blue-50 transition ${
                  activeTab === "current" ? "bg-blue-100" : ""
                }`}
              >
                Current Bookings
              </li>
              <li
                onClick={() => handleTabSelection("past")}
                className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-semibold text-gray-900 hover:bg-blue-50 transition ${
                  activeTab === "past" ? "bg-blue-100" : ""
                }`}
              >
                Past Bookings
              </li>
            </ul>
          </div>

          {/* Content Area */}
          <div className="md:col-span-2">
            {/* Current Bookings Section */}
            {activeTab === "current" && (
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold text-gray-800">
                  Current Bookings
                </h2>
                <hr className="mt-4 mb-6 border-gray-200" />

                {bookings.current.length > 0 ? (
                  bookings.current.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center"
                    >
                      <div>
                        <h3 className="text-2xl font-semibold text-gray-800">
                          {booking.eventName}
                        </h3>
                        <p className="text-sm text-gray-600">{booking.date}</p>
                        <div className="mt-2 flex space-x-4">
                          <span
                            className={`inline-block py-1 px-3 text-sm font-semibold rounded-full ${
                              booking.status === "Upcoming"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
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
                          <button className="mt-2 px-4 py-2 text-sm font-semibold text-red-600 underline">
                            Cancel Booking
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">You have no current bookings.</p>
                )}
              </div>
            )}

            {/* Past Bookings Section */}
            {activeTab === "past" && (
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold text-gray-800">
                  Past Bookings
                </h2>
                <hr className="mt-4 mb-6 border-gray-200" />

                {bookings.past.length > 0 ? (
                  bookings.past.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center"
                    >
                      <div>
                        <h3 className="text-2xl font-semibold text-gray-800">
                          {booking.eventName}
                        </h3>
                        <p className="text-sm text-gray-600">{booking.date}</p>
                        <div className="mt-2 flex space-x-4">
                          <span className="inline-block py-1 px-3 text-sm font-semibold bg-gray-100 text-gray-700 rounded-full">
                            Completed
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">You have no past bookings.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
