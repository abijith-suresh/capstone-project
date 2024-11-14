import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";

export default function UserProfile() {
  // State to manage selected tab and dropdown label
  const [activeTab, setActiveTab] = useState("profile");
  const [dropdownLabel, setDropdownLabel] = useState("Profile");

  // State to store user data
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Handle tab selection and update dropdown label
  const handleTabSelection = (tab, label) => {
    setActiveTab(tab);
    setDropdownLabel(label);
  };

  useEffect(() => {
    // Retrieve email and accountType from localStorage
    const userEmail = localStorage.getItem("userEmail");
    const accountType = localStorage.getItem("accountType");

    if (!userEmail) {
      setError("No user email found in localStorage.");
      setLoading(false);
      return;
    }

    if (!accountType) {
      setError("No account type found in localStorage.");
      setLoading(false);
      return;
    }

    // Determine the appropriate API endpoint based on the user's role
    const endpoint =
      accountType === "customer"
        ? `http://localhost:9002/api/customer/email/${userEmail}`
        : accountType === "specialist"
        ? `http://localhost:9005/api/specialist/email/${userEmail}`
        : null;

    if (!endpoint) {
      setError("Invalid account type.");
      setLoading(false);
      return;
    }

    // Fetch user data from the corresponding endpoint
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        // Check if user data exists
        if (data) {
          setUser(data); // Assuming the user data is returned as an array
        } else {
          setError("User data not found.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch user data.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>No user found</div>;
  }

  return (
    <>
      <Navbar userType={user.accountType} />

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 mt-20">
        <h1 className="text-4xl font-semibold text-gray-900 text-center px-4">
          {user.name}'s Profile
        </h1>
        <p className="mt-1 text-sm text-gray-500 text-center px-4">
          Manage and update your account settings.
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
                onClick={() => handleTabSelection("profile", "Profile")}
                className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white"
              >
                Profile
              </li>
              <li
                onClick={() => handleTabSelection("email", "Email Settings")}
                className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white"
              >
                Email Settings
              </li>
              <li
                onClick={() =>
                  handleTabSelection("password", "Password Settings")
                }
                className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white"
              >
                Password Settings
              </li>
              <li
                onClick={() => handleTabSelection("delete", "Delete Account")}
                className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white"
              >
                Delete Account
              </li>
            </ul>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden md:block col-span-1">
            <ul className="space-y-4">
              <li
                onClick={() => setActiveTab("profile")}
                className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-semibold text-gray-900 hover:bg-blue-50 transition ${
                  activeTab === "profile" ? "bg-blue-100" : ""
                }`}
              >
                Profile
              </li>
              <li
                onClick={() => setActiveTab("email")}
                className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-semibold text-gray-900 hover:bg-blue-50 transition ${
                  activeTab === "email" ? "bg-blue-100" : ""
                }`}
              >
                Email Settings
              </li>
              <li
                onClick={() => setActiveTab("password")}
                className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-semibold text-gray-900 hover:bg-blue-50 transition ${
                  activeTab === "password" ? "bg-blue-100" : ""
                }`}
              >
                Password Settings
              </li>
              <li
                onClick={() => setActiveTab("delete")}
                className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-semibold text-gray-900 hover:bg-blue-50 transition ${
                  activeTab === "delete" ? "bg-blue-100" : ""
                }`}
              >
                Delete Account
              </li>
            </ul>
          </div>

          {/* Content Area */}
          <div className="md:col-span-2">
            {/* Profile Section */}
            {activeTab === "profile" && (
              <div className="bg-white p-6 rounded-lg shadow-xl sm:p-8">
                <h2 className="text-3xl font-semibold text-gray-800">
                  Personal Information
                </h2>
                <hr className="mt-4 mb-6 border-gray-200" />
                <div className="space-y-6">
                  {/* Profile Header Section */}
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <img
                        src={user.profilePicture}
                        alt="Profile Picture"
                        className="h-20 w-20 rounded-full object-cover ring-4 ring-indigo-500"
                      />
                    </div>
                    <div>
                      <p className="text-2xl font-semibold text-gray-800">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {user.accountType}
                      </p>
                    </div>
                  </div>

                  {/* Contact Info Section */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M17.834 6.166a8.25 8.25 0 1 0 0 11.668.75.75 0 0 1 1.06 1.06c-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788 3.807-3.808 9.98-3.808 13.788 0A9.722 9.722 0 0 1 21.75 12c0 .975-.296 1.887-.809 2.571-.514.685-1.28 1.179-2.191 1.179-.904 0-1.666-.487-2.18-1.164a5.25 5.25 0 1 1-.82-6.26V8.25a.75.75 0 0 1 1.5 0V12c0 .682.208 1.27.509 1.671.3.401.659.579.991.579.332 0 .69-.178.991-.579.3-.4.509-.99.509-1.671a8.222 8.222 0 0 0-2.416-5.834ZM15.75 12a3.75 3.75 0 1 0-7.5 0 3.75 3.75 0 0 0 7.5 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-lg text-gray-700">{user.email}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6"
                      >
                        <path d="M10.5 18.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" />
                        <path
                          fillRule="evenodd"
                          d="M8.625.75A3.375 3.375 0 0 0 5.25 4.125v15.75a3.375 3.375 0 0 0 3.375 3.375h6.75a3.375 3.375 0 0 0 3.375-3.375V4.125A3.375 3.375 0 0 0 15.375.75h-6.75ZM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 0 1 7.5 19.875V4.125Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-lg text-gray-700">{user.phone}</p>
                    </div>
                  </div>

                  {/* Conditionally render the "About" section */}
                  {user.accountType !== "customer" && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-medium text-gray-800">
                        About
                      </h3>
                      <div className="p-4 bg-gray-50 border rounded-lg border-gray-200">
                        <p className="text-gray-600">
                          {user.about || "No description available."}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Email Settings Section */}
            {activeTab === "email" && (
              <div className="bg-white p-6 rounded-lg shadow-md sm:p-8">
                <h2 className="text-2xl font-semibold">Email Settings</h2>
                <hr className="mt-4 mb-8" />
                <p className="text-lg font-semibold">Email Address</p>
                <div className="flex items-center justify-between">
                  <p className="text-gray-600">
                    Your email address is <strong>{user.email}</strong>
                  </p>
                  <button className="inline-flex text-sm font-semibold text-blue-600 underline">
                    Change
                  </button>
                </div>
              </div>
            )}

            {/* Password Settings Section */}
            {activeTab === "password" && (
              <div className="bg-white p-6 rounded-lg shadow-md sm:p-8">
                <h2 className="text-2xl font-semibold">Password Settings</h2>
                <hr className="mt-4 mb-8" />
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:space-x-4">
                    <div className="w-full">
                      <label
                        htmlFor="current-password"
                        className="block text-sm font-semibold text-gray-700"
                      >
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="current-password"
                        className="mt-2 w-full border-2 border-gray-300 rounded-lg p-2"
                        placeholder="**********"
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="new-password"
                        className="block text-sm font-semibold text-gray-700"
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        id="new-password"
                        className="mt-2 w-full border-2 border-gray-300 rounded-lg p-2"
                        placeholder="**********"
                      />
                    </div>
                  </div>
                  <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white">
                    Save Password
                  </button>
                </div>
              </div>
            )}

            {/* Delete Account Section */}
            {activeTab === "delete" && (
              <div className="bg-white p-6 rounded-lg shadow-md sm:p-8">
                <h2 className="text-2xl font-semibold text-red-600">
                  Delete Account
                </h2>
                <hr className="mt-4 mb-8" />
                <p className="text-lg">
                  Are you sure you want to delete your account? This action is
                  irreversible.
                </p>
                <p className="mt-4 text-sm text-gray-600">
                  Please make sure you have backed up all your data before
                  proceeding with account deletion.
                </p>
                <button className="mt-4 text-sm font-semibold text-red-600 underline">
                  Proceed with Deletion
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
