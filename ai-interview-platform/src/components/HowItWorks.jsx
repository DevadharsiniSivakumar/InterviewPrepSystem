import { motion } from "framer-motion";

function HowItWorks(){
  const steps=[
    "Create an account",
    "Choose your interview domain",
    "Take mock interview tests",
    "Receive AI feedback and reports"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
  };

  return(
    <section className="px-10 md:px-20 py-24 text-white relative">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl text-center font-bold tracking-tight mb-16 text-gradient"
      >
        How It Works
      </motion.h2>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid md:grid-cols-4 gap-8"
      >
        {steps.map((step,i)=>(
          <motion.div variants={itemVariants} key={i} className="glass-panel p-10 rounded-2xl text-center relative group">
            {/* Outline ring indicator */}
            <div className="mx-auto w-12 h-12 rounded-full border border-[var(--color-primary)] flex items-center justify-center mb-6 shadow-[0_0_15px_var(--color-primary-glow)] group-hover:scale-110 transition-transform duration-300">
              <span className="text-[var(--color-primary)] font-bold">{i+1}</span>
            </div>
            <p className="text-slate-200 font-medium leading-relaxed">{step}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default HowItWorks;