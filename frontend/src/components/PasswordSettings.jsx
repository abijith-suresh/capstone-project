// components/PasswordSettings.js
import React, { useState } from "react";

const PasswordSettings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

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

  return (
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
  );
};

export default PasswordSettings;
