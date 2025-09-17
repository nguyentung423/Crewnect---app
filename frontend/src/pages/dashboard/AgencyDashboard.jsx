import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Building2,
  Settings,
  LogOut,
  Bell,
  Search,
  Calendar,
  User
} from "lucide-react";
import { logout } from "../../lib/authApi";

export default function AgencyDashboard() {
  const location = useLocation();

  const navItems = [
    { name: "Tổng quan", path: "/agency", icon: LayoutDashboard },
    { name: "Việc làm Event", path: "/agency/jobs", icon: Briefcase },
    { name: "Ứng viên", path: "/agency/applications", icon: Users },
    { name: "Lịch Event", path: "/agency/calendar", icon: Calendar },
    { name: "Hồ sơ công ty", path: "/agency/profile", icon: Building2 },
    { name: "Cài đặt", path: "/agency/settings", icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/login/agency";
    } catch (err) {
      console.error("Logout error:", err.message);
    }
  };

  // Get current page name for header
  const getCurrentPageName = () => {
    const currentItem = navItems.find(item => item.path === location.pathname);
    return currentItem ? currentItem.name : "Dashboard";
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-xl flex flex-col relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-800/5 to-orange-600/5 rounded-full -translate-y-8 translate-x-8"></div>
        
        {/* Logo section */}
        <div className="p-6 border-b border-slate-200 relative z-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-800 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent">
                Crewnect
              </h1>
              <p className="text-xs text-slate-500 font-medium">Event Recruitment</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ name, path, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`group flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                location.pathname === path
                  ? "bg-gradient-to-r from-green-800 to-green-700 text-white shadow-lg shadow-green-800/25 transform scale-[1.02]"
                  : "text-slate-600 hover:bg-slate-50 hover:text-green-800 hover:translate-x-1"
              }`}
            >
              <div className={`p-2 rounded-lg transition-colors ${
                location.pathname === path
                  ? "bg-white/20"
                  : "bg-slate-100 group-hover:bg-green-50"
              }`}>
                <Icon className={`w-4 h-4 ${
                  location.pathname === path 
                    ? "text-white" 
                    : "text-slate-500 group-hover:text-green-800"
                }`} />
              </div>
              <span className="ml-3 font-medium text-sm">{name}</span>
              {location.pathname === path && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
              )}
            </Link>
          ))}
        </nav>

        {/* User info & logout */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/50">
          <div className="flex items-center space-x-3 px-4 py-3 bg-white rounded-xl shadow-sm mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">Agency Manager</p>
              <p className="text-xs text-slate-500">Quản lý tuyển dụng</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:shadow-sm group"
          >
            <div className="p-2 rounded-lg bg-red-50 group-hover:bg-red-100 transition-colors">
              <LogOut className="w-4 h-4" />
            </div>
            <span className="ml-3 font-medium text-sm">Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-slate-200">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-1">
                  {getCurrentPageName()}
                </h2>
                <p className="text-sm text-slate-500">
                  Quản lý tuyển dụng event part-time hiệu quả
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Search bar */}
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="pl-10 pr-4 py-2 w-64 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors"
                  />
                </div>
                
                {/* Notifications */}
                <button className="relative p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors group">
                  <Bell className="w-5 h-5 text-slate-600 group-hover:text-green-800" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></span>
                </button>
                
                {/* Quick stats */}
                <div className="hidden lg:flex items-center space-x-4 pl-4 border-l border-slate-200">
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-800">24</div>
                    <div className="text-xs text-slate-500">Jobs Active</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-orange-600">156</div>
                    <div className="text-xs text-slate-500">Ứng viên</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}