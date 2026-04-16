import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Mock Interviews", path: "/test", icon: "🎤" },
    { name: "Results", path: "/results", icon: "📈" },
  ];

  return (
    <div className="w-64 min-h-screen glass-panel border-r border-slate-700/50 flex flex-col text-slate-300">
      <div className="p-8 border-b border-slate-700/50">
        <h2 className="text-2xl font-bold text-gradient tracking-wide">AI Platform</h2>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-8">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-4 px-4 py-3.5 rounded-xl transition-all duration-300 cursor-pointer text-sm font-medium ${
                isActive 
                  ? "bg-[var(--color-primary-glow)] text-white shadow-[inset_0_0_10px_var(--color-primary-glow)] border border-[var(--color-primary)]/30" 
                  : "hover:bg-slate-800/60 hover:text-white"
              }`}
            >
              <span className="text-xl opacity-90">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-700/50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-4 px-4 py-3.5 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 hover:shadow-[0_0_15px_rgba(244,63,94,0.15)] rounded-xl transition-all duration-300 text-sm font-medium"
        >
          <span className="text-xl">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
