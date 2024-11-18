import React, { useState } from "react";

const DeleteAccount = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This action is irreversible.")) {
      return; 
    }

    setIsDeleting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("http://localhost:9000/delete-account", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({

        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete the account. Please try again.");
      }

      const data = await response.json();

      setSuccess("Your account has been deleted successfully.");

    } catch (error) {
      setError(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-6 rounded-lg shadow-md sm:p-8">
      <h2 className="text-2xl font-semibold text-red-600">Delete Account</h2>
      <hr className="mt-4 mb-6 border-gray-300" />
      <p className="text-lg text-gray-800">
        Are you sure you want to delete your account? This action is irreversible.
      </p>
      <p className="mt-4 text-sm text-gray-600">
        Please make sure you have backed up all your data before proceeding with account deletion.
      </p>

      {/* Error message */}
      {error && (
        <p className="mt-4 text-sm text-red-600">
          <strong>Error:</strong> {error}
        </p>
      )}

      {/* Success message */}
      {success && (
        <p className="mt-4 text-sm text-green-600">
          <strong>Success:</strong> {success}
        </p>
      )}

      {/* Delete Button */}
      <button
        className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ease-in-out"
        onClick={handleDeleteAccount}
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Proceed with Deletion"}
      </button>
    </div>
  );
};

export default DeleteAccount;
