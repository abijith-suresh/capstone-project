import React, { useState, useEffect } from "react";
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


  useEffect(() => {
    const intervalId = setInterval(handleNext, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-5xl font-semibold text-black">Our Core Values</h2>
        <div className="mt-12 relative">
          <div className="flex items-center justify-center gap-8">
            <motion.div
              key={values[currentIndex].name}
              className="w-full max-w-3xl p-16 bg-white shadow-2xl rounded-2xl"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.6 }}
            >
              {/* Icon Container */}
              <div className="mb-8 flex justify-center items-center w-20 h-20 rounded-full bg-gray-900 mx-auto">
                {/* Dynamically rendering the icon */}
                {React.createElement(values[currentIndex].icon, {
                  className: "h-10 w-10 text-white",
                })}
              </div>

              {/* Name of the Value */}
              <h3 className="text-3xl font-semibold text-black">
                {values[currentIndex].name}
              </h3>
              <p className="mt-6 text-xl text-gray-600 leading-relaxed">
                {values[currentIndex].description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>



  );
};

export default ValuesSection;
