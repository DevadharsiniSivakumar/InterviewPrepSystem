import { motion } from "framer-motion";

function Stats() {
  const stats = [
    {label:"Users Practicing",value:"10,000+"},
    {label:"Interviews Simulated",value:"50,000+"},
    {label:"Average Success Rate",value:"85%"},
    {label:"Companies Covered",value:"200+"}
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.section 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="grid md:grid-cols-4 gap-8 px-10 md:px-20 py-24 text-white relative z-10"
    >
      {stats.map((s,i)=>(
        <motion.div variants={itemVariants} key={i} className="glass-card p-10 rounded-2xl text-center">
          <h2 className="text-5xl font-bold text-[var(--color-primary)] mb-4 tracking-tight drop-shadow-md">{s.value}</h2>
          <p className="text-slate-300 text-lg font-medium tracking-wide">{s.label}</p>
        </motion.div>
      ))}
    </motion.section>
  );
}

export default Stats;