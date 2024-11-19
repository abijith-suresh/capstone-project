import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";

export default function SpecialistUserProfile() {
  // State to manage selected tab and dropdown label
  const [activeTab, setActiveTab] = useState("profile");
  const [dropdownLabel, setDropdownLabel] = useState("Profile");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // State to store specialist data
  const [specialist, setSpecialist] = useState(null);
  const [editableSpecialist, setEditableSpecialist] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // State to handle edit actions
  const [newServices, setNewServices] = useState([]);
  const [newAvailability, setNewAvailability] = useState([]);
  const [newPrice, setNewPrice] = useState("");

  // Fetch specialist data
  useEffect(() => {
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

    if (accountType !== "specialist") {
      setError("Invalid account type. Only 'specialist' is supported.");
      setLoading(false);
      return;
    }

    const endpoint = `http://localhost:9005/api/specialists/email/${userEmail}`;

    setLoading(true); // Start loading before fetching data

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch specialist data.");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setSpecialist(data);
          setEditableSpecialist(data);
        } else {
          setError("Specialist data not found.");
        }
        setLoading(false); // Stop loading once data is fetched
      })
      .catch((err) => {
        console.error("Error fetching data:", err); // Log error if fetch fails
        setError("Failed to fetch specialist data.");
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);

  const handleUpdatePassword = () => {
    if (!currentPassword || !newPassword) {
      alert("Please fill in both fields");
      return;
    }

    if (currentPassword === newPassword) {
      alert("New password cannot be the same as current password");
      return;
    }

    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      alert("No user email found.");
      return;
    }

    const updatePasswordPayload = {
      email: userEmail,
      oldPassword: currentPassword,
      newPassword: newPassword,
    };

    fetch("http://localhost:9000/api/auth/update/password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatePasswordPayload),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text || "Failed to update password");
          });
        }
        return response.text();
      })
      .then((data) => {
        alert(data);

        setCurrentPassword("");
        setNewPassword("");
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
      });
  };

  // Handle image upload for profile picture
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle save changes (Update specialist profile)
  const handleSaveChanges = () => {
    // For now, just log the changes. In a real application, this would update the data.
    console.log("Saving changes:", editableSpecialist, profileImage);
    setIsEditing(false);
  };

  // Handle cancel edits and reset to original state
  const handleCancelEdit = () => {
    setEditableSpecialist({
      ...specialist,
    });
    setProfileImage(specialist.profileImageUrl); // Reset profile image to original
    setIsEditing(false);
  };

  const handleAddService = () => {
    setEditableSpecialist({
      ...editableSpecialist,
      services: [...editableSpecialist.services, newServices],
    });
    setNewServices("");
  };

  const handleAddAvailability = () => {
    setEditableSpecialist({
      ...editableSpecialist,
      availability: [...editableSpecialist.availability, newAvailability],
    });
    setNewAvailability("");
  };

  const handleChangePrice = (event) => {
    setNewPrice(event.target.value);
  };

  const handleTabSelection = (tab, label) => {
    setActiveTab(tab);
    setDropdownLabel(label);
    setIsDropdownOpen(false);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!specialist) {
    return <div>No specialist found</div>;
  }

  return (
    <>
      <Navbar userType={"specialist"} />

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 mt-20">
        <h1 className="text-4xl font-semibold text-gray-900 text-center px-4">
          {specialist.name}'s Profile
        </h1>
        <p className="mt-1 text-sm text-gray-500 text-center px-4">
          Manage and update your specialist account settings.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mobile Navigation */}
          <div className="relative my-4 w-56 sm:block md:hidden mx-auto">
            <input
              className="peer hidden"
              type="checkbox"
              name="select-1"
              id="select-1"
              checked={isDropdownOpen}
              onChange={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            <label
              htmlFor="select-1"
              className="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-gray-700 peer-checked:ring"
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
                className="cursor-pointer px-3 py-2 text-sm text-slate-600"
              >
                Profile
              </li>
              <li
                onClick={() => handleTabSelection("services", "Services")}
                className="cursor-pointer px-3 py-2 text-sm text-slate-600"
              >
                Services
              </li>
              <li
                onClick={() =>
                  handleTabSelection("availability", "Availability")
                }
                className="cursor-pointer px-3 py-2 text-sm text-slate-600"
              >
                Availability
              </li>
              <li
                onClick={() => handleTabSelection("price", "Price")}
                className="cursor-pointer px-3 py-2 text-sm text-slate-600"
              >
                Price
              </li>
              <li
                onClick={() =>
                  handleTabSelection("password", "Password Settings")
                }
                className="cursor-pointer px-3 py-2 text-sm text-slate-600"
              >
                Password Settings
              </li>
              <li
                onClick={() => handleTabSelection("delete", "Delete Account")}
                className="cursor-pointer px-3 py-2 text-sm text-slate-600"
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
                className={`focus:outline-none focus:ring-2 focus:ring-gray-600 shadow-lg hover:shadow-xl cursor-pointer px-4 py-2 rounded-lg text-sm font-semibold text-gray-900 hover:scale-105 active:scale-95 transform transition-all duration-300 ${
                  activeTab === "profile"
                    ? "bg-gray-800 text-white shadow-xl scale-100"
                    : "bg-white text-gray-600 shadow-md hover:bg-gray-100"
                }`}
              >
                Profile
              </li>
              <li
                onClick={() => setActiveTab("services")}
                className={`focus:outline-none focus:ring-2 focus:ring-gray-600 shadow-lg hover:shadow-xl cursor-pointer px-4 py-2 rounded-lg text-sm font-semibold text-gray-900 hover:scale-105 active:scale-95 transform transition-all duration-300 ${
                  activeTab === "services"
                    ? "bg-gray-800 text-white shadow-xl scale-100"
                    : "bg-white text-gray-600 shadow-md hover:bg-gray-100"
                }`}
              >
                Services
              </li>
              <li
                onClick={() => setActiveTab("availability")}
                className={`focus:outline-none focus:ring-2 focus:ring-gray-600 shadow-lg hover:shadow-xl cursor-pointer px-4 py-2 rounded-lg text-sm font-semibold text-gray-900 hover:scale-105 active:scale-95 transform transition-all duration-300 ${
                  activeTab === "availability"
                    ? "bg-gray-800 text-white shadow-xl scale-100"
                    : "bg-white text-gray-600 shadow-md hover:bg-gray-100"
                }`}
              >
                Availability
              </li>
              <li
                onClick={() => setActiveTab("price")}
                className={`focus:outline-none focus:ring-2 focus:ring-gray-600 shadow-lg hover:shadow-xl cursor-pointer px-4 py-2 rounded-lg text-sm font-semibold text-gray-900 hover:scale-105 active:scale-95 transform transition-all duration-300 ${
                  activeTab === "price"
                    ? "bg-gray-800 text-white shadow-xl scale-100"
                    : "bg-white text-gray-600 shadow-md hover:bg-gray-100"
                }`}
              >
                Price
              </li>
              <li
                onClick={() => setActiveTab("password")}
                className={`focus:outline-none focus:ring-2 focus:ring-gray-600 shadow-lg hover:shadow-xl cursor-pointer px-4 py-2 rounded-lg text-sm font-semibold text-gray-900 hover:scale-105 active:scale-95 transform transition-all duration-300 ${
                  activeTab === "password"
                    ? "bg-gray-800 text-white shadow-xl scale-100"
                    : "bg-white text-gray-600 shadow-md hover:bg-gray-100"
                }`}
              >
                Password Settings
              </li>
              <li
                onClick={() => setActiveTab("delete")}
                className={`focus:outline-none focus:ring-2 focus:ring-gray-600 shadow-lg hover:shadow-xl cursor-pointer px-4 py-2 rounded-lg text-sm font-semibold text-gray-900 hover:scale-105 active:scale-95 transform transition-all duration-300 ${
                  activeTab === "delete"
                    ? "bg-gray-800 text-white shadow-xl scale-100"
                    : "bg-white text-gray-600 shadow-md hover:bg-gray-100"
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
                      {/* Profile Picture */}
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0"
                        onChange={handleImageUpload}
                        disabled={!isEditing}
                      />
                      <img
                        src={profileImage || specialist.profileImageUrl}
                        alt="Profile Picture"
                        className="h-20 w-20 rounded-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          document.querySelector('input[type="file"]').click()
                        }
                        className={`absolute bottom-0 right-0 p-1 bg-emerald-500 text-white rounded-full ${
                          !isEditing ? "hidden cursor-pointer" : ""
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="flex-1">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="mt-1 block w-full border-2 border-gray-300 rounded-lg p-2 focus:ring-inset transition-all duration-300 ease-in-out focus:ring-gray-500 focus:shadow-lg"
                        value={editableSpecialist.name}
                        onChange={(e) =>
                          setEditableSpecialist({
                            ...editableSpecialist,
                            name: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                      />

                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700 mt-4"
                      >
                        Job Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        className="mt-1 block w-full border-2 border-gray-300 rounded-lg p-2"
                        value={editableSpecialist.title}
                        onChange={(e) =>
                          setEditableSpecialist({
                            ...editableSpecialist,
                            title: e.target.value,
                          })
                        }
                        disabled
                      />
                    </div>
                  </div>

                  {/* Bio Section */}
                  <div className="mt-6">
                    <label
                      htmlFor="bio"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      className="mt-1 block w-full border-2 border-gray-300 rounded-lg p-2 focus:ring-inset transition-all duration-300 ease-in-out focus:ring-gray-500 focus:shadow-lg"
                      value={editableSpecialist.bio}
                      onChange={(e) =>
                        setEditableSpecialist({
                          ...editableSpecialist,
                          bio: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  {/* Address Section */}
                  <div className="mt-6">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <textarea
                      id="address"
                      className="mt-1 block w-full border-2 border-gray-300 rounded-lg p-2 focus:ring-inset transition-all duration-300 ease-in-out focus:ring-gray-500 focus:shadow-lg"
                      value={editableSpecialist.address}
                      onChange={(e) =>
                        setEditableSpecialist({
                          ...editableSpecialist,
                          address: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  {/* Contact Info Section */}
                  <div className="space-y-4 mt-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="mt-1 block w-full border-2 border-gray-300 rounded-lg p-2 focus:ring-inset transition-all duration-300 ease-in-out focus:ring-gray-500 focus:shadow-lg"
                        value={editableSpecialist.email}
                        onChange={(e) =>
                          setEditableSpecialist({
                            ...editableSpecialist,
                            email: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="mt-1 block w-full border-2 border-gray-300 rounded-lg p-2 focus:ring-inset transition-all duration-300 ease-in-out focus:ring-gray-500 focus:shadow-lg"
                        value={editableSpecialist.phoneNumber}
                        onChange={(e) =>
                          setEditableSpecialist({
                            ...editableSpecialist,
                            phone: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>

                    {/* Edit Mode Toggle */}
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="mt-4 bg-gray-800 text-white px-6 py-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ease-in-out"
                      >
                        Edit Profile
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={handleSaveChanges}
                          className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ease-in-out"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="mt-4 ml-4 bg-gray-700 text-white px-6 py-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ease-in-out"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Services Section */}
            {activeTab === "services" && (
              <div className="bg-white p-6 rounded-3xl shadow-lg sm:p-8">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Services
                </h2>
                <hr className="mt-4 mb-8 border-gray-300" />
                <div className="space-y-6">
                  {/* Edit Button */}
                  {!isEditing ? (
                    <div>
                      <ul className="space-y-2">
                        {specialist.services.length > 0 ? (
                          specialist.services.map((service, idx) => (
                            <li key={idx} className="text-gray-600">
                              {service}
                            </li>
                          ))
                        ) : (
                          <p className="text-gray-600">
                            No services added yet.
                          </p>
                        )}
                      </ul>

                      {/* Edit Button */}
                      <button
                        onClick={() => setIsEditing(true)}
                        className="mt-4 bg-gray-800 text-white px-6 py-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ease-in-out"
                      >
                        Edit Services
                      </button>
                    </div>
                  ) : (
                    <div>
                      {/* Delete current services and input to add new ones */}
                      <p className="text-sm text-gray-600 mb-4">
                        Current services will be deleted.
                      </p>

                      <input
                        type="text"
                        value={newServices}
                        onChange={(e) => setNewServices(e.target.value)}
                        placeholder="Enter new service"
                        className="mt-2 border-2 border-gray-300 rounded-lg p-2 w-full"
                      />
                      <button
                        onClick={handleAddService}
                        className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ease-in-out"
                      >
                        Add Service
                      </button>

                      {/* Cancel Editing Button */}
                      <button
                        onClick={handleCancelEdit}
                        className="mt-4 ml-4 bg-gray-700 text-white px-6 py-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ease-in-out"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Availability Section */}
            {activeTab === "availability" && (
              <div className="bg-white p-6 rounded-3xl shadow-lg sm:p-8">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Availability
                </h2>
                <hr className="mt-4 mb-8 border-gray-300" />
                <div className="space-y-6">
                  {/* Edit Button */}
                  {!isEditing ? (
                    <div>
                      {/* List of current availability */}
                      <ul className="space-y-2">
                        {specialist.availability.length > 0 ? (
                          specialist.availability.map((time, idx) => (
                            <li key={idx} className="text-gray-600">
                              {new Date(time).toLocaleString()}
                            </li>
                          ))
                        ) : (
                          <p className="text-gray-600">
                            No availability added yet.
                          </p>
                        )}
                      </ul>

                      {/* Edit Button */}
                      <button
                        onClick={() => setIsEditing(true)}
                        className="mt-4 bg-gray-800 text-white px-6 py-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ease-in-out"
                      >
                        Edit Availability
                      </button>
                    </div>
                  ) : (
                    <div>
                      {/* Instructions for deleting current availability */}
                      <p className="text-sm text-gray-600 mb-4">
                        Current availability will be deleted. Please add new
                        time slots.
                      </p>

                      {/* Input for adding new availability */}
                      <input
                        type="datetime-local"
                        value={newAvailability}
                        onChange={(e) => setNewAvailability(e.target.value)}
                        className="mt-2 border-2 border-gray-300 rounded-lg p-2 w-full"
                      />

                      {/* Add Availability Button */}
                      <button
                        onClick={handleAddAvailability}
                        className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ease-in-out"
                      >
                        Add Availability
                      </button>

                      {/* Cancel Editing Button */}
                      <button
                        onClick={handleCancelEdit}
                        className="mt-4 ml-4 bg-gray-700 text-white px-6 py-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ease-in-out"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Price Section */}
            {activeTab === "price" && (
              <div className="bg-white p-6 rounded-3xl shadow-lg sm:p-8">
                <h2 className="text-2xl font-semibold text-gray-900">Price</h2>
                <hr className="mt-4 mb-8 border-gray-300" />
                <div className="space-y-6">
                  {/* Price Input Section */}
                  <div className="flex flex-col sm:flex-row sm:space-x-6">
                    <div className="w-full">
                      {isEditing ? (
                        <>
                          <label
                            htmlFor="price"
                            className="block text-sm font-semibold text-gray-900"
                          >
                            New Price
                          </label>
                          <input
                            type="text"
                            id="price"
                            value={newPrice}
                            onChange={handleChangePrice}
                            className="mt-2 w-full border-2 border-gray-300 rounded-lg p-1 px-2 text-gray-900 focus:ring-inset transition-all duration-300 ease-in-out focus:ring-gray-500 focus:shadow-lg"
                          />
                        </>
                      ) : (
                        <input
                          type="text"
                          id="price"
                          value={specialist.price}
                          disabled
                          className="mt-2 w-full border-2 border-gray-300 rounded-lg p-1 px-2 text-gray-900 bg-gray-100 cursor-not-allowed"
                        />
                      )}
                    </div>
                  </div>

                  {/* Edit Button */}
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="mt-4 bg-gray-800 text-white px-6 py-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ease-in-out"
                    >
                      Edit Price
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditableSpecialist({
                            ...editableSpecialist,
                            price: newPrice,
                          });
                          setIsEditing(false); // Exit edit mode after saving
                        }}
                        className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ease-in-out"
                      >
                        Save Price
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="mt-4 ml-4 bg-gray-700 text-white px-6 py-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ease-in-out"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Password Settings Section */}
            {activeTab === "password" && (
              <div className="bg-white p-6 rounded-3xl shadow-lg sm:p-8">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Password Settings
                </h2>
                <hr className="mt-4 mb-8 border-gray-300" />
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:space-x-6">
                    <div className="w-full">
                      <label
                        htmlFor="current-password"
                        className="block text-sm font-semibold text-gray-900"
                      >
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="current-password"
                        className="mt-2 w-full border-2 border-gray-300 rounded-lg p-1 px-2 text-gray-900 focus:ring-inset transition-all duration-300 ease-in-out focus:ring-gray-500 focus:shadow-lg"
                        placeholder="**********"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="new-password"
                        className="block text-sm font-semibold text-gray-900"
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        id="new-password"
                        className="mt-2 w-full border-2 border-gray-300 rounded-lg p-1 px-2 text-gray-900 focus:ring-inset transition-all duration-300 ease-in-out focus:ring-gray-500 focus:shadow-lg"
                        placeholder="**********"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleUpdatePassword}
                    className="mt-4 bg-gray-800 text-white px-6 py-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ease-in-out"
                  >
                    Save Password
                  </button>
                </div>
              </div>
            )}

            {/* Delete Account Section */}
            {activeTab === "delete" && (
              <div className="p-6 rounded-lg shadow-md sm:p-8">
                <h2 className="text-2xl font-semibold text-red-600">
                  Delete Account
                </h2>
                <hr className="mt-4 mb-6 border-gray-300" />
                <p className="text-lg text-gray-800">
                  Are you sure you want to delete your account? This action is
                  irreversible.
                </p>
                <p className="mt-4 text-sm text-gray-600">
                  Please make sure you have backed up all your data before
                  proceeding with account deletion.
                </p>
                <button className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ease-in-out">
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
