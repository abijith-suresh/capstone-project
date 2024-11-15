import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";

export default function UserProfile() {
  // State to manage selected tab and dropdown label
  const [activeTab, setActiveTab] = useState("profile");
  const [dropdownLabel, setDropdownLabel] = useState("Profile");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // State to store user data
  const [user, setUser] = useState(null);
  const [editableUser, setEditableUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleUpdatePassword = () => {
    // Validation for current password and new password
    if (!currentPassword || !newPassword) {
      alert("Please fill in both fields");
      return;
    }

    if (currentPassword === newPassword) {
      alert("New password cannot be the same as current password");
      return;
    }

    // Log the password update (In real implementation, call API here)
    console.log("Updating password...");
    console.log("Current Password:", currentPassword);
    console.log("New Password:", newPassword);

    // Simulate successful password update
    alert("Password updated successfully!");

    // Reset the password fields (Optional, if needed after update)
    setCurrentPassword("");
    setNewPassword("");
  };

  // Handle tab selection and update dropdown label
  const handleTabSelection = (tab, label) => {
    setActiveTab(tab);
    setDropdownLabel(label);
    setIsDropdownOpen(false);
  };

  // Fetch user data (Mocked for now)
  useEffect(() => {
    setUser({
      name: "John Doe", // Example Name
      email: "johndoe@example.com", // Example Email
      phone: "(123) 456-7890", // Example Phone
      profilePicture: "https://via.placeholder.com/150", // Placeholder profile picture URL
      accountType: "customer", // Example Account Type
      about: "I'm a customer who loves tech and software development.", // Example About Text
    });
    setEditableUser({
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "(123) 456-7890",
      about: "I'm a customer who loves tech and software development.",
      accountType: "customer",
    });
    setLoading(false);
  }, []);

  // Handle image upload for profile picture
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Set uploaded image as profile image
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle save changes (Update user profile)
  const handleSaveChanges = () => {
    // For now, just log the changes. In a real application, this would update the data.
    console.log("Saving changes:", editableUser, profileImage);
    setIsEditing(false);
  };

  // Handle cancel edits and reset to original state
  const handleCancelEdit = () => {
    setEditableUser({
      name: user.name,
      email: user.email,
      phone: user.phone,
      about: user.about,
      accountType: user.accountType,
    });
    setProfileImage(user.profilePicture); // Reset profile image to original
    setIsEditing(false);
  };

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
                        src={profileImage || user.profilePicture}
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
                        value={editableUser.name}
                        onChange={(e) =>
                          setEditableUser({
                            ...editableUser,
                            name: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                      />

                      <label
                        htmlFor="account-type"
                        className="block text-sm font-medium text-gray-700 mt-4"
                      >
                        Account Type
                      </label>
                      <input
                        type="text"
                        id="account-type"
                        className="mt-1 block w-full border-2 border-gray-300 rounded-lg p-2"
                        value={editableUser.accountType}
                        disabled
                      />
                    </div>
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
                        value={editableUser.email}
                        onChange={(e) =>
                          setEditableUser({
                            ...editableUser,
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
                        value={editableUser.phone}
                        onChange={(e) =>
                          setEditableUser({
                            ...editableUser,
                            phone: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>

                    {/* About Section (Optional based on accountType) */}
                    {user.accountType !== "customer" && (
                      <div>
                        <label
                          htmlFor="about"
                          className="block text-sm font-medium text-gray-700"
                        >
                          About You
                        </label>
                        <textarea
                          id="about"
                          className="mt-1 block w-full border-2 border-gray-300 rounded-lg p-2"
                          rows="4"
                          value={editableUser.about || ""}
                          onChange={(e) =>
                            setEditableUser({
                              ...editableUser,
                              about: e.target.value,
                            })
                          }
                          disabled={!isEditing}
                          placeholder="Tell us a little about yourself..."
                        />
                      </div>
                    )}
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
