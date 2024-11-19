
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { scroller } from "react-scroll";
import { motion } from "framer-motion";

const HomePage = () => {
  const [imageIndex, setImageIndex] = useState(0);


  const images = [
    "src/images/home-img.svg",
    "src/images/home-img-2.svg",
    "src/images/home-img-3.svg",
  ];


  useEffect(() => {
    // Scroll to top on component mount
    scroller.scrollTo("top", {
      smooth: true,
      offset: 0,
      duration: 750,
    });

    // Change the image every 2 seconds
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); 

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="bg-white" id="top">
      <Header />
      <div className="mx-auto h-full px-4 py-20 md:py-36 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8 mt-20">
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <div>
            <div className="lg:max-w-xl lg:pr-5">
              <motion.p
                className="flex text-sm uppercase text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1 inline h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="#10b981"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                    clipRule="evenodd"
                  />
                </svg>
                Finding Reliable Specialists Made Easy
              </motion.p>

              <motion.h2
                className="mb-6 max-w-lg text-3xl font-medium leading-snug tracking-tight sm:text-5xl sm:leading-snug"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Simplifying the way you find
                <span className="my-1 inline-block px-4 font-bold text-emerald-500">
                  trusted specialists
                </span>
              </motion.h2>

              <motion.p
                className="text-base text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Easily find trusted, vetted professionals for home repairs,
                cleaning, tutoring, and more—without the hassle.
              </motion.p>
            </div>
            <motion.div
              className="mt-10 flex flex-col items-center md:flex-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Link
                to="/signup"
                className="mb-3 inline-flex h-12 w-full items-center justify-center rounded-lg bg-gray-800 px-6 font-medium text-white shadow-md transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none md:mr-4 md:mb-0 md:w-auto"
              >
                Get Started
              </Link>

              <Link
                to="/about"
                className="group inline-flex items-center font-semibold text-gray-700"
              >
                Learn More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-4 h-6 w-6 transition-transform group-hover:translate-x-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>

          <div className="relative hidden lg:block lg:w-1/3 mr-16 -ml-12">
            {/* Image Container with Animated Fade Transition */}
            <motion.img
              key={imageIndex} 
              src={images[imageIndex]}
              alt="home page images"
              className="w-full h-[300px] object-cover" 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }} 
              transition={{
                opacity: { duration: 1.5 },  
                delay: 1.5,                
              }}
             
            />
          </div>
          
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
