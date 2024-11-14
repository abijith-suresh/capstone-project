import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("customer");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input change for email and password
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Handle radio button change for user type
  const handleUserTypeChange = (e) => setUserType(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch user data from JSON Server using fetch API based on email
      const response = await fetch(`http://localhost:5000/auth?email=${email}`);

      if (!response.ok) {
        throw new Error("Something went wrong while fetching user data.");
      }

      const users = await response.json();
      const user = users[0];

      // Check if user exists and password matches
      if (user && user.password === password && user.role === userType) {
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userRole", user.role);

        // Redirect based on the role of the user
        if (user.role === "customer") {
          navigate("/customer/dashboard");
        } else if (user.role === "specialist") {
          navigate("/specialist/dashboard");
        }
      } else {
        // If invalid login, show an error message
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Content Section */}
      <div class="max-w-md rounded-3xl bg-gradient-to-t from-blue-700 via-blue-700 to-blue-600 px-4 py-10 text-white sm:px-10 md:m-6 md:mr-8">
        <p class="mb-20 font-bold tracking-wider">SNAPSERVE</p>
        <p class="mb-4 text-3xl font-bold md:text-4xl md:leading-snug">
          Start your <br />
          journey with us
        </p>
        <p class="mb-28 leading-relaxed text-gray-200">
          Find trusted specialists for your needs. Whether you're looking for
          home repairs, tutors, or personal care, we're here to help.
        </p>
      </div>

      {/* Right Login Form Section */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
            Sign In
          </h2>
          <p className="text-center text-sm text-gray-600 mb-10">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Create one
            </Link>
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
                className="w-full px-4 py-2 mt-2 border rounded-md border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
                className="w-full px-4 py-2 mt-2 border rounded-md border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Enter your password"
              />
            </div>

            <div className="mb-6 flex flex-col gap-y-4 gap-x-4 lg:flex-row">
              {/* Customer Radio Button */}
              <div className="relative flex w-full items-center justify-center">
                <input
                  className="peer hidden"
                  type="radio"
                  name="userType"
                  value="customer"
                  checked={userType === "customer"}
                  onChange={handleUserTypeChange}
                  id="customerRadio"
                />
                <label
                  className={`flex w-full items-center justify-center rounded-lg py-2 cursor-pointer transition-all duration-300 shadow-lg 
              ${
                userType === "customer"
                  ? "bg-blue-600 text-white shadow-xl scale-100"
                  : "bg-white text-blue-800 shadow-md hover:bg-blue-200 hover:shadow-xl hover:scale-105"
              } 
              active:scale-95`}
                  htmlFor="customerRadio"
                >
                  <span className="font-medium text-lg">Customer</span>
                </label>
              </div>

              {/* Specialist Radio Button */}
              <div className="relative flex w-full items-center justify-center">
                <input
                  className="peer hidden"
                  type="radio"
                  name="userType"
                  value="specialist"
                  checked={userType === "specialist"}
                  onChange={handleUserTypeChange}
                  id="specialistRadio"
                />
                <label
                  className={`flex w-full items-center justify-center rounded-lg py-2 cursor-pointer transition-all duration-300 shadow-lg 
                ${
                  userType === "specialist"
                    ? "bg-blue-600 text-white shadow-xl scale-100"
                    : "bg-white text-blue-800 shadow-md hover:bg-blue-200 hover:shadow-xl hover:scale-105"
                } 
                active:scale-95`}
                  htmlFor="specialistRadio"
                >
                  <span className="font-medium text-lg">Specialist</span>
                </label>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full flex items-center justify-center rounded-lg py-2 cursor-pointer transition-all duration-300 shadow-lg 
    bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-xl hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <span className="font-medium text-lg">Sign In</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
