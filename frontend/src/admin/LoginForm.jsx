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
        <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Email address
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-slate-400" />
          </div>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition duration-200 text-slate-800 placeholder-slate-400"
            placeholder="admin@gmail.com"
            required
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-slate-400" />
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition duration-200 text-slate-800"
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
            className="h-4 w-4 text-indigo-500 focus:ring-indigo-500 border-slate-300 rounded cursor-pointer"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-slate-600 cursor-pointer"
          >
            Remember me
          </label>
        </div>
        {/* <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          Forgot password?
        </button> */}
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
      >
        Sign in
      </button>
    </form>
  );
}

export default LoginForm;
