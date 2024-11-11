import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-gray-700 py-12 z-20 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#6366F1"
              className="size-6"
            >
              <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z" />
              <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z" />
            </svg>

            <p className="mt-4 text-gray-700">
              Making life easier by connecting you with trusted specialists,
              exactly when you need them.
            </p>
            <div className="mt-6 space-x-6">
              <Link
                to="https://www.facebook.com"
                className="text-gray-600 hover:text-indigo-500 inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">Facebook</span>
                <i className="fab fa-facebook-f h-6 w-6"></i>
              </Link>
              <Link
                to="https://www.instagram.com"
                className="text-gray-600 hover:text-indigo-500 inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">Instagram</span>
                <i className="fab fa-instagram h-6 w-6"></i>
              </Link>
              <Link
                to="https://twitter.com"
                className="text-gray-600 hover:text-indigo-500 inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">Twitter</span>
                <i className="fab fa-twitter h-6 w-6"></i>
              </Link>
              <Link
                to="https://www.linkedin.com"
                className="text-gray-600 hover:text-indigo-500 inline-block"
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
              <li>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-indigo-600 text-base"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="text-gray-600 hover:text-indigo-600 text-base"
                >
                  Signup
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-indigo-600 text-base"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-indigo-600 text-base"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-600 hover:text-indigo-600 text-base"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">Legal</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  to="/terms-of-service"
                  className="text-gray-600 hover:text-indigo-600 text-base"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-600 hover:text-indigo-600 text-base"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-300 pt-6">
          <p className="text-center text-sm text-gray-600">
            © 2024 Your Company, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
