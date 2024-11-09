import React, { useState } from "react";
import { Link } from "react-router-dom"; 

const Navbar = ({ userType }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const customerNavigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Bookings", href: "/bookings" },
    { name: "Profile", href: "/profile" },
    { name: "Sign Out", href: "/logout" },
  ];

  const specialistNavigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Appointments", href: "/appointments" },
    { name: "Profile", href: "/profile" },
    { name: "Sign Out", href: "/logout" },
  ];

  const navigation =
    userType === "customer" ? customerNavigation : specialistNavigation;

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="text-indigo-600 text-2xl font-bold">
              Your App
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden sm:block">
            <div className="flex space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-800 hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Notification and User Profile Section */}
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              {/* Notification Icon */}
              <span className="sr-only">Notifications</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM17 16C17 12.69 15.42 10 13 10C12.33 10 11.71 10.09 11.08 10.25C10.06 6.73 7.13 5 4 5V6.27C6.43 6.93 8.01 8.77 8.91 11.08C9.93 12.84 11.98 14.06 14.19 14.06C15.44 14.06 16.58 13.33 17 12.26V16H17Z" />
              </svg>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="text-gray-800 focus:outline-none"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User"
                  className="h-8 w-8 rounded-full"
                />
              </button>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <Link
                    to="/logout"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
