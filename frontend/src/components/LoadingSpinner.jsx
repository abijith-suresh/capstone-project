import React from "react";

const LoadingSpinner = ({ text = "Loading..." }) => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="flex items-center gap-x-4 rounded-xl bg-gray-800 px-8 py-3 font-medium text-white">
          <svg
            className="h-5 w-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
