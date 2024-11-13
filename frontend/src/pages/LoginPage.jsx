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
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
           <img src='src\images\snapserve.svg'   className=" mx-auto h-10 w-auto size-6"></img>
          <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
            Welcome Back to SnapServe
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to find reliable specialists for your needs.
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  autoComplete="email"
                  className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  autoComplete="current-password"
                  className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            {/* Styled Radio Buttons */}
            <div className="mb-6 flex flex-col gap-y-2 gap-x-4 lg:flex-row justify-center items-center">
              {/* Customer Radio Button */}
              <div className="relative flex items-center justify-center w-44">
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
                  htmlFor="customerRadio"
                  className="peer-checked:bg-indigo-600 peer-checked:text-white peer-checked:ring-2 peer-checked:ring-indigo-600 cursor-pointer flex items-center justify-center w-full h-12 rounded-lg border border-gray-300 bg-gray-100 text-gray-800 font-medium px-4 py-2 transition-all duration-300 ease-in-out hover:bg-indigo-200 hover:scale-105 hover:shadow-lg active:scale-95 active:bg-indigo-400"
                >
                  Customer
                </label>
              </div>

              {/* Specialist Radio Button */}
              <div className="relative flex items-center justify-center w-44">
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
                  htmlFor="specialistRadio"
                  className="hover:scale-105 active:scale-95 peer-checked:bg-indigo-600 peer-checked:text-white peer-checked:ring-2 peer-checked:ring-indigo-600 cursor-pointer flex items-center justify-center w-full h-12 rounded-lg border border-gray-300 bg-gray-100 text-gray-800 font-medium px-4 py-2 transition-all duration-300 ease-in-out hover:bg-indigo-200 hover:shadow-lg active:bg-indigo-400"
                >
                  Specialist
                </label>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign In
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            New to Service Finder?{" "}
            <Link
              to="/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
