import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  const score = location.state?.score || 0;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex-1 flex flex-col items-center justify-center p-6 relative py-20"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />

      <h1 className="text-5xl font-bold tracking-tight mb-8 text-center text-gradient">
        Interview Complete!
      </h1>

      <div className="glass-panel p-12 rounded-3xl text-center max-w-xl z-10 w-full">
        <div className="w-24 h-24 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>

        <p className="text-slate-300 mb-8 text-xl font-light leading-relaxed">
          Your mock interview has been evaluated and your performance statistics have been recorded to your dashboard.
        </p>

        <div className="bg-slate-900/50 py-6 px-10 rounded-2xl border border-slate-700/50 inline-block mb-10">
          <p className="text-sm text-slate-400 uppercase tracking-widest font-semibold mb-2">Final Score</p>
          <motion.h2 
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="text-6xl font-bold text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            {score}
          </motion.h2>
        </div>

        <div className="w-full">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-[var(--color-primary)] hover:bg-sky-400 text-slate-900 px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-[1.02] shadow-[0_0_15px_var(--color-primary-glow)]"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </motion.div>
  );
}