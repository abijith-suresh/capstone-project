import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/snapserve.svg";

const AddSpecialistDetailsPage = () => {
  const [formData, setFormData] = useState({
    profileImage: "",
    name: "",
    title: "",
    bio: "",
    experience: "",
    price: "",
    services: [], // This will store the services the user adds
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

    // Log the formData to the console (this is where you'd usually send the data to your backend)
    console.log(formData);

    // Navigate to the specialist dashboard after submission (or wherever you want)
    navigate("/specialist-dashboard");
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img src={logo}   className="mx-auto h-10 w-auto size-6"></img>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Specialist Details
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Fill out your profile details to get started.
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image */}
          <div>
            <label
              htmlFor="profileImage"
              className="block text-sm font-medium text-gray-900"
            >
              Profile Image URL
            </label>
            <div className="mt-2">
              <input
                id="profileImage"
                name="profileImage"
                type="text"
                value={formData.profileImage}
                onChange={handleChange}
                required
                className="block w-full rounded-md pl-3 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
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

          {/* Add Custom Service Input */}
          <div className="mt-4">
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

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
