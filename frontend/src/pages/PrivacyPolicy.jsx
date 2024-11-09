import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export function PrivacyPolicy() {
  return (
    <div className="bg-gray-50">
      {/* Header */}
      <Header />

      {/* Privacy Policy Section */}
      <section className="px-8 py-20">
        <div className="container mx-auto">
          <div className="mb-14 text-center">
            <h1 className="text-4xl font-bold text-blue-600 mb-4 leading-snug lg:text-[40px]">
              Privacy Policy
            </h1>
            <p className="mx-auto text-lg text-gray-500 lg:max-w-3xl">
              Your privacy is important to us. Please read the following to
              understand how we collect, use, and protect your information.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold text-blue-700">
                1. Information We Collect
              </h2>
              <p className="text-gray-500">
                We collect personal information that you provide to us when you
                register for an account, make a purchase, or contact customer
                support. This information may include your name, email address,
                payment details, and other relevant information.
              </p>

              <h2 className="text-2xl font-semibold text-blue-700">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-500">
                The information we collect is used to provide and improve our
                services, communicate with you, process payments, and ensure the
                security of your account. We may also use your information for
                marketing purposes, such as sending you promotional emails.
              </p>

              <h2 className="text-2xl font-semibold text-blue-700">
                3. Data Protection
              </h2>
              <p className="text-gray-500">
                We implement security measures to protect your personal data.
                However, no method of transmission over the internet is 100%
                secure, so we cannot guarantee absolute security.
              </p>

              <h2 className="text-2xl font-semibold text-blue-700">
                4. Sharing Your Information
              </h2>
              <p className="text-gray-500">
                We do not sell or share your personal information with third
                parties, except when required by law or to provide our services
                (such as processing payments or delivering goods).
              </p>

              <h2 className="text-2xl font-semibold text-blue-700">
                5. Cookies
              </h2>
              <p className="text-gray-500">
                We use cookies to improve your experience on our website.
                Cookies are small files stored on your device that help us
                remember your preferences and track usage patterns. You can
                manage your cookie settings through your browser.
              </p>

              <h2 className="text-2xl font-semibold text-blue-700">
                6. Changes to This Privacy Policy
              </h2>
              <p className="text-gray-500">
                We may update our privacy policy from time to time. Any changes
                will be posted on this page with an updated revision date.
              </p>

              <h2 className="text-2xl font-semibold text-blue-700">
                7. Contact Us
              </h2>
              <p className="text-gray-500">
                If you have any questions about this Privacy Policy, please
                contact us at [your contact email].
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
