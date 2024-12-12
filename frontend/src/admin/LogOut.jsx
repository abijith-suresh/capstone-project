import { useState, useEffect } from 'react';

const LogOut = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Effect to simulate the logout process
  useEffect(() => {
    if (isLoggingOut) {
      const timer = setTimeout(() => {
        // Simulate clearing session data
        sessionStorage.clear();
        
        // Redirect to the admin page after a slight delay
        window.location.href = '/admin'; 
      }, 2000); // Simulated delay

      return () => clearTimeout(timer);
    }
  }, [isLoggingOut]);

  const handleLogOut = () => {
    setIsLoggingOut(true);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white text-white relative">
      <div className="bg-black p-8 rounded-xl shadow-lg max-w-sm w-full text-center transform transition-all duration-300 ease-in-out">
        <h2 className="text-2xl font-semibold text-white mb-6">Are you sure you want to log out?</h2>
        
        {/* Log-out button with animated spinner */}
        <button
          onClick={handleLogOut}
          disabled={isLoggingOut}
          className="flex items-center justify-center gap-3 rounded-lg bg-white px-6 py-3 text-black font-semibold w-full transition-all duration-300 ease-in-out hover:bg-gray-400 disabled:bg-gray-600"
        >
          
          <span>{isLoggingOut ? 'Logging out...' : 'Log Out'}</span>
        </button>

        {/* Loading message shown when logging out */}
        {isLoggingOut && (
          <p className="mt-4 text-sm text-gray-400">
            Please wait, we are logging you out...
          </p>
        )}
      </div>

      
      {isLoggingOut && (
        <div className="absolute inset-0 bg-black opacity-70 flex justify-center items-center z-50">
          <div className="flex items-center space-x-3">
            {/* Spinner */}
            <svg
              className="h-8 w-8 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>

          
          </div>
        </div>
      )}
    </div>
  );
};

export default LogOut;
