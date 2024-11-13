import { LogIn } from "lucide-react";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate=useNavigate();

  const handleContactClick = () => {
    navigate('/admin/contact'); 
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-slate-800">
           Welcome Admin
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Please enter your credentials
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20">
          <LoginForm />

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white/60 text-slate-500">
                  New to platform?
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              onClick={handleContactClick}>
                Contact your administrator
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            ©2024 SnapServe 
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
