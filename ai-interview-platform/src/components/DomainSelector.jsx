import { motion } from "framer-motion";

function DomainSelector() {
  const domains = [
    "Data Structures",
    "Web Development",
    "Artificial Intelligence",
    "Machine Learning",
    "System Design",
    "Database Systems"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1 }
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="px-10 py-20 text-white relative z-10"
    >
      <h2 className="text-4xl text-center mb-12 tracking-tight font-bold text-gradient">
        Choose Your Domain
      </h2>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid md:grid-cols-3 gap-8">
        {domains.map((d,i)=>(
          <motion.div 
            variants={itemVariants}
            key={i}
            className="glass-card hover:bg-[var(--color-primary)] hover:text-slate-900 group p-10 rounded-2xl text-center transition-all duration-300 cursor-pointer transform hover:-translate-y-2 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_30px_var(--color-primary-glow)]"
          >
            <span className="text-lg font-semibold block">{d}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}

export default DomainSelector;