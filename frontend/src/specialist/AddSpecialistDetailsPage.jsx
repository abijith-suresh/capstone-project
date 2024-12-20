import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/snapserve.svg";
import AddressInput from "../components/AddressInput";
import { LoadScript } from "@react-google-maps/api";

const LIBRARIES = ["places"];

const AddSpecialistDetailsPage = () => {
  const [formData, setFormData] = useState({
    profileImage: "",
    name: "",
    email: "",
    phoneNumber: "",
    title: "",
    bio: "",
    experience: "",
    price: "",
    services: [],
    address: "",
    photos: [],
    status: "",
  });
  const [newService, setNewService] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileImage: file.name,
      }));
    }
  };

  const handleCustomServiceChange = (e) => {
    setNewService(e.target.value);
  };

  const handleAddCustomService = () => {
    if (newService && !formData.services.includes(newService)) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, newService],
      }));
      setNewService("");
    }
  };

  const handleRemoveService = (service) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s !== service),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare the form data for sending to the backend
    const requestPayload = {
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      title: formData.title,
      bio: formData.bio,
      experience: formData.experience,
      price: formData.price,
      address: formData.address,
      profileImage: formData.profileImage || null,
      services: formData.services || [],
      photos:
        formData.photos && formData.photos.length > 0 ? formData.photos : null,
      status: "pending",
    };

    try {
      const response = await fetch("http://localhost:9005/api/specialists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log(errorText);
        throw new Error("Something went wrong while saving your details.");
      }

      const responseData = await response.json();
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("userId", responseData.id);

      // Redirect after successful submission
      navigate("/specialist/dashboard");
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
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Specialist Details
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
            {/* Profile Image */}
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
                  className="w-full flex justify-center items-center px-4 py-1 border-2 border-dashed border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:border-gray-600 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 cursor-pointer"
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
                  className="block w-full rounded-md pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-300 focus:shadow-lg sm:text-sm"
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
                  required
                  className="block w-full rounded-md pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-300 focus:shadow-lg sm:text-sm"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-900"
              >
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-300 focus:shadow-lg sm:text-sm"
                />
              </div>
            </div>

            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-900"
              >
                Job Title
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-300 focus:shadow-lg sm:text-sm"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-900"
              >
                Short Bio
              </label>
              <div className="mt-2">
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="block w-full rounded-md pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-300 focus:shadow-lg sm:text-sm"
                />
              </div>
            </div>

            {/* Experience */}
            <div>
              <label
                htmlFor="experience"
                className="block text-sm font-medium text-gray-900"
              >
                Years of Experience
              </label>
              <div className="mt-2">
                <input
                  id="experience"
                  name="experience"
                  type="number"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-300 focus:shadow-lg sm:text-sm"
                />
              </div>
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-900"
              >
                Hourly Rate
              </label>
              <div className="mt-2">
                <input
                  id="price"
                  name="price"
                  type="text"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-300 focus:shadow-lg sm:text-sm"
                />
              </div>
            </div>

            {/* Services Offered and Add Custom Service Input */}
            {/* Add Custom Service */}
            <div>
              <label
                htmlFor="newService"
                className="block text-sm font-medium text-gray-900"
              >
                Add a Service
              </label>
              <div className="mt-2 flex">
                <input
                  id="newService"
                  name="newService"
                  type="text"
                  value={newService}
                  onChange={handleCustomServiceChange}
                  className="block w-full rounded-md pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-300 focus:shadow-lg sm:text-sm"
                  placeholder="Enter a new service"
                />
                <button
                  type="button"
                  onClick={handleAddCustomService}
                  className="ml-2 text-gray-600 hover:text-gray-700 border border-gray-300 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Services Offered */}
            <div>
              <p className="text-sm font-medium text-gray-900">
                Services Offered
              </p>
              <div className="mt-2 flex flex-wrap gap-4">
                {formData.services.map((service, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center border border-gray-300 bg-gray-50 px-3 py-1.5 rounded-md text-sm text-gray-700"
                  >
                    <span>{service}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveService(service)}
                      className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Address Field (Full Width) */}
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

export default AddSpecialistDetailsPage;
