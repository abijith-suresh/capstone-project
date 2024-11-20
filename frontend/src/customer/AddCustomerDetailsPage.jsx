import { useState, } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/snapserve.svg";
import { LoadScript } from "@react-google-maps/api";
import AddressInput from "../components/AddressInput";

const LIBRARIES = ["places"];

const AddCustomerDetailsPage = () => {
  const [formData, setFormData] = useState({
    profileImage: null,
    name: "",
    email: `${localStorage.getItem("userEmail")}`,
    phone: "",
    gender: "male",
    dob: "",
    address: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileImage: file.name,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const requestPayload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      gender: formData.gender,
      dob: formData.dob,
      address: formData.address,
      profileImage: formData.profileImage || null,
    };

    try {
      const response = await fetch("http://localhost:9002/api/customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload),
      });

      if (!response.ok) {
        throw new Error("Something went wrong while saving your details.");
      }

      const responseData = await response.json();
      const userId = responseData.id;
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("userId", userId);

      navigate("/customer/dashboard");
    } catch (error) {
      console.error("Error:", error);
      setIsSubmitting(false);
    }
  };

  const API_KEY = "AIzaSyDNE3q1dLpNaw3iLJfKlltX7eSJsVZRqsg";

  return (
    <LoadScript googleMapsApiKey={API_KEY} libraries={LIBRARIES}>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            src={logo}
            className="mx-auto h-10 w-auto size-6"
            alt="SnapServe Logo"
          />
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-4 text-center text-2xl font-bold tracking-tight text-gray-900">
            Customer Details
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Fill out your profile details to get started.
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-3xl">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Profile Image Upload */}
            <div>
              <label
                htmlFor="profileImage"
                className="block text-sm font-medium text-gray-900"
              >
                Profile Image
              </label>
              <div className="mt-2">
                <label
                  htmlFor="profileImage"
                  className="w-full flex justify-center items-center px-4 py-1 border-2 border-dashed border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:border-gray-800 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 cursor-pointer"
                >
                  <svg
                    className="w-6 h-6 text-gray-400 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>Choose File</span>
                  <input
                    id="profileImage"
                    name="profileImage"
                    type="file"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </label>
                {formData.profileImage && (
                  <p className="mt-2 text-sm text-gray-500">
                    {formData.profileImage}
                  </p>
                )}
              </div>
            </div>

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-900"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md pl-3 border-0 py-2 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-300 focus:shadow-lg sm:text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                  className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-300 focus:shadow-lg sm:text-sm"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-900"
              >
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-300 focus:shadow-lg sm:text-sm"
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-900"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="block w-full rounded-md pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-300 focus:shadow-lg sm:text-sm"
              >
                <option
                  value="male"
                  className="hover:bg-black hover:text-white"
                >
                  Male
                </option>
                <option
                  value="female"
                  className="hover:bg-black hover:text-white"
                >
                  Female
                </option>
                <option
                  value="other"
                  className="hover:bg-black hover:text-white"
                >
                  Other
                </option>
              </select>
            </div>

            {/* Date of Birth */}
            <div>
              <label
                htmlFor="dob"
                className="block text-sm font-medium text-gray-900"
              >
                Date of Birth
              </label>
              <input
                id="dob"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                required
                className="block w-full rounded-md px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-300 focus:shadow-lg sm:text-sm"
              />
            </div>

            {/* Address */}
            <AddressInput formData={formData} setFormData={setFormData} />

            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-auto px-6 py-2 text-sm font-semibold text-white bg-black rounded-md shadow-md disabled:bg-gray-600 hover:scale-105 active:scale-95 transform transition-all"
              >
                {isSubmitting ? "Saving..." : "Save Details"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </LoadScript>
  );
};

export default AddCustomerDetailsPage;
