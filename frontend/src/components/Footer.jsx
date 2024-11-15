import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-transparent text-gray-700 py-12 z-20 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <img
              src="src/images/snapserve.svg"
              className="h-8 mb-4"
              alt="SnapServe Logo"
            />

            <p className="mt-4 text-gray-500">
              Making life easier by connecting you with trusted specialists,
              exactly when you need them.
            </p>

            <div className="mt-6 space-x-6">
              <Link
                to="https://www.facebook.com"
                className="text-gray-500 hover:text-gray-700 inline-block hover:scale-105 active:scale-95 transform transition-all ease-in-out duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">Facebook</span>
                <i className="fab fa-facebook-f h-6 w-6"></i>
              </Link>
              <Link
                to="https://www.instagram.com"
                className="text-gray-500 hover:text-gray-700 inline-block hover:scale-105 active:scale-95 transform transition-all ease-in-out duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">Instagram</span>
                <i className="fab fa-instagram h-6 w-6"></i>
              </Link>
              <Link
                to="https://twitter.com"
                className="text-gray-500 hover:text-gray-700 inline-block hover:scale-105 active:scale-95 transform transition-all ease-in-out duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">Twitter</span>
                <i className="fab fa-twitter h-6 w-6"></i>
              </Link>
              <Link
                to="https://www.linkedin.com"
                className="text-gray-500 hover:text-gray-700 inline-block hover:scale-105 active:scale-95 transform transition-all ease-in-out duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">LinkedIn</span>
                <i className="fab fa-linkedin-in h-6 w-6"></i>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">Actions</h3>
            <ul className="mt-4 space-y-3">
              <li className="text-gray-600 hover:text-gray-800 text-base hover:scale-105 active:scale-95 transform transition-all ease-in-out duration-300">
                <Link to="/login">Login</Link>
              </li>
              <li className="text-gray-600 hover:text-gray-800 text-base hover:scale-105 active:scale-95 transform transition-all ease-in-out duration-300">
                <Link to="/signup">Signup</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
            <ul className="mt-4 space-y-3">
              <li className="text-gray-600 hover:text-gray-800 text-base hover:scale-105 active:scale-95 transform transition-all ease-in-out duration-300">
                <Link to="/about">About Us</Link>
              </li>
              <li className="text-gray-600 hover:text-gray-800 text-base hover:scale-105 active:scale-95 transform transition-all ease-in-out duration-300">
                <Link to="/contact">Contact</Link>
              </li>
              <li className="text-gray-600 hover:text-gray-800 text-base hover:scale-105 active:scale-95 transform transition-all ease-in-out duration-300">
                <Link to="/faq">FAQ</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">Legal</h3>
            <ul className="mt-4 space-y-3">
              <li className="text-gray-600 hover:text-gray-800 text-base hover:scale-105 active:scale-95 transform transition-all ease-in-out duration-300">
                <Link to="/terms-of-service">Terms of Service</Link>
              </li>
              <li className="text-gray-600 hover:text-gray-800 text-base hover:scale-105 active:scale-95 transform transition-all ease-in-out duration-300">
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-300 pt-6">
          <p className="text-center text-sm text-gray-500">
            © 2024 SnapServe, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
