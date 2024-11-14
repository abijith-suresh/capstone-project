import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/snapserve.svg";

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
    photos: [], // Can add functionality to upload multiple photos
  });
  const [newService, setNewService] = useState(""); // Separate state for new service input
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
    setNewService(e.target.value); // Update new service input
  };

  const handleAddCustomService = () => {
    if (newService && !formData.services.includes(newService)) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, newService], // Add new service to the list
      }));
      setNewService(""); // Clear the input field after adding the service
    }
  };

  const handleRemoveService = (service) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s !== service), // Remove service from the list
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare the form data for sending to the backend
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phoneNumber", formData.phoneNumber);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("bio", formData.bio);
    formDataToSend.append("experience", formData.experience);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("profileImage", formData.profileImage);

    // Add services
    formData.services.forEach((service) => {
      formDataToSend.append("services[]", service);
    });

    // Add photos if needed
    formData.photos.forEach((photo) => {
      formDataToSend.append("photos[]", photo);
    });

    try {
      const response = await fetch("http://localhost:5000/specialists", {
        method: "POST",
        body: formDataToSend, // Using FormData for file uploads
      });

      if (!response.ok) {
        throw new Error("Something went wrong while saving your details.");
      }

      navigate("/specialist-dashboard"); // Redirect after successful submission
    } catch (error) {
      console.error("Error:", error);
      setIsSubmitting(false);
    }
  };

  return (
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
                className="w-full flex justify-center items-center px-4 py-1 border-2 border-dashed border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:border-indigo-500 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 cursor-pointer"
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
                className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
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
                className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
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
                className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
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
                className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
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
                className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
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
                className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
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
                className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
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
              Add a Custom Service
            </label>
            <div className="mt-2 flex">
              <input
                id="newService"
                name="newService"
                type="text"
                value={newService}
                onChange={handleCustomServiceChange}
                className="block w-full rounded-md border-0 pl-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                placeholder="Enter a new service"
              />
              <button
                type="button"
                onClick={handleAddCustomService}
                className="ml-2 text-indigo-600 hover:text-indigo-700"
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
                  className="inline-flex items-center bg-gray-200 px-4 py-2 rounded-lg text-sm"
                >
                  <span>{service}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveService(service)}
                    className="ml-2 text-red-600"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Address Field (Full Width) */}
          <div className="md:col-span-2">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-900"
            >
              Address
            </label>
            <div className="mt-2">
              <input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                required
                className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-auto px-6 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-indigo-300"
            >
              {isSubmitting ? "Saving..." : "Save Details"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSpecialistDetailsPage;
