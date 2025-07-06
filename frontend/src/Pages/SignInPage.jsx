import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Loader } from "lucide-react"; // ✅ Loader icon
import useAuthStore from "../store/authStore";
import toast from "react-hot-toast";

const SignInPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const { getCurrentUser, userrole, isSigningIn } = useAuthStore(); // ✅ Grab isSigningIn from the store
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }
    try{
      await getCurrentUser(form.email, form.password);
    }catch (error) {
      toast.error("Something went wrong. Try again.");
    }
  };
  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent text-center mb-8">
        NextGen-ERP
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-base-100 border border-base-300 rounded-lg shadow-md p-8 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Welcome Back
        </h2>

        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="input input-bordered w-full"
          required
        />

        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="input input-bordered w-full pr-10"
            required
          />
          <div
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSigningIn}
          className={`btn w-full transition ${
            isSigningIn
              ? "bg-primary/30 text-gray-300 cursor-not-allowed"
              : "bg-primary/10 text-primary hover:bg-primary/20"
          }`}
        >
          {isSigningIn ? (
            <span className="flex items-center justify-center gap-2">
              <Loader className="h-4 w-4 animate-spin" />
              Signing In...
            </span>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </div>
  );
};

export default SignInPage;
