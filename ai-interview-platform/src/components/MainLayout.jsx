import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen">
      <div className="fixed inset-y-0 left-0 w-64 z-40">
        <Sidebar />
      </div>
      
      <div className="flex-1 ml-64 min-h-screen flex flex-col relative">
        <Outlet />
      </div>
    </div>
  );
}
