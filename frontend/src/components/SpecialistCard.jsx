import React from "react";

const SpecialistCard = ({ specialist }) => {
  return (
    <div
      key={specialist.id}
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
    >
      {/* Specialist Image and Rating Overlay */}
      <div className="relative">
        <img
          alt={specialist.imageAlt}
          src={specialist.imageSrc}
          className="h-56 w-full object-cover rounded-xl"
        />

        {/* Rating Overlay */}
        <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-yellow-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-slate-400 ml-1 text-sm">
            {specialist.rating}
          </span>
        </div>
      </div>

      {/* Specialist Info */}
      <div className="mt-6 text-center">
        <h3 className="text-lg font-semibold text-gray-900">
          {specialist.name}
        </h3>
        <p className="text-sm text-gray-500">{specialist.title}</p>
        <p className="mt-4 text-sm text-gray-600">{specialist.bio}</p>

        {/* Pricing and Action Button */}
        <div className="mt-4 flex justify-between items-center">
          <span className="text-gray-900 font-medium">{specialist.price}</span>
          <div className="group inline-flex items-center rounded-xl bg-blue-100 p-2 hover:bg-blue-200 transition-all duration-300 ease-in-out">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="group-hover:text-blue-500 h-5 w-5 text-blue-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
            <span className="ml-2 text-sm text-blue-500">Book Now</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialistCard;
