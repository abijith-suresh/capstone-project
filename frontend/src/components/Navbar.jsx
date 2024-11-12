import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ userType }) => {
  const [scrollingDown, setScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const customerNavigation = [
    { name: "Dashboard", href: "/customer/dashboard" },
    { name: "Bookings", href: "/bookings" },
    { name: "Profile", href: "/profile" },
    { name: "Sign Out", href: "/logout" },
  ];

  const specialistNavigation = [
    { name: "Dashboard", href: "/specialist/dashboard" },
    { name: "Appointments", href: "/appointments" },
    { name: "Profile", href: "/profile" },
    { name: "Sign Out", href: "/logout" },
  ];

  const navigation =
    userType === "customer" ? customerNavigation : specialistNavigation;

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setScrollingDown(true);
    } else {
      setScrollingDown(false);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`${
        scrollingDown ? "transform -translate-y-full" : ""
      } bg-white fixed inset-x-0 top-0 z-50 transition-transform duration-300`}
    >
      <div className="mx-auto flex h-16 items-center justify-between px-6 sm:px-8 lg:px-16">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to={`/${userType}/dashboard`} className="text-2xl font-bold text-indigo-600">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#6366F1"
              className="size-8"
            >
              <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
              <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
            </svg>
          </Link>
        </div>

        {/* Desktop and Mobile Navigation */}
        <div className="flex items-center space-x-4">
          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center justify-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-medium text-gray-900 hover:text-indigo-600"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-indigo-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden bg-white shadow-md">
          <div className="py-2 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-6 py-2 text-gray-700 hover:text-indigo-600"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
