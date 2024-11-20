import { useState } from "react";
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    booking_id: "",
    message: "",
    attachment: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, attachment: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const formPayload = {
      name: formData.name,
      email: formData.email,
      booking_id: formData.booking_id,
      message: formData.message,
      attachment: formData.attachment,
    };

    try {
      const response = await fetch(
        "http://localhost:9007/api/complaints/submit-complaint",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formPayload),
        }
      );

      if (response.ok) {
        toast.success("Your message has been sent successfully!");
        setFormData({ name: "", email: "", booking_id: "", message: "", attachment: "" });
      } else {
        setErrorMessage("There was an error submitting your message.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("There was an error submitting your message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white mt-24 sm:mt-30 lg:mt-36">
      <Header />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-900">Contact Us</h2>
          <p className="mt-4 text-lg text-gray-600">
            Have a question or need assistance? We’re here to help. Fill out the
            form below, and we’ll get back to you as soon as possible.
          </p>
        </div>

        {/* Success/Error Message Display */}
        {successMessage && (
          <p className="text-green-500 mt-4">{successMessage}</p>
        )}
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

        <div className="mt-10 max-w-lg mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              {/* Full Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Full Name"
                    className="block w-full rounded-md border-0 py-2 px-3 text-sm text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-gray-500 transition-all duration-300 ease-in-out focus:shadow-lg"
                  />
                </div>
              </div>

              {/* Email Address Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="block w-full rounded-md border-0 py-2 px-3 text-sm text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-gray-500 transition-all duration-300 ease-in-out focus:shadow-lg"
                  />
                </div>
              </div>

              {/* Booking ID Field */}
              <div>
                <label
                  htmlFor="booking_id"
                  className="block text-sm font-medium text-gray-700"
                >
                  Enter Booking ID
                </label>
                <div className="mt-2">
                  <input
                    id="booking_id"
                    name="booking_id"
                    type="text"
                    required
                    value={formData.booking_id}
                    onChange={handleChange}
                    placeholder="Enter booking ID"
                    className="block w-full rounded-md border-0 py-2 px-3 text-sm text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-gray-500 transition-all duration-300 ease-in-out focus:shadow-lg"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Message
                </label>
                <div className="mt-2">
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Write your message here"
                    className="block w-full rounded-md border-0 py-2 px-3 text-sm text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset transition-all duration-300 ease-in-out focus:ring-gray-500 focus:shadow-lg sm:text-sm"
                  />
                </div>
              </div>

              {/* Attachment Field (Optional) */}
              <div>
                <label
                  htmlFor="attachment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Attachment (Optional)
                </label>
                <div className="mt-2 flex items-center">
                  <label
                    htmlFor="attachment"
                    className="cursor-pointer text-sm font-medium text-teal-600 hover:text-teal-500 focus:outline-none hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out"
                  >
                    Attach a file
                  </label>
                  <input
                    id="attachment"
                    name="attachment"
                    type="file"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                  {formData.attachment && (
                    <span className="text-sm text-gray-500 ml-2">{formData.attachment.split(",")[0]}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex items-center justify-end gap-x-6">
              <button
                type="reset"
                className="text-sm font-semibold text-gray-700"
                onClick={() => setFormData({ name: "", email: "", booking_id: "", message: "", attachment: "" })}
              >
                Clear
              </button>
              <button
                type="submit"
                disabled={loading}
                className="rounded-md bg-gray-800 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 hover:shadow-xl hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-300"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
