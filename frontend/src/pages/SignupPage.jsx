import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("customer");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input change for email, password, and confirm password
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  // Handle radio button change for user type
  const handleUserTypeChange = (e) => setUserType(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Assuming you're sending a POST request to save the new user
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: userType }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong while creating your account.");
      }

      // After successful sign up, navigate to the login page
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Left Content Section (Form) */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
            Create an Account
          </h2>
          <p className="text-center text-sm text-gray-600 mb-10">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Log in
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

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-900"
              >
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                className="w-full px-4 py-2 mt-2 border rounded-md border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Confirm your password"
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
              <span className="font-medium text-lg">Sign Up</span>
            </button>
          </form>
        </div>
      </div>

      {/* Right Content Section */}
      <div className="max-w-md rounded-3xl bg-gradient-to-t from-blue-700 via-blue-700 to-blue-600 px-4 py-10 text-white sm:px-10 md:m-6 md:ml-8">
        <p className="mb-20 font-bold tracking-wider">SNAPSERVE</p>
        <p className="mb-4 text-3xl font-bold md:text-4xl md:leading-snug">
          Start your <br />
          journey with us
        </p>
        <p className="mb-28 leading-relaxed text-gray-200">
          Find trusted specialists for your needs. Whether you're looking for
          home repairs, tutors, or personal care, we're here to help.
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
