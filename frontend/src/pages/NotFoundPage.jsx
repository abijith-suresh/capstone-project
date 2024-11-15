import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 py-12 lg:px-8">
      <div className="text-center">
        <p className="text-3xl font-semibold text-orange-600">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-lg font-medium text-gray-500 sm:text-xl">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-gray-800 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 transform transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            Go back home
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center text-sm font-semibold text-gray-700 hover:text-gray-600 transform transition-all hover:scale-105 active:scale-95"
          >
            Contact support <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
