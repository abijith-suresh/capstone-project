import React, { useEffect } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
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

  // Animation variants for the page
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    },
  };

  return (
    <motion.div
      className="bg-white text-black"
      id="top"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <Header />

      {/* Main Content */}
      <div className="px-6 pt-16 lg:px-16">
        {/* Hero Section */}
        <section className="py-20 flex flex-col lg:flex-row items-center text-center lg:text-left space-y-12 lg:space-y-0">
          {/* Image on the Left */}
          <div className="w-full lg:w-1/2">
            <img
              src="src/images/undraw_happy_announcement_re_tsm0.svg"
              alt="Service Illustration"
              className="mx-auto rounded-lg max-w-full h-auto "
            />
          </div>

          {/* Text on the Right */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-black text-center tracking-wide">
              Welcome to
              <span className="my-1 inline-block px-4 font-bold text-emerald-500">
                SnapServe
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl max-w-2xl mx-auto text-center text-gray-600 opacity-80">
              Connecting you with trusted specialists for your home, work, and life needs—fast, reliable, and easy.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-32 bg-white">
          <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
            {/* Content on the Left */}
            <div className="lg:w-1/2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
              <div className="flex flex-col justify-center items-center h-full w-full">
                <h2 className="text-4xl font-semibold text-black tracking-wide">
                  Our Mission
                </h2>
                <p className="mt-6 text-lg sm:text-xl max-w-lg justify-center items-center text-center text-gray-700 opacity-90">
                  At SnapServe, we’re committed to making it easier to find reliable specialists, quickly and effortlessly.
                </p>
              </div>
            </div>

            {/* Image on the Right */}
            <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center">
              <img
                src="src/images/undraw_shared_goals_re_jvqd.svg"
                alt="Mission Illustration"
                className="w-full h-auto max-w-lg rounded-lg "
              />
            </div>
          </div>
        </section>

        {/* Values Section */}
        <ValuesSection />

        {/* Meet Our Team Section */}
        <section className="py-24 bg-gray-50 text-center">
          <h2 className="text-3xl font-semibold text-black">Meet Our Team</h2>
          <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto opacity-80">
            A passionate and dedicated team bringing you the best of what we do.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-12">
            {/* Team Member 1 */}
            <div className="flex flex-col items-center text-center w-48 sm:w-64">
              <img
                src="src/images/guy.png"
                alt="Abijith S"
                className="w-32 h-32 rounded-full shadow-lg"
              />
              <h3 className="mt-4 text-xl font-semibold text-black">Abijith S</h3>
              <p className="text-gray-600 opacity-75">Co-Founder</p>
            </div>

            {/* Team Member 2 */}
            <div className="flex flex-col items-center text-center w-48 sm:w-64">
              <img
                src="src/images/girl.png"
                alt="Aarzoo"
                className="w-32 h-32 rounded-full shadow-lg"
              />
              <h3 className="mt-4 text-xl font-semibold text-black">Aarzoo</h3>
              <p className="text-gray-600 opacity-75">Co-Founder</p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </motion.div>
  );
};

export default AboutPage;
