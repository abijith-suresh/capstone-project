import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    // Confirm the deletion
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action is irreversible."
      )
    ) {
      return;
    }

    setIsDeleting(true);
    setError(null);
    setSuccess(null);

    // Retrieve the account type (either 'customer' or 'specialist')
    const accountType = localStorage.getItem("accountType");

    try {
      let authResponse;
      let customerResponse;

      if (accountType === "customer") {
        // Delete the customer account via the Auth Service
        authResponse = await fetch(
          `http://localhost:9000/api/auth/delete?email=${localStorage.getItem(
            "userEmail"
          )}`,
          {
            method: "DELETE",
          }
        );

        if (!authResponse.ok) {
          throw new Error("Failed to delete account from Auth service.");
        }

        // Delete the customer data via the Customer Service
        customerResponse = await fetch(
          `http://localhost:9002/api/customer/email/${localStorage.getItem(
            "userEmail"
          )}`,
          {
            method: "DELETE",
          }
        );
      } else if (accountType === "specialist") {
        // Delete the specialist account via the Auth Service
        authResponse = await fetch(
          `http://localhost:9000/api/auth/delete?email=${localStorage.getItem(
            "userEmail"
          )}`,
          {
            method: "DELETE",
          }
        );

        if (!authResponse.ok) {
          throw new Error("Failed to delete account from Auth service.");
        }

        // Delete the specialist data via the Customer Service (or any other service you use for specialists)
        customerResponse = await fetch(
          `http://localhost:9005/api/specialists/email/${localStorage.getItem(
            "userEmail"
          )}`,
          {
            method: "DELETE",
          }
        );
      } else {
        throw new Error("Invalid account type.");
      }

      if (customerResponse && customerResponse.ok) {
        setSuccess("Your account has been deleted successfully.");
        // Optionally, log the user out or redirect them to a different page after successful deletion.
      } else {
        const errorData = await customerResponse.json();
        setError(errorData.message || "Failed to delete account data.");
      }
    } catch (error) {
      setError(error.message || "An error occurred during account deletion.");
    } finally {
      setIsDeleting(false);
      navigate("/");
    }
  };

  return (
    <div className="p-6 rounded-lg shadow-md sm:p-8">
      <h2 className="text-2xl font-semibold text-red-600">Delete Account</h2>
      <hr className="mt-4 mb-6 border-gray-300" />
      <p className="text-lg text-gray-800">
        Are you sure you want to delete your account? This action is
        irreversible.
      </p>
      <p className="mt-4 text-sm text-gray-600">
        Please make sure you have backed up all your data before proceeding with
        account deletion.
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
