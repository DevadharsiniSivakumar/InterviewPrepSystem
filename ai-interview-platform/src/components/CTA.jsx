import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function CTA(){
  return(
    <section className="text-center py-40 text-white relative flex justify-center">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[var(--color-primary)]/10 blur-[100px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative z-10 glass-panel p-16 md:p-24 rounded-3xl max-w-4xl mx-10 border-t border-[var(--color-primary)]/30"
      >
        <h2 className="text-5xl font-bold tracking-tight mb-8">
          Ready to Crack Your Next <span className="text-gradient">Interview?</span>
        </h2>
        <p className="text-slate-300 text-xl font-light mb-12">
          Join thousands of candidates preparing with advanced AI feedback.
        </p>
        <Link
          to="/register"
          className="inline-block px-10 py-5 bg-[var(--color-primary)] hover:bg-sky-400 text-slate-900 rounded-full font-bold shadow-[0_0_20px_var(--color-primary-glow)] transition-all duration-300 transform hover:scale-105"
        >
          Get Started For Free
        </Link>
      </motion.div>
    </section>
  )
}

export default CTA;