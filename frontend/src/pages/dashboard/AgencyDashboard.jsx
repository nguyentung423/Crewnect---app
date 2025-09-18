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
  User,
  Menu,
  X
} from "lucide-react";
import { logout } from "../../lib/authApi";
import { useState } from "react";

export default function AgencyDashboard() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  // Close sidebar when clicking nav item on mobile
  const handleNavClick = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 relative">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:relative inset-y-0 left-0 z-50 w-72 bg-white shadow-xl flex flex-col overflow-hidden transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-800/5 to-orange-600/5 rounded-full -translate-y-8 translate-x-8"></div>
        
        {/* Mobile close button */}
        <button 
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 text-slate-500 hover:text-green-800 z-10"
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Logo section */}
        <div className="p-4 lg:p-6 border-b border-slate-200 relative z-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-800 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent">
                Crewnect
              </h1>
              <p className="text-xs text-slate-500 font-medium">Event Recruitment</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 lg:p-4 space-y-1 overflow-y-auto">
          {navItems.map(({ name, path, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              onClick={handleNavClick}
              className={`group flex items-center px-3 lg:px-4 py-3 rounded-xl transition-all duration-200 ${
                location.pathname === path
                  ? "bg-gradient-to-r from-green-800 to-green-700 text-white shadow-lg shadow-green-800/25 transform scale-[1.02]"
                  : "text-slate-600 hover:bg-slate-50 hover:text-green-800 hover:translate-x-1 active:bg-slate-100"
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
        <div className="p-3 lg:p-4 border-t border-slate-200 bg-slate-50/50">
          <div className="flex items-center space-x-3 px-3 lg:px-4 py-3 bg-white rounded-xl shadow-sm mb-3">
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
            className="flex items-center w-full px-3 lg:px-4 py-3 text-red-600 hover:bg-red-50 active:bg-red-100 rounded-xl transition-all duration-200 hover:shadow-sm group"
          >
            <div className="p-2 rounded-lg bg-red-50 group-hover:bg-red-100 transition-colors">
              <LogOut className="w-4 h-4" />
            </div>
            <span className="ml-3 font-medium text-sm">Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0 lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-30">
          <div className="px-4 lg:px-8 py-4 lg:py-6">
            <div className="flex items-center justify-between">
              {/* Mobile menu button & title */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 text-slate-600 hover:text-green-800 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </button>
                
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-slate-800">
                    {getCurrentPageName()}
                  </h2>
                  <p className="text-xs lg:text-sm text-slate-500 hidden sm:block">
                    Quản lý tuyển dụng event part-time hiệu quả
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 lg:space-x-4">
                {/* Search bar - hidden on small mobile */}
                <div className="relative hidden sm:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="pl-10 pr-4 py-2 w-32 sm:w-48 lg:w-64 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-colors"
                  />
                </div>
                
                {/* Mobile search button */}
                <button className="sm:hidden p-2 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">
                  <Search className="w-5 h-5 text-slate-600" />
                </button>
                
                {/* Notifications */}
                <button className="relative p-2 lg:p-3 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 rounded-xl transition-colors group">
                  <Bell className="w-5 h-5 text-slate-600 group-hover:text-green-800" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></span>
                </button>
                
                {/* Quick stats - only on larger screens */}
                <div className="hidden xl:flex items-center space-x-4 pl-4 border-l border-slate-200">
                  <div className="text-center">
                    <div className="text-lg lg:text-xl font-bold text-green-800">24</div>
                    <div className="text-xs text-slate-500">Jobs Active</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg lg:text-xl font-bold text-orange-600">156</div>
                    <div className="text-xs text-slate-500">Ứng viên</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile stats bar */}
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 py-3">
          <div className="flex justify-around text-center">
            <div>
              <div className="text-lg font-bold text-green-800">24</div>
              <div className="text-xs text-slate-500">Jobs Active</div>
            </div>
            <div className="w-px bg-slate-200"></div>
            <div>
              <div className="text-lg font-bold text-orange-600">156</div>
              <div className="text-xs text-slate-500">Ứng viên</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}