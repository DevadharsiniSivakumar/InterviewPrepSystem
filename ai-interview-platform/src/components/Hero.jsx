import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2, delayChildren: 0.3 } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="relative text-white text-center py-40 px-10 pt-48 flex justify-center overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-primary)]/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-4xl"
      >
        <motion.h1 variants={itemVariants} className="text-6xl md:text-7xl font-bold tracking-tight mb-6">
          Master Technical Interviews with <span className="text-gradient">AI</span>
        </motion.h1>

        <motion.p variants={itemVariants} className="mt-8 text-slate-300 text-xl font-light max-w-2xl mx-auto leading-relaxed">
          Practice coding questions, receive instant AI feedback,
          track your progress and become <span className="text-white font-medium">interview ready</span>.
        </motion.p>

        <motion.div variants={itemVariants} className="mt-12 flex justify-center gap-6">
          <Link
            to="/register"
            className="px-8 py-4 bg-[var(--color-primary)] hover:bg-sky-400 text-slate-900 rounded-full font-semibold shadow-[0_0_20px_var(--color-primary-glow)] transition-all duration-300 transform hover:scale-105"
          >
            Start Practicing
          </Link>
          <Link
            to="/login"
            className="px-8 py-4 border border-slate-600 hover:border-slate-400 hover:bg-slate-800 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
          >
            Login
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;