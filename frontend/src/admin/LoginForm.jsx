import { useState } from "react";
import { Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Mock authentication - in production, replace with actual API call
    if (email === "admin@gmail.com" && password === "admin123") {
      // Store auth token/session
      localStorage.setItem("isAuthenticated", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 text-sm text-[#1F2937] bg-[#F8FAFC] rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-[#1F2937] mb-1"
        >
          Email address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-[#1F2937]" />
          </div>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 border border-[#F8FAFC] rounded-lg focus:ring-2 focus:ring-[#1F2937] focus:border-transparent bg-[#F8FAFC] backdrop-blur-sm transition duration-200 text-[#1F2937] placeholder-[#1F2937]"
            placeholder="admin@gmail.com"
            required
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-[#1F2937] mb-1"
        >
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-[#1F2937]" />
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 border border-[#F8FAFC] rounded-lg focus:ring-2 focus:ring-[#1F2937] focus:border-transparent bg-[#F8FAFC] backdrop-blur-sm transition duration-200 text-[#1F2937]"
            placeholder="******"
            required
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            className="h-4 w-4 text-[#1F2937] focus:ring-[#1F2937] border-[#F8FAFC] rounded cursor-pointer"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-[#1F2937] cursor-pointer"
          >
            Remember me
          </label>
        </div>
        {/* <button type="button" className="text-sm font-medium text-[#1F2937] hover:text-[#1F2937]/80">
          Forgot password?
        </button> */}
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2.5 px-4 rounded-lg text-sm font-medium text-[#F8FAFC] bg-gradient-to-r from-[#1F2937] to-[#222c2a] shadow-lg hover:bg-gray-400 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#1F2937] transition duration-200"
      >
        Sign in
      </button>
    </form>
  );
}

export default LoginForm;
