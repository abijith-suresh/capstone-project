import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AboutPage = () => {
  return (
    <div className="bg-white">
      <Header />
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <section className="py-16 text-gray-800">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold sm:text-5xl">
              Welcome to Our Company!
            </h1>
            <p className="mt-4 text-lg sm:text-xl max-w-2xl mx-auto">
              We are a passionate team dedicated to bringing innovative
              solutions that help businesses grow and thrive.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-semibold text-gray-800">
              Our Mission
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              At Our Company, our mission is to empower individuals and
              organizations by providing cutting-edge solutions to help them
              reach their goals. We strive for excellence and prioritize
              customer satisfaction above all.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-semibold text-gray-800">Our Values</h2>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="bg-indigo-600 text-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold">Innovation</h3>
                  <p className="text-gray-200">
                    We are always looking for new ways to innovate, improve, and
                    adapt to the ever-changing needs of the world.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-indigo-600 text-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold">Integrity</h3>
                  <p className="text-gray-200">
                    We believe in doing the right thing even when no one is
                    watching, maintaining transparency and honesty in all our
                    actions.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-indigo-600 text-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold">Collaboration</h3>
                  <p className="text-gray-200">
                    We value teamwork and know that great results are achieved
                    when we work together toward a common goal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-semibold text-gray-800">
              Meet Our Team
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Our team consists of highly skilled professionals who are
              passionate about delivering exceptional results. Here's a glimpse
              of some of the people driving our success.
            </p>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
              <div className="text-center">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Team Member"
                  className="w-32 h-32 mx-auto rounded-full"
                />
                <h3 className="mt-4 text-xl font-semibold text-gray-800">
                  John Doe
                </h3>
                <p className="text-gray-600">CEO & Founder</p>
              </div>
              <div className="text-center">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Team Member"
                  className="w-32 h-32 mx-auto rounded-full"
                />
                <h3 className="mt-4 text-xl font-semibold text-gray-800">
                  Jane Smith
                </h3>
                <p className="text-gray-600">Head of Marketing</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
