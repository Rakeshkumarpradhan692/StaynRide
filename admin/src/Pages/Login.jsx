import { useState, useContext } from "react";
import { Mail, Lock, Eye, EyeOff, LogIn, Key } from "lucide-react";
import { AuthContext } from "../context/Auth";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const { setAuth } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFocus = (field) => {
    setIsFocused({ ...isFocused, [field]: true });
  };

  const handleBlur = (field) => {
    setIsFocused({ ...isFocused, [field]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        formData
      );

      if (response.data?.success) {
        localStorage.setItem("admin", JSON.stringify(response.data.admin));
        setAuth((prev) => ({
          ...prev,
          islogin: true,
          admin: response.data.admin,
        }));
        toast.success("Login successful!");
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred during login. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 p-4">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="relative w-full max-w-md">
        {/* Background glow effect */}
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-75 blur-xl"></div>

        {/* Main card */}
        <div className="relative bg-gray-800/50 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-gray-700/50">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500"></div>

          <div className="p-8 space-y-6">
            {/* Header */}
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg mb-4">
                <Key className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">Admin Portal</h1>
              <p className="text-gray-300 mt-2">
                Sign in to access your dashboard
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email field */}
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300"
                >
                  Email
                </label>
                <div
                  className={`relative transition-all duration-200 ${
                    isFocused.email ? "ring-2 ring-blue-400/50" : ""
                  } rounded-lg bg-gray-700/50 border border-gray-600/50`}
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail
                      className={`h-5 w-5 ${
                        isFocused.email ? "text-blue-400" : "text-gray-400"
                      } transition-colors duration-200`}
                    />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus("email")}
                    onBlur={() => handleBlur("email")}
                    placeholder="admin@example.com"
                    className="w-full bg-transparent pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none rounded-lg"
                    required
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300"
                >
                  Password
                </label>
                <div
                  className={`relative transition-all duration-200 ${
                    isFocused.password ? "ring-2 ring-blue-400/50" : ""
                  } rounded-lg bg-gray-700/50 border border-gray-600/50`}
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock
                      className={`h-5 w-5 ${
                        isFocused.password ? "text-blue-400" : "text-gray-400"
                      } transition-colors duration-200`}
                    />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => handleFocus("password")}
                    onBlur={() => handleBlur("password")}
                    placeholder="••••••••"
                    className="w-full bg-transparent pl-10 pr-10 py-3 text-white placeholder-gray-400 focus:outline-none rounded-lg"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-blue-400 transition-colors duration-200" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-blue-400 transition-colors duration-200" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg transition-all duration-300 hover:shadow-xl ${
                  isLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <>
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <LogIn className="h-5 w-5 text-blue-200 group-hover:text-white transition-colors duration-300" />
                    </span>
                    Sign In
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
