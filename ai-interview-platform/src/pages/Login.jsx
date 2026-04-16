import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(form);

      localStorage.setItem("user", JSON.stringify(res.data));

      alert("Login successful");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed - make sure backend is running");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex justify-center items-center py-20 px-4 relative overflow-hidden"
    >
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--color-primary)]/10 blur-[100px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="glass-panel p-10 rounded-3xl w-full max-w-[400px] z-10"
      >
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold text-gradient inline-block mb-6 tracking-wide">
            AI Interview Lab
          </Link>
          <h2 className="text-white text-3xl font-bold tracking-tight">Welcome Back</h2>
          <p className="text-slate-400 mt-2 font-light">Login to continue your prep.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
            <input
              name="email"
              placeholder="you@example.com"
              onChange={handleChange}
              className="w-full bg-slate-900/50 border border-slate-700 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] text-white p-3.5 rounded-xl outline-none transition-all duration-300 shadow-inner"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              onChange={handleChange}
              className="w-full bg-slate-900/50 border border-slate-700 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] text-white p-3.5 rounded-xl outline-none transition-all duration-300 shadow-inner"
              required
            />
          </div>

          <button className="w-full bg-[var(--color-primary)] hover:bg-sky-400 text-slate-900 py-3.5 rounded-xl font-bold shadow-[0_0_15px_var(--color-primary-glow)] transition-all duration-300 transform hover:scale-[1.02] mt-4">
            Login
          </button>
        </form>
        
        <p className="text-center text-slate-400 mt-8 text-sm">
          Don't have an account? <Link to="/register" className="text-[var(--color-primary)] hover:underline font-medium">Get Started</Link>
        </p>
      </motion.div>
    </motion.div>
  );
}