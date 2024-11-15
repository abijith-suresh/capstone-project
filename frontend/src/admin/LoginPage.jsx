import { LogIn } from "lucide-react";
import { motion } from "framer-motion";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate('/admin/contact');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#F8FAFC] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[#253a35] to-[#10B981] shadow-lg"
          >
            <LogIn className="w-8 h-8 text-[#F8FAFC]" />
          </motion.div>
          <h2 className="mt-6 text-3xl font-bold text-[#1F2937]">
            Welcome Admin
          </h2>
          <p className="mt-2 text-sm text-[#1F2937]">
            Please enter your credentials
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="bg-[#F8FAFC]/60 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-[#10B981]/30"
        >
          <LoginForm />

          <div className="mt-6">
            <div className="relative">
              <div className="mt-6 text-center">
                <span className="px-2 bg-[#F8FAFC]/60 text-[#1F2937]">
                  New to platform?
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                className="text-sm font-medium text-[#10B981] hover:text-[#0000]/80 transition duration-150 ease-in-out"
                onClick={handleContactClick}
              >
                Contact your administrator
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-[#1F2937]">
            ©2024 SnapServe
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default LoginPage;
