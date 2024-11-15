import { useState } from 'react';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    attachment: '',  // Updated to be a string (URL or base64)
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
      reader.readAsDataURL(file);  // Convert file to base64
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
      message: formData.message,
      attachment: formData.attachment,  // Sending base64 or URL as a string
    };

    try {
      const response = await fetch('http://localhost:9007/api/complaints/submit-complaint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Send JSON instead of multipart/form-data
        },
        body: JSON.stringify(formPayload),
      });

      if (response.ok) {
        setSuccessMessage('Your message has been sent successfully!');
        setFormData({ name: '', email: '', message: '', attachment: '' }); // Reset form
      } else {
        setErrorMessage('There was an error submitting your message.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('There was an error submitting your message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white py-12 sm:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-900">Contact Us</h2>
          <p className="mt-4 text-lg text-gray-600">
            Have a question or need assistance? We’re here to help. Fill out the form below, and we’ll get back to you as soon as possible.
          </p>
        </div>

        {/* Success/Error Message Display */}
        {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

        <div className="mt-10 max-w-lg mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              {/* Full Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-900">
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
                    className="block w-full rounded-md border-0 py-2 px-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  />
                </div>
              </div>

              {/* Email Address Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
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
                    className="block w-full rounded-md border-0 py-2 px-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-900">
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
                    className="block w-full rounded-md border-0 py-2 px-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  />
                </div>
              </div>

              {/* Attachment Field (Optional) */}
              <div>
                <label htmlFor="attachment" className="block text-sm font-medium text-gray-900">
                  Attachment (Optional)
                </label>
                <div className="mt-2 flex items-center">
                  <button
                    type="button"
                    className="ml-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
                  >
                    Attach a file
                  </button>
                  <input
                    id="attachment"
                    name="attachment"
                    type="file"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex items-center justify-end gap-x-6">
              <button
                type="reset"
                className="text-sm font-semibold text-gray-900"
                onClick={() => setFormData({ name: '', email: '', message: '', attachment: '' })}
              >
                Clear
              </button>
              <button
                type="submit"
                disabled={loading}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
