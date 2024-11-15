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
      const response = await fetch("http://localhost:9000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const textResponse = await response.text();

      // If the response is not OK, throw an error
      if (!response.ok) {
        throw new Error("Invalid email or password. Please try again.");
      }

      // The response is the JWT token directly as a plain string
      const token = textResponse.trim();

      if (!token) {
        throw new Error("Failed to authenticate. No token received.");
      }

      // Store the JWT token in localStorage
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("userEmail", email);

      // Decode the JWT token's payload (without needing to parse the whole response)
      const decodedToken = atob(token.split(".")[1]);
      const parsedToken = JSON.parse(decodedToken);

      // Extract roles from the decoded token
      const role = parsedToken.roles;
      localStorage.setItem("accountType", role);

      // Make a request to fetch user ID based on the role
      let userId = null;
      let userEndpoint = null;

      if (role === "customer") {
        userEndpoint = `http://localhost:9002/api/customer/email/${email}`;
      } else if (role === "specialist") {
        userEndpoint = `http://localhost:9005/api/specialist/email/${email}`;
      } else {
        throw new Error("Unknown user role.");
      }

      // Fetch user data based on the role and email
      const userResponse = await fetch(userEndpoint);
      const userData = await userResponse.json();

      if (!userData) {
        throw new Error("User data not found.");
      }

      // Assuming the data comes in an array and the user ID is in the first object
      userId = userData.id;

      // Store the user ID in localStorage
      localStorage.setItem("userId", userId);

      // Handle role-based redirection
      if (role === "customer") {
        navigate("/customer/dashboard");
      } else if (role === "specialist") {
        navigate("/specialist/dashboard");
      } else {
        setError("Unknown user role.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Content Section */}
      <div className="max-w-md rounded-3xl bg-gradient-to-t from-gray-800 via-gray-700 to-gray-600 px-4 py-10 text-white sm:px-10 md:m-6 md:mr-8">
        <p className="mb-20 font-bold tracking-wider text-gray-300">
          SNAPSERVE
        </p>
        <p className="mb-4 text-3xl font-bold md:text-4xl md:leading-snug">
          Start your <br />
          journey with us
        </p>
        <p className="mb-28 leading-relaxed text-gray-200">
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
              className="font-bold text-emerald-600 hover:text-emerald-500"
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
                className="w-full px-4 py-2 mt-2 border rounded-md border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-200 focus:shadow-lg"
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
                className="w-full px-4 py-2 mt-2 border rounded-md border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-200 focus:shadow-lg"
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
          ? "bg-gray-800 text-white shadow-xl scale-100"
          : "bg-white text-gray-600 shadow-md hover:bg-gray-100 hover:shadow-xl hover:scale-105"
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
          ? "bg-gray-800 text-white shadow-xl scale-100"
          : "bg-white text-gray-600 shadow-md hover:bg-gray-100 hover:shadow-xl hover:scale-105"
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
    bg-gray-800 text-white hover:bg-gray-700 hover:shadow-xl hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-600"
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
