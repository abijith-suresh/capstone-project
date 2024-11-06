import { PaperClipIcon } from "@heroicons/react/24/solid";

export default function ContactUsPage() {
  return (
    <div className="bg-white py-12 sm:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-900">Contact Us</h2>
          <p className="mt-4 text-lg text-gray-600">
            Have a question or need assistance? We’re here to help. Fill out the
            form below, and we’ll get back to you as soon as possible.
          </p>
        </div>

        <div className="mt-10 max-w-lg mx-auto">
          <form action="#" method="POST">
            <div className="space-y-8">
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
                    required
                    placeholder="Your Full Name"
                    className="block w-full rounded-md border-0 py-2 px-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900"
                >
                  Email Address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="block w-full rounded-md border-0 py-2 px-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-900"
                >
                  Your Message
                </label>
                <div className="mt-2">
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Write your message here"
                    className="block w-full rounded-md border-0 py-2 px-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="attachment"
                  className="block text-sm font-medium text-gray-900"
                >
                  Attachment (Optional)
                </label>
                <div className="mt-2 flex items-center">
                  <PaperClipIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
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
              >
                Clear
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
