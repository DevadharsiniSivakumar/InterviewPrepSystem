import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserStats } from "../services/api";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState([
    { title: "Tests Completed", value: "0" },
    { title: "Average Score", value: "0%" },
    { title: "Ranking", value: "Unranked" }
  ]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    getUserStats(user.id)
      .then(res => {
        setStats([
          { title: "Tests Completed", value: res.data.testsCompleted },
          { title: "Average Score", value: res.data.averageScore },
          { title: "Ranking", value: res.data.ranking }
        ]);
        if (res.data.history) setHistory(res.data.history);
      })
      .catch(err => console.error("Could not fetch stats", err));
  }, [user?.id, navigate]);

  const domains = [
    "Data Structures",
    "Web Development",
    "Operating Systems",
    "DBMS",
    "JavaScript",
    "React"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex-1 p-10 relative overflow-y-auto"
    >
      <h1 className="text-4xl font-bold text-gradient mb-10 tracking-tight">
        Welcome, {user?.name || "User"}
      </h1>

      {/* Stats Section */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, index) => (
          <motion.div
            variants={itemVariants}
            key={index}
            className="glass-card p-8 rounded-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg className="w-16 h-16 text-[var(--color-primary)]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4.1L18.4 19H5.6L12 6.1z"/></svg>
            </div>
            <h2 className="text-slate-400 font-medium mb-2 tracking-wide uppercase text-sm">
              {stat.title}
            </h2>
            <p className="text-4xl font-bold text-white tracking-tight drop-shadow-md">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Action Split */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Start Test Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel p-8 rounded-2xl col-span-1 border-t border-[var(--color-primary)]/30 relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-glow)] to-transparent opacity-20 rounded-2xl pointer-events-none" />
          <h2 className="text-2xl font-bold text-white mb-4">
            Take Mock Interview
          </h2>
          <p className="text-slate-300 font-light mb-8 max-w-sm">
            Practice technical interviews with our advanced AI and receive comprehensive feedback instantly.
          </p>
          <button
            onClick={() => navigate("/test")}
            className="w-full bg-[var(--color-primary)] hover:bg-sky-400 text-slate-900 px-6 py-4 rounded-xl font-bold shadow-[0_0_15px_var(--color-primary-glow)] transition-all duration-300 transform hover:scale-[1.02]"
          >
            Start General Test
          </button>
        </motion.div>

        {/* Domain Practice */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="col-span-2 glass-panel p-8 rounded-2xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            Practice By Domain
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {domains.map((domain, index) => (
              <div
                key={index}
                className="bg-slate-800/50 border border-slate-700/50 hover:bg-[var(--color-primary)] p-4 rounded-xl cursor-pointer group transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_4px_20px_var(--color-primary-glow)]"
                onClick={() => navigate("/test", { state: { domain } })}
              >
                <h3 className="text-md font-semibold text-white group-hover:text-slate-900 transition-colors">
                  {domain}
                </h3>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Progress Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-panel p-8 rounded-2xl"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Performance Overview</h2>
            <p className="text-slate-400 font-light">Track your improvement over time.</p>
          </div>
        </div>

        <div className="h-[300px] flex items-center justify-center text-slate-500 bg-slate-900/40 rounded-xl p-4 border border-slate-800/50">
          {history.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history} margin={{ top: 10, right: 20, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(51, 65, 85, 0.4)" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" domain={[0, 100]} tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "rgba(15, 23, 42, 0.9)", borderColor: "rgba(30, 41, 59, 0.8)", borderRadius: '8px', color: "#f8fafc", boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }} 
                  itemStyle={{ color: "#38bdf8", fontWeight: 'bold' }}
                  formatter={(value) => [`${value}%`, "Score"]}
                />
                <Line type="monotone" dataKey="scorePercentage" stroke="var(--color-primary)" strokeWidth={4} dot={{ r: 4, fill: '#0ea5e9', strokeWidth: 2, stroke: '#0f172a' }} activeDot={{ r: 8, fill: '#38bdf8', stroke: '#fff', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-slate-500 font-medium tracking-wide">Take your first test to see your history chart!</div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}