import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export function TermsOfService() {
  return (
    <div className="bg-gray-50">
      {/* Header */}
      <Header />

      {/* Terms of Service Section */}
      <section className="px-8 py-20">
        <div className="container mx-auto">
          <div className="mb-14 text-center">
            <h1 className="text-4xl font-bold text-blue-600 mb-4 leading-snug lg:text-[40px]">
              Terms of Service
            </h1>
            <p className="mx-auto text-lg text-gray-500 lg:max-w-3xl">
              Please read the following terms and conditions carefully before
              using our services.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold text-blue-700">
                1. Introduction
              </h2>
              <p className="text-gray-500">
                These Terms of Service govern your use of our website and
                services. By accessing or using our services, you agree to
                comply with these terms. If you disagree with any part of the
                terms, you may not use our services.
              </p>

              <h2 className="text-2xl font-semibold text-blue-700">
                2. User Responsibilities
              </h2>
              <p className="text-gray-500">
                As a user, you agree to use the service only for lawful purposes
                and in accordance with these terms. You are responsible for
                maintaining the confidentiality of your account credentials and
                are liable for any activities conducted under your account.
              </p>

              <h2 className="text-2xl font-semibold text-blue-700">
                3. Service Availability
              </h2>
              <p className="text-gray-500">
                We strive to keep our services available at all times, but we
                cannot guarantee uninterrupted service. We may temporarily
                suspend or discontinue the service for maintenance or updates.
              </p>

              <h2 className="text-2xl font-semibold text-blue-700">
                4. Limitation of Liability
              </h2>
              <p className="text-gray-500">
                We are not responsible for any damages or losses that occur
                while using our services. Our liability is limited to the
                maximum extent permitted by law.
              </p>

              <h2 className="text-2xl font-semibold text-blue-700">
                5. Governing Law
              </h2>
              <p className="text-gray-500">
                These terms will be governed by and construed in accordance with
                the laws of the jurisdiction in which we operate.
              </p>

              <h2 className="text-2xl font-semibold text-blue-700">
                6. Changes to Terms
              </h2>
              <p className="text-gray-500">
                We reserve the right to update or modify these terms at any
                time. Changes will be effective immediately upon posting on our
                website.
              </p>

              <h2 className="text-2xl font-semibold text-blue-700">
                7. Contact Us
              </h2>
              <p className="text-gray-500">
                If you have any questions or concerns regarding these terms,
                please contact us at [your contact email].
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

export default TermsOfService;
