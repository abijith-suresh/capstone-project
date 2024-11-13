import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img src='src\images\snapserve.svg'   className=" mx-auto h-10 w-auto size-6"></img>
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Create Your Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign up to connect with trusted specialists.
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6">
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
                required
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="new-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-900"
            >
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                autoComplete="new-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div className="mb-6 flex flex-col gap-y-2 gap-x-4 lg:flex-row justify-center items-center">
            {/* Customer Radio Button */}
            <div className="relative flex items-center justify-center w-44">
              <input
                className="peer hidden"
                type="radio"
                name="userType"
                value="customer"
                defaultChecked
                id="customerRadio"
              />
              <label
                htmlFor="customerRadio"
                className="peer-checked:bg-indigo-600 peer-checked:text-white peer-checked:ring-2 peer-checked:ring-indigo-600 cursor-pointer flex items-center justify-center w-full h-12 rounded-lg border border-gray-300 bg-gray-100 text-gray-800 font-medium px-4 py-2 transition-all duration-300 ease-in-out
        hover:bg-indigo-200 hover:scale-105 hover:shadow-lg active:scale-95 active:bg-indigo-400"
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
                id="specialistRadio"
              />
              <label
                htmlFor="specialistRadio"
                className="hover:scale-105 active:scale-95 peer-checked:bg-indigo-600 peer-checked:text-white peer-checked:ring-2 peer-checked:ring-indigo-600 cursor-pointer flex items-center justify-center w-full h-12 rounded-lg border border-gray-300 bg-gray-100 text-gray-800 font-medium px-4 py-2 transition-all duration-300 ease-in-out
        hover:bg-indigo-200 hover:shadow-lg active:bg-indigo-400"
              >
                Specialist
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
