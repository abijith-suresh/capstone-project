import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { scroller } from "react-scroll";
import ValuesSection from "./ValueSection";

const AboutPage = () => {
  useEffect(() => {
    scroller.scrollTo("top", {
      smooth: true,
      offset: 0,
      duration: 750,
    });
  }, []);

  return (
    <div className="bg-white text-black" id="top">
      <Header />

      {/* Main Content */}
      <div className="px-6 pt-16 lg:px-8">

        {/* Hero Section */}
        <section className="py-40 text-center bg-white">
          <h1 className="text-5xl font-bold leading-tight text-black tracking-wide">
            Welcome to SnapServe
          </h1>
          <p className="mt-6 text-lg sm:text-xl max-w-2xl mx-auto text-gray-600 opacity-80">
            Connecting you with trusted specialists for your home, work, and life needs—fast, reliable, and easy.
          </p>
        </section>

        {/* Mission Section */}
        <section className="py-32 text-center">
          <h2 className="text-4xl font-semibold text-black tracking-wide">
            Our Mission
          </h2>
          <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto opacity-90">
            At SnapServe, we’re committed to making it easier to find reliable specialists, quickly and effortlessly.
          </p>
        </section>

        {/* Values Section */}
        <ValuesSection />

        {/* Meet Our Team Section */}
        <section className="py-32 bg-gray-50 text-center">
          <h2 className="text-3xl font-semibold text-black">Meet Our Team</h2>
          <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto opacity-80">
            A passionate and dedicated team bringing you the best of what we do.
          </p>

          <div className="mt-12 flex justify-center gap-16">
            {/* Team Member 1 */}
            <div className="flex flex-col items-center text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Abijith S"
                className="w-32 h-32 rounded-full border-4 border-gray-100 shadow-lg"
              />
              <h3 className="mt-6 text-xl font-semibold text-black">Abijith S</h3>
              <p className="text-gray-600 opacity-75">Co-Founder</p>
            </div>

            {/* Team Member 2 */}
            <div className="flex flex-col items-center text-center">
              <img
                src="https://via.placeholder.com/150"
                alt="Aarzoo"
                className="w-32 h-32 rounded-full border-4  border-gray-100 shadow-lg"
              />
              <h3 className="mt-6 text-xl font-semibold text-black">Aarzoo</h3>
              <p className="text-gray-600 opacity-75">Co-Founder</p>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
