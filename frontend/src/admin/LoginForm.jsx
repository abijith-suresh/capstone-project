import { useState } from "react";
import { Lock, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); 

    try {
      const response = await fetch("http://localhost:9000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
       
        toast.error( "Invalid email or password. Please try again.", {
          position: "top-center",
          duration: 3000,
          style: {
            background: "#1F2937", 
            color: "#FFF",          
            borderRadius: "10px",  
            padding: "16px",        
            fontSize: "16px",       
          },
        });
        setLoading(false); // Stop loading
        return;
      }

      const textResponse = await response.text();
      const token = textResponse.trim();

      if (!token) {
        throw new Error("Failed to authenticate. No token received.");
      }

      localStorage.setItem("jwtToken", token);
      localStorage.setItem("userEmail", email);

      const decodedToken = atob(token.split(".")[1]);
      const parsedToken = JSON.parse(decodedToken);
      const role = parsedToken.roles;

      localStorage.setItem("accountType", role);

      let userId = null;
      let userEndpoint = null;

      if (role === "admin") {
        userEndpoint = `http://localhost:9006/api/admin/email/${email}`;
      } else {
        setError("Unknown user role.");
        setLoading(false); // Stop loading
        return;
      }

      const userResponse = await fetch(userEndpoint);
      const userData = await userResponse.json();

      if (!userData) {
        throw new Error("User data not found.");
      }

      userId = userData.id;
      localStorage.setItem("userId", userId);

      toast.success("Login successful!", {
        position: "top-center",
        duration: 3000,
        style: {
          background: "#1F2937",
          color: "#FFF",          
          borderRadius: "10px",  
          padding: "16px",        
          fontSize: "16px",       
        },
      });

      if (role === "admin") {
        navigate("/admin/dashboard");
      }

      setLoading(false); // Stop loading

    } catch (error) {
      console.error("Error during login:", error);
      setError(error.message);
      setLoading(false); // Stop loading
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 text-sm text-[#1F2937] bg-[#F8FAFC] rounded-lg">
          {error}
        </div>
      )}

      {/* Email Field */}
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
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F2937] bg-[#F8FAFC] backdrop-blur-sm transition-all duration-300 text-[#1F2937] placeholder-gray-400 hover:shadow-lg focus:shadow-xl active:scale-95"
            placeholder="admin@gmail.com"
            required
          />
        </div>
      </div>

      {/* Password Field */}
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
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F2937] bg-[#F8FAFC] backdrop-blur-sm transition-all duration-300 text-[#1F2937] placeholder-gray-400 hover:shadow-lg focus:shadow-xl active:scale-95"
            placeholder="******"
            required
          />
        </div>
      </div>

      {/* Remember Me Checkbox */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            className="h-4 w-4 text-[#1F2937] focus:ring-[#1F2937] border-[#F8FAFC] rounded cursor-pointer hover:scale-105 transition duration-200"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-[#1F2937] cursor-pointer hover:text-[#1F2937]/80"
          >
            Remember me
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full flex justify-center py-2.5 px-4 rounded-lg text-sm font-medium text-[#F8FAFC] bg-gradient-to-r from-[#1F2937] to-[#222c2a] shadow-lg hover:bg-gray-400 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#1F2937] transition duration-300"
        disabled={loading}
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
}

export default LoginForm;
