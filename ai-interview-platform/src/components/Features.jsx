import { motion } from "framer-motion";

function Features(){
  const features=[
    {
      title:"AI Interview Simulation",
      desc:"Experience realistic interviews powered by advanced AI."
    },
    {
      title:"Coding Practice",
      desc:"Solve coding problems similar to real tech interviews."
    },
    {
      title:"Performance Analytics",
      desc:"Track improvement over time with detailed reports."
    },
    {
      title:"Domain Specific Tracks",
      desc:"Prepare specifically for Web, AI, DSA, or ML roles."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return(
    <section className="px-10 md:px-20 py-24 text-white relative">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl text-center font-bold tracking-tight mb-16 text-gradient"
      >
        Why Use Our Platform?
      </motion.h2>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid md:grid-cols-4 gap-8"
      >
        {features.map((f,i)=>(
          <motion.div variants={itemVariants} key={i} className="glass-card p-10 rounded-2xl relative overflow-hidden group">
            {/* Subtle glow effect on hover */}
            <div className="absolute inset-0 bg-[var(--color-primary-glow)] opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
            <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-3">{f.title}</h3>
            <p className="text-slate-300 leading-relaxed font-light">{f.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default Features;