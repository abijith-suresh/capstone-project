import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../images/snapserve.svg";

const Navbar = ({ userType }) => {
  const [scrollingDown, setScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const customerNavigation = [
    { name: "Dashboard", href: "/customer/dashboard" },
    { name: "Bookings", href: "/customer/bookings" },
    { name: "Profile", href: "/customer/profile" },
    { name: "Sign Out", href: "/customer/logout" },
  ];

  const specialistNavigation = [
    { name: "Dashboard", href: "/specialist/dashboard" },
    { name: "Appointments", href: "/specialist/appointments" },
    { name: "Profile", href: "/specialist/profile" },
    { name: "Sign Out", href: "/specialist/logout" },
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
          <Link
            to={`/${userType}/dashboard`}
            className="text-2xl font-bold flex items-center"
          >
            <img src={logo} className="size-8"></img>
            <span className="ml-2 text-2xl font-bold ">Snapserve</span>
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
                className="text-sm font-medium text-gray-900 hover:text-grey-600 hover:scale-105 active:scale-95"
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
