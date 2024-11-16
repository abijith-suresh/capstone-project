import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  HandThumbUpIcon,
  ClockIcon,
  UserGroupIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const values = [
  {
    name: "Trustworthiness",
    description:
      "We vet each specialist to ensure they meet high standards of quality and professionalism. With ServiceConnect, you can trust that the specialists you hire are reliable and skilled.",
    icon: HandThumbUpIcon,
  },
  {
    name: "Convenience",
    description:
      "Our platform makes it easy to find and book trusted specialists quickly, saving you time and effort so you can focus on what matters most.",
    icon: ClockIcon,
  },
  {
    name: "Customer-Centered",
    description:
      "Your satisfaction is our priority. We strive to provide a seamless, transparent, and stress-free experience, always listening and improving based on your needs.",
    icon: UserGroupIcon,
  },
  {
    name: "Quality",
    description:
      "We ensure the highest standards of skill and reliability from our specialists, so you always receive the quality service you expect.",
    icon: ShieldCheckIcon,
  },
];

const ValuesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % values.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + values.length) % values.length
    );
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-semibold text-black">Our Core Values</h2>
        <div className="mt-12 relative">
          <div className="flex items-center justify-center gap-8">
            <motion.div
              key={values[currentIndex].name}
              className="w-full max-w-md p-8 bg-white shadow-xl rounded-xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.6 }}
            >
              {/* Icon Container */}
              <div className="mb-6 flex justify-center items-center w-16 h-16 rounded-full bg-gray-900 mx-auto">
                {/* Dynamically rendering the icon */}
                {React.createElement(values[currentIndex].icon, {
                  className: "h-8 w-8 text-white", // Adjust icon size here
                })}
              </div>

              {/* Name of the Value */}
              <h3 className="text-2xl font-semibold text-black">
                {values[currentIndex].name}
              </h3>
              <p className="mt-4 text-lg text-gray-600">
                {values[currentIndex].description}
              </p>
            </motion.div>
          </div>

          {/* Carousel Navigation */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-8">
            <button
              onClick={handlePrev}
              className="bg-gray-900 text-white rounded-full p-2 shadow-lg hover:scale-105 transition"
            >
              &#60;
            </button>
          </div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-8">
            <button
              onClick={handleNext}
              className="bg-gray-900 text-white rounded-full p-2 shadow-lg hover:scale-105 transition"
            >
              &#62;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
