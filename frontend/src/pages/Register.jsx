import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../lib/authstore";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", 
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerUser(formData);
      alert("Registration successful 🎉");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return  (
  <div className="min-h-screen flex items-center justify-center bg-[#05101f] relative overflow-hidden">

    {/* Background Glow */}
    <div className="absolute w-125 h-125 bg-blue-500 opacity-20 blur-3xl rounded-full - top-25 -left-25" />
    <div className="absolute w-25 h-100 bg-cyan-400 opacity-20 blur-3xl rounded-full -bottom-25 -right-25" />

    <form
      onSubmit={handleSubmit}
      className="relative z-10 w-96 p-8 rounded-2xl backdrop-blur-xl 
                 bg-white/5 border border-white/10 shadow-2xl"
    >
      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-6 text-white">
        Create Account ✨
      </h2>

      {/* Name */}
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full mb-4 p-3 rounded-lg bg-white/10 border border-white/20 
                   text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        required
      />

      {/* Email */}
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        className="w-full mb-4 p-3 rounded-lg bg-white/10 border border-white/20 
                   text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        required
      />

      {/* Password */}
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full mb-4 p-3 rounded-lg bg-white/10 border border-white/20 
                   text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        required
      />

      {/* Role */}
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="w-full mb-6 p-3 rounded-lg bg-white/10 border border-white/20 
                   text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
      >
        <option value="user" className="text-black">User</option>
        <option value="admin" className="text-black">Admin</option>
      </select>

      {/* Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg font-medium text-white 
                   bg-linear-to-r from-blue-500 to-cyan-400 
                   hover:scale-[1.02] transition-all duration-200 
                   disabled:opacity-50"
      >
        {loading ? "Creating Account..." : "Register 🚀"}
      </button>

      {/* Login Link */}
      <p className="text-sm text-center mt-5 text-gray-300">
        Already have an account?{" "}
        <Link to="/login" className="text-cyan-400 hover:underline">
          Login
        </Link>
      </p>
    </form>
  </div>
);
}

export default Register;
