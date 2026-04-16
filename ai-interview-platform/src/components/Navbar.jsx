import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-50 flex justify-between items-center px-12 py-4 glass-panel text-white"
    >
      <Link to="/" className="text-2xl font-bold text-gradient tracking-wide">
        AI Interview Lab
      </Link>

      <div className="space-x-8 text-sm font-medium tracking-wide">
        <Link to="/" className="hover:text-[var(--color-primary)] transition-colors">Home</Link>
        <Link to="/dashboard" className="hover:text-[var(--color-primary)] transition-colors">Dashboard</Link>
      </div>

      <div className="space-x-4 text-sm font-medium">
        <Link
          to="/login"
          className="px-6 py-2.5 border border-[var(--color-primary-glow)] hover:bg-[var(--color-primary-glow)] rounded-full transition-all duration-300"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-2.5 bg-[var(--color-primary)] hover:bg-sky-400 text-slate-900 rounded-full shadow-[0_0_15px_var(--color-primary-glow)] transition-all duration-300"
        >
          Get Started
        </Link>
      </div>
    </motion.nav>
  );
}

export default Navbar;