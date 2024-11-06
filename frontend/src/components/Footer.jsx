import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-gray-700 py-12 z-20 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <img
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              alt="Company name"
              className="h-8 w-auto"
            />
            <p className="mt-4 text-gray-700">
              Making the world a better place through constructing elegant
              hierarchies.
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
            <h3 className="text-lg font-semibold text-gray-800">Services</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  to="#"
                  className="text-gray-600 hover:text-indigo-600 text-base"
                >
                  Web Development
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-600 hover:text-indigo-600 text-base"
                >
                  Mobile App Development
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-600 hover:text-indigo-600 text-base"
                >
                  SEO Optimization
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-600 hover:text-indigo-600 text-base"
                >
                  Graphic Design
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
